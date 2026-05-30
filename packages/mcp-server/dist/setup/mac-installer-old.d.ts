/**
 * Mac Setup Installer - Auto-installs ComfyUI Desktop on Apple Silicon
 */
import { Logger } from '../logger.js';
export interface SetupProgress {
    stage: 'idle' | 'checking' | 'downloading_comfyui' | 'installing_comfyui' | 'downloading_model' | 'complete' | 'error';
    progress: number;
    message: string;
    error?: string;
}
export declare class MacInstaller {
    private logger;
    private progressCallback?;
    constructor(logger: Logger);
    setProgressCallback(callback: (progress: SetupProgress) => void): void;
    private updateProgress;
    /**
     * Check if ComfyUI is already installed
     */
    isComfyUIInstalled(): boolean;
    /**
     * Check if SDXL model is installed
     */
    isModelInstalled(): boolean;
    /**
     * Get the path where the SDXL model should be installed
     */
    getModelPath(): string;
    /**
     * Check if this Mac can run ComfyUI (Apple Silicon only)
     */
    canRunComfyUI(): {
        canRun: boolean;
        reason?: string;
    };
    /**
     * Download ComfyUI Desktop DMG
     */
    downloadComfyUI(downloadPath: string): Promise<void>;
    /**
     * Install ComfyUI from DMG
     */
    installComfyUI(dmgPath: string): Promise<void>;
    /**
     * Download SDXL model
     */
    downloadModel(): Promise<void>;
    /**
     * Run complete setup process
     */
    runSetup(options?: {
        skipComfyUI?: boolean;
        skipModel?: boolean;
    }): Promise<void>;
    /**
     * Get setup status
     */
    getSetupStatus(): {
        canRun: boolean;
        reason?: string | undefined;
        comfyUIInstalled: boolean;
        modelInstalled: boolean;
        ready: boolean;
    };
}
