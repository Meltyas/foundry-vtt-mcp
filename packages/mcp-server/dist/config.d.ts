import { z } from 'zod';
declare const ConfigSchema: z.ZodObject<{
    logLevel: z.ZodDefault<z.ZodEnum<["error", "warn", "info", "debug"]>>;
    logFormat: z.ZodDefault<z.ZodEnum<["json", "simple"]>>;
    enableFileLogging: z.ZodDefault<z.ZodBoolean>;
    logFilePath: z.ZodOptional<z.ZodString>;
    foundry: z.ZodObject<{
        host: z.ZodDefault<z.ZodString>;
        port: z.ZodDefault<z.ZodNumber>;
        namespace: z.ZodDefault<z.ZodString>;
        reconnectAttempts: z.ZodDefault<z.ZodNumber>;
        reconnectDelay: z.ZodDefault<z.ZodNumber>;
        connectionTimeout: z.ZodDefault<z.ZodNumber>;
        connectionType: z.ZodDefault<z.ZodEnum<["websocket", "webrtc", "auto"]>>;
        protocol: z.ZodDefault<z.ZodEnum<["ws", "wss"]>>;
        remoteMode: z.ZodDefault<z.ZodBoolean>;
        dataPath: z.ZodOptional<z.ZodString>;
        rejectUnauthorized: z.ZodDefault<z.ZodBoolean>;
        webrtc: z.ZodDefault<z.ZodObject<{
            stunServers: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            stunServers: string[];
        }, {
            stunServers?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        host: string;
        port: number;
        namespace: string;
        reconnectAttempts: number;
        reconnectDelay: number;
        connectionTimeout: number;
        webrtc: {
            stunServers: string[];
        };
        connectionType: "websocket" | "webrtc" | "auto";
        protocol: "ws" | "wss";
        remoteMode: boolean;
        rejectUnauthorized: boolean;
        dataPath?: string | undefined;
    }, {
        host?: string | undefined;
        port?: number | undefined;
        namespace?: string | undefined;
        reconnectAttempts?: number | undefined;
        reconnectDelay?: number | undefined;
        connectionTimeout?: number | undefined;
        webrtc?: {
            stunServers?: string[] | undefined;
        } | undefined;
        connectionType?: "websocket" | "webrtc" | "auto" | undefined;
        protocol?: "ws" | "wss" | undefined;
        remoteMode?: boolean | undefined;
        dataPath?: string | undefined;
        rejectUnauthorized?: boolean | undefined;
    }>;
    comfyui: z.ZodObject<{
        port: z.ZodDefault<z.ZodNumber>;
        installPath: z.ZodString;
        host: z.ZodDefault<z.ZodString>;
        pythonCommand: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        host: string;
        port: number;
        installPath: string;
        pythonCommand: string;
    }, {
        installPath: string;
        host?: string | undefined;
        port?: number | undefined;
        pythonCommand?: string | undefined;
    }>;
    toolResponseMaxChars: z.ZodDefault<z.ZodNumber>;
    server: z.ZodObject<{
        name: z.ZodDefault<z.ZodString>;
        version: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        version: string;
    }, {
        name?: string | undefined;
        version?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    logLevel: "error" | "warn" | "info" | "debug";
    logFormat: "json" | "simple";
    enableFileLogging: boolean;
    foundry: {
        host: string;
        port: number;
        namespace: string;
        reconnectAttempts: number;
        reconnectDelay: number;
        connectionTimeout: number;
        webrtc: {
            stunServers: string[];
        };
        connectionType: "websocket" | "webrtc" | "auto";
        protocol: "ws" | "wss";
        remoteMode: boolean;
        rejectUnauthorized: boolean;
        dataPath?: string | undefined;
    };
    comfyui: {
        host: string;
        port: number;
        installPath: string;
        pythonCommand: string;
    };
    toolResponseMaxChars: number;
    server: {
        name: string;
        version: string;
    };
    logFilePath?: string | undefined;
}, {
    foundry: {
        host?: string | undefined;
        port?: number | undefined;
        namespace?: string | undefined;
        reconnectAttempts?: number | undefined;
        reconnectDelay?: number | undefined;
        connectionTimeout?: number | undefined;
        webrtc?: {
            stunServers?: string[] | undefined;
        } | undefined;
        connectionType?: "websocket" | "webrtc" | "auto" | undefined;
        protocol?: "ws" | "wss" | undefined;
        remoteMode?: boolean | undefined;
        dataPath?: string | undefined;
        rejectUnauthorized?: boolean | undefined;
    };
    comfyui: {
        installPath: string;
        host?: string | undefined;
        port?: number | undefined;
        pythonCommand?: string | undefined;
    };
    server: {
        name?: string | undefined;
        version?: string | undefined;
    };
    logLevel?: "error" | "warn" | "info" | "debug" | undefined;
    logFormat?: "json" | "simple" | undefined;
    enableFileLogging?: boolean | undefined;
    logFilePath?: string | undefined;
    toolResponseMaxChars?: number | undefined;
}>;
export type Config = z.infer<typeof ConfigSchema>;
export declare const config: {
    logLevel: "error" | "warn" | "info" | "debug";
    logFormat: "json" | "simple";
    enableFileLogging: boolean;
    foundry: {
        host: string;
        port: number;
        namespace: string;
        reconnectAttempts: number;
        reconnectDelay: number;
        connectionTimeout: number;
        webrtc: {
            stunServers: string[];
        };
        connectionType: "websocket" | "webrtc" | "auto";
        protocol: "ws" | "wss";
        remoteMode: boolean;
        rejectUnauthorized: boolean;
        dataPath?: string | undefined;
    };
    comfyui: {
        host: string;
        port: number;
        installPath: string;
        pythonCommand: string;
    };
    toolResponseMaxChars: number;
    server: {
        name: string;
        version: string;
    };
    logFilePath?: string | undefined;
};
/**
 * WebRTC Protocol Constants
 *
 * SCTP (Stream Control Transmission Protocol) limits for WebRTC data channels
 */
export declare const WEBRTC_CONSTANTS: {
    /**
     * SCTP maxMessageSize limit - hard limit imposed by WebRTC specification
     * Messages exceeding this size will fail with "OperationError: Failure to send data"
     */
    readonly MAX_MESSAGE_SIZE: 65536;
    /**
     * Safe chunk size threshold for splitting large messages
     * Set below MAX_MESSAGE_SIZE to account for:
     * - JSON stringification overhead (~1-2KB for chunk metadata)
     * - String escaping (quotes, backslashes, unicode) can increase size 5-20%
     * - Safety buffer to prevent edge cases
     *
     * Testing showed 50KB provides reliable chunking with ~14KB headroom
     */
    readonly CHUNK_SIZE: number;
    /**
     * Timeout for incomplete chunked messages (milliseconds)
     * After this time, pending chunks are cleaned up to prevent memory leaks
     *
     * Network issues or client disconnects can leave incomplete messages
     * Set to 30 seconds - longer than typical query timeout (10s) but prevents indefinite storage
     */
    readonly CHUNK_TIMEOUT_MS: 30000;
    /**
     * Maximum chunks allowed per message
     * Security limit to prevent "chunk bomb" attacks where malicious clients
     * send huge totalChunks values to trigger memory allocation attacks
     *
     * 1000 chunks * 50KB = 50MB maximum message size
     * This is far larger than any legitimate Foundry VTT data
     */
    readonly MAX_CHUNKS_PER_MESSAGE: 1000;
    /**
     * Interval for cleanup of timed-out chunks (milliseconds)
     * Background task runs periodically to remove incomplete messages
     */
    readonly CHUNK_CLEANUP_INTERVAL_MS: 10000;
};
export {};
