/**
 * ComfyUI Service Manager - adapted from working foundry-mcp-mapgen implementation
 */
export declare class ComfyUIManager {
    private serviceStatus;
    private isStarting;
    checkStatus(): Promise<{
        status: string;
        message?: string;
        phase?: string;
    }>;
    startService(): Promise<{
        status: string;
        message?: string;
        phase?: string;
    }>;
    startServiceWithProgress(): Promise<{
        status: string;
        message?: string;
        phase?: string;
    }>;
    stopService(): Promise<{
        status: string;
        message?: string;
    }>;
    private requestBackendStatus;
    private requestBackendStartService;
    private requestBackendStopService;
    private sendBackendRequest;
    getServiceStatus(): string;
    /**
     * Generate a map using ComfyUI
     */
    generateMap(data: {
        prompt: string;
        size?: string;
        grid_size?: number;
    }): Promise<any>;
    /**
     * Check status of a map generation job
     */
    checkMapStatus(data: {
        job_id: string;
    }): Promise<any>;
    /**
     * Cancel a map generation job
     */
    cancelMapJob(data: {
        job_id: string;
    }): Promise<any>;
}
//# sourceMappingURL=comfyui-manager.d.ts.map