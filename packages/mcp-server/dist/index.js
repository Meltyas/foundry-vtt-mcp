#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { config } from './config.js';
import { spawn } from 'child_process';
import * as net from 'net';
import { fileURLToPath } from 'url';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
const CONTROL_HOST = '127.0.0.1';
const CONTROL_PORT = 31414;
class BackendClient {
    socket = null;
    buffer = '';
    pending = new Map();
    logFile = path.join(os.tmpdir(), 'foundry-mcp-server', 'wrapper.log');
    backendProcess = null;
    log(msg, meta) {
        try {
            const dir = path.dirname(this.logFile);
            if (!fs.existsSync(dir))
                fs.mkdirSync(dir, { recursive: true });
            const line = `[${new Date().toISOString()}] ${msg}${meta ? ' ' + JSON.stringify(meta) : ''}\n`;
            fs.appendFileSync(this.logFile, line);
        }
        catch { }
    }
    async ensure() {
        if (this.socket && !this.socket.destroyed)
            return;
        this.log('ensure(): connecting to backend');
        await this.connectWithRetry();
    }
    connect() {
        return new Promise((resolve, reject) => {
            const sock = net.createConnection({ host: CONTROL_HOST, port: CONTROL_PORT }, () => {
                this.socket = sock;
                sock.setEncoding('utf8');
                sock.on('data', (chunk) => this.onData(chunk));
                sock.on('error', err => this.rejectAll(err));
                sock.on('close', () => this.rejectAll(new Error('Backend disconnected')));
                this.log('connect(): connected to backend');
                resolve();
            });
            sock.on('error', e => {
                this.log('connect(): error', { error: e?.message });
                reject(e);
            });
        });
    }
    async connectWithRetry() {
        try {
            await this.connect();
            return;
        }
        catch (initialError) {
            this.log('connectWithRetry(): starting backend');
            await this.startBackend();
            const maxAttempts = 40;
            let lastError = initialError;
            for (let attempt = 0; attempt < maxAttempts; attempt++) {
                const delayMs = Math.min(250 * Math.pow(1.4, attempt), 2000);
                await new Promise(resolve => setTimeout(resolve, delayMs));
                try {
                    await this.connect();
                    return;
                }
                catch (error) {
                    lastError = error;
                    this.log('connectWithRetry(): retry failed', {
                        attempt: attempt + 1,
                        delayMs,
                        error: error?.message,
                    });
                }
            }
            const errorMessage = lastError instanceof Error ? lastError.message : 'Unknown error';
            throw new Error(`Unable to connect to Foundry MCP backend after ${maxAttempts} attempts: ${errorMessage}`);
        }
    }
    startBackend() {
        return new Promise(async (resolve) => {
            let backendPath = null;
            try {
                const backendUrl = new URL('./backend.js', import.meta.url);
                backendPath = fileURLToPath(backendUrl);
            }
            catch {
                const pathMod = await import('path');
                const fsMod = await import('fs');
                const baseDir = typeof __dirname !== 'undefined'
                    ? __dirname
                    : pathMod.dirname((process.argv && process.argv[1]) || process.cwd());
                // Prefer bundled backend when present (contains deps), fallback to ESM
                const bundleCandidate = pathMod.join(baseDir, 'backend.bundle.cjs');
                const jsCandidate = pathMod.join(baseDir, 'backend.js');
                backendPath = fsMod.existsSync(bundleCandidate) ? bundleCandidate : jsCandidate;
            }
            this.log('startBackend(): spawning', { path: backendPath });
            const child = spawn(process.execPath, [backendPath], {
                detached: false, // Stay attached to monitor backend
                stdio: ['ignore', 'ignore', 'pipe'], // Capture stderr to detect exit
            });
            // Store reference for cleanup
            this.backendProcess = child;
            // Monitor backend exit - if it exits cleanly (code 0), this wrapper should also exit
            child.on('exit', code => {
                this.backendProcess = null; // Clear reference when backend exits
                if (code === 0) {
                    this.log('startBackend(): backend exited cleanly (likely lock failure), exiting wrapper');
                    process.exit(0); // Exit wrapper when backend fails to acquire lock
                }
                else if (code !== null) {
                    this.log('startBackend(): backend exited unexpectedly', { exitCode: code });
                }
            });
            // Don't unref since we want to monitor the process
            resolve();
        });
    }
    onData(chunk) {
        this.buffer += chunk;
        let idx;
        while ((idx = this.buffer.indexOf('\n')) >= 0) {
            const line = this.buffer.slice(0, idx).trim();
            this.buffer = this.buffer.slice(idx + 1);
            if (!line)
                continue;
            try {
                const msg = JSON.parse(line);
                this.log('onData(): received response', {
                    id: msg.id,
                    hasError: !!msg.error,
                    hasResult: !!msg.result,
                });
                const p = this.pending.get(msg.id);
                if (!p) {
                    this.log('onData(): no pending request found', { id: msg.id });
                    continue;
                }
                this.pending.delete(msg.id);
                if (msg.error)
                    p.reject(new Error(msg.error.message));
                else
                    p.resolve(msg.result);
            }
            catch (e) {
                this.log('onData(): JSON parse error', {
                    error: e?.message,
                    lineLength: line.length,
                });
            }
        }
    }
    rejectAll(err) {
        for (const [, p] of this.pending)
            p.reject(err);
        this.pending.clear();
        this.socket = null;
    }
    send(method, params) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.ensure();
            }
            catch (e) {
                this.log('send(): ensure failed', { error: e?.message });
                return reject(e);
            }
            const id = Math.random().toString(36).slice(2);
            const req = { id, method, params };
            this.pending.set(id, { resolve, reject });
            try {
                this.log('send(): write', { method });
                this.socket.write(JSON.stringify(req) + '\n', 'utf8');
            }
            catch (e) {
                this.pending.delete(id);
                this.log('send(): write error', { error: e?.message });
                reject(e);
            }
        });
    }
    cleanup() {
        this.log('cleanup(): shutting down backend');
        if (this.backendProcess && !this.backendProcess.killed) {
            try {
                // Kill backend process - works cross-platform
                this.backendProcess.kill();
                this.log('cleanup(): backend process killed');
            }
            catch (e) {
                this.log('cleanup(): error killing backend', { error: e?.message });
            }
        }
        if (this.socket && !this.socket.destroyed) {
            this.socket.destroy();
        }
    }
}
async function startWrapper() {
    const backend = new BackendClient();
    // Pre-connect to backend BEFORE initializing MCP server
    // This ensures tools/list requests respond immediately without timeout
    try {
        await backend.ensure();
        try {
            backend.log?.('startWrapper(): pre-connected to backend');
        }
        catch { }
    }
    catch (e) {
        try {
            backend.log?.('startWrapper(): pre-connection failed, will retry on demand', {
                error: e?.message,
            });
        }
        catch { }
    }
    const mcp = new Server({ name: config.server.name, version: config.server.version }, { capabilities: { tools: {} } });
    // Setup cleanup handlers - cross-platform approach
    // When stdin closes (Claude Desktop exits), clean up the backend
    process.stdin.on('end', () => {
        backend.cleanup();
        process.exit(0);
    });
    // Also handle process termination signals
    process.on('SIGTERM', () => {
        backend.cleanup();
        process.exit(0);
    });
    process.on('SIGINT', () => {
        backend.cleanup();
        process.exit(0);
    });
    mcp.setRequestHandler(ListToolsRequestSchema, async () => {
        try {
            const res = await backend.send('list_tools', {});
            try {
                backend.log?.('ListTools handler: received from backend', {
                    hasTools: !!res.tools,
                    toolCount: res.tools?.length || 0,
                });
            }
            catch { }
            return { tools: res.tools || [] };
        }
        catch (e) {
            // Log but return empty to remain MCP-compliant
            try {
                backend.log?.('ListTools failed; returning empty', { error: e?.message });
            }
            catch { }
            return { tools: [] };
        }
    });
    mcp.setRequestHandler(CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;
        try {
            const res = await backend.send('call_tool', { name, args: args ?? {} });
            return res;
        }
        catch (e) {
            return {
                content: [{ type: 'text', text: `Error: ${e?.message || 'Backend unavailable'}` }],
                isError: true,
            };
        }
    });
    const transport = new StdioServerTransport();
    await mcp.connect(transport);
}
startWrapper().catch(err => {
    console.error('Wrapper failed:', err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map