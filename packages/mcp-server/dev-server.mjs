/**
 * dev-server.mjs — Hot-reload wrapper for the Foundry MCP server.
 *
 * Claude Desktop launches this instead of `node dist/index.js`.
 * The wrapper:
 *   1. Starts `tsc --watch` in the background (compiles src/ → dist/).
 *   2. Watches dist/ for .js changes triggered by tsc.
 *   3. Restarts the MCP server child process on each change.
 *
 * MCP protocol runs over stdio. With `stdio: 'inherit'` the child
 * shares the same stdin/stdout fds as this wrapper, so Claude Desktop
 * never loses the connection at the transport level — it just sees a
 * brief pause while the process restarts (~300-500 ms).
 */

import { spawn } from 'child_process';
import { watch } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir    = join(__dirname, 'dist');
const entryPoint = join(distDir, 'index.js');

let serverProcess = null;
let debounceTimer = null;

// ---------------------------------------------------------------------------
// Server lifecycle
// ---------------------------------------------------------------------------

function startServer() {
  if (serverProcess) {
    serverProcess.kill('SIGTERM');
    serverProcess = null;
  }

  serverProcess = spawn('node', [entryPoint], {
    stdio: 'inherit',   // share parent's stdin/stdout/stderr — keeps MCP pipe intact
    env: process.env,
  });

  serverProcess.on('exit', (code, signal) => {
    if (signal === 'SIGTERM') return;   // expected restart, ignore
    process.exit(code ?? 1);           // unexpected exit — propagate to Claude Desktop
  });
}

function scheduleRestart() {
  if (debounceTimer) clearTimeout(debounceTimer);
  // Debounce: tsc emits several file writes per compilation pass
  debounceTimer = setTimeout(startServer, 600);
}

// ---------------------------------------------------------------------------
// tsc --watch (compiles src/ → dist/ continuously)
// Route all tsc output to /dev/null to avoid polluting the MCP stdout stream.
// ---------------------------------------------------------------------------

const tscProcess = spawn(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['tsc', '--watch', '--preserveWatchOutput'],
  {
    stdio: ['ignore', 'ignore', 'ignore'],
    cwd: __dirname,
    env: process.env,
  }
);

// ---------------------------------------------------------------------------
// Watch dist/ for JS changes
// ---------------------------------------------------------------------------

watch(distDir, { recursive: false }, (eventType, filename) => {
  if (eventType === 'change' && filename?.endsWith('.js')) {
    scheduleRestart();
  }
});

// ---------------------------------------------------------------------------
// Initial start + cleanup
// ---------------------------------------------------------------------------

startServer();

function shutdown() {
  if (debounceTimer) clearTimeout(debounceTimer);
  try { tscProcess.kill(); } catch (_) {}
  try { if (serverProcess) serverProcess.kill(); } catch (_) {}
  process.exit(0);
}

process.on('SIGINT',  shutdown);
process.on('SIGTERM', shutdown);
