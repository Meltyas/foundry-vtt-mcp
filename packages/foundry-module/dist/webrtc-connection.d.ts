export interface WebRTCConfig {
    serverHost: string;
    serverPort: number;
    namespace: string;
    stunServers: string[];
    connectionTimeout: number;
    debugLogging: boolean;
}
/**
 * WebRTC peer connection for browser-to-server communication
 * Uses HTTP POST for signaling (localhost exception allows HTTP from HTTPS)
 * Then establishes encrypted WebRTC DataChannel for P2P connection without SSL certificates
 */
export declare class WebRTCConnection {
    private config;
    private peerConnection;
    private dataChannel;
    private connectionState;
    private messageHandler;
    constructor(config: WebRTCConfig);
    connect(onMessage: (message: any) => Promise<void>): Promise<void>;
    private setupDataChannelHandlers;
    private setupPeerConnectionHandlers;
    private waitForIceGathering;
    private sendSignalingOffer;
    disconnect(): void;
    sendMessage(message: any): void;
    isConnected(): boolean;
    getConnectionState(): string;
    private log;
}
//# sourceMappingURL=webrtc-connection.d.ts.map