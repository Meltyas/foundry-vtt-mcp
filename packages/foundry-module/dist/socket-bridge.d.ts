export interface BridgeConfig {
    enabled: boolean;
    serverHost: string;
    serverPort: number;
    namespace: string;
    reconnectAttempts: number;
    reconnectDelay: number;
    connectionTimeout: number;
    debugLogging: boolean;
    connectionType?: 'auto' | 'webrtc' | 'websocket';
}
/**
 * Browser-compatible socket bridge that supports both WebSocket and WebRTC
 */
export declare class SocketBridge {
    private config;
    private ws;
    private webrtc;
    private connectionState;
    private reconnectAttempts;
    private maxReconnectAttempts;
    private reconnectTimer;
    private activeConnectionType;
    constructor(config: BridgeConfig);
    connect(): Promise<void>;
    private determineConnectionType;
    private connectWebRTC;
    private connectWebSocket;
    disconnect(): void;
    private setupEventHandlers;
    private handleMessage;
    private handleProgressUpdate;
    private handleMCPQuery;
    private handleJobCompleted;
    private createSceneWalls;
    /**
     * Ensure "AI Generated Maps" folder exists for organizing generated scenes
     */
    private ensureAIMapsFolderExists;
    private scheduleReconnect;
    private sendMessage;
    emitToServer(event: string, data?: any): void;
    isConnected(): boolean;
    getConnectionState(): string;
    getConnectionInfo(): any;
    private log;
}
//# sourceMappingURL=socket-bridge.d.ts.map