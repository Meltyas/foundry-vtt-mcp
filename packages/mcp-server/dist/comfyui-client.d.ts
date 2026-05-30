import { Logger } from './logger.js';
export interface ComfyUIWorkflowInput {
    prompt: string;
    width: number;
    height: number;
    seed?: number;
    quality?: 'low' | 'medium' | 'high';
}
export interface ComfyUIJobResponse {
    prompt_id: string;
    number: number;
    node_errors?: any;
}
export interface ComfyUIConfig {
    installPath?: string | undefined;
    host: string;
    port: number;
    pythonCommand: string;
    autoStart: boolean;
}
export interface ComfyUIHealthInfo {
    available: boolean;
    responseTime?: number;
    systemInfo?: any;
    gpuInfo?: string | undefined;
}
export declare class ComfyUIClient {
    private config;
    private logger;
    private process?;
    private baseUrl;
    private clientId;
    private logStream?;
    private ws?;
    private progressCallbacks;
    constructor(options: {
        logger: Logger;
        config?: Partial<ComfyUIConfig>;
    });
    private connectWebSocket;
    private handleWebSocketMessage;
    registerProgressCallback(promptId: string, callback: (progress: {
        currentStep: number;
        totalSteps: number;
    }) => void): void;
    unregisterProgressCallback(promptId: string): void;
    private getDefaultInstallPath;
    checkInstallation(): Promise<boolean>;
    checkHealth(): Promise<ComfyUIHealthInfo>;
    private extractGPUInfo;
    startService(): Promise<void>;
    stopService(): Promise<void>;
    private waitForServiceReady;
    submitJob(input: ComfyUIWorkflowInput): Promise<ComfyUIJobResponse>;
    getJobStatus(promptId: string): Promise<'queued' | 'running' | 'complete' | 'failed'>;
    getJobStatusWithProgress(promptId: string): Promise<{
        status: 'queued' | 'running' | 'complete' | 'failed';
        currentStep?: number;
        totalSteps?: number;
        estimatedTimeRemaining?: number;
    }>;
    getJobImages(promptId: string): Promise<string[]>;
    downloadImage(filename: string): Promise<Buffer>;
    cancelJob(promptId: string): Promise<boolean>;
    private buildWorkflow;
    getSizePixels(size: 'small' | 'medium' | 'large'): number;
    shutdown(): Promise<void>;
}
