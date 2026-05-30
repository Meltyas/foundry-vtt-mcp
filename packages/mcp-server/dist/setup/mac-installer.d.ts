/**
 * Mac Setup Installer - Auto-installs ComfyUI Desktop + Models + Foundry Module on Apple Silicon
 */
import { Logger } from '../logger.js';
export interface SetupProgress {
    stage: 'idle' | 'checking' | 'downloading_comfyui' | 'installing_comfyui' | 'downloading_models' | 'installing_foundry_module' | 'complete' | 'error';
    progress: number;
    message: string;
    currentFile?: string;
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
     * Check if all models are installed
     */
    areModelsInstalled(): boolean;
    /**
     * Get the full path for a model file
     */
    private getModelFullPath;
    /**
     * Detect Foundry VTT installation
     */
    detectFoundryInstallation(): string | null;
    /**
     * Install Foundry MCP Bridge module
     */
    installFoundryModule(): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Recursively copy directory
     */
    private copyRecursiveSync;
    /**
     * Check if this Mac can run ComfyUI (Apple Silicon only)
     */
    canRunComfyUI(): {
        canRun: boolean;
        reason?: string;
    };
    /**
     * Get the ComfyUI download URL
     * Tries official DMG first, falls back to Homebrew cask API if that fails
     */
    private getComfyUIDownloadUrl;
    /**
     * Download ComfyUI Desktop (DMG or ZIP)
     * Returns whether the downloaded file is a DMG
     */
    downloadComfyUI(downloadPath: string): Promise<boolean>;
    /**
     * Install ComfyUI from ZIP or DMG
     */
    installComfyUI(archivePath: string): Promise<void>;
    /**
     * Download a single model file
     */
    private downloadFile;
    /**
     * Download all required models
     */
    downloadModels(): Promise<void>;
    /**
     * Run complete setup process
     */
    runSetup(options?: {
        skipComfyUI?: boolean;
        skipModels?: boolean;
        skipFoundryModule?: boolean;
    }): Promise<void>;
    /**
     * Get setup status
     */
    getSetupStatus(): {
        canRun: boolean;
        reason?: string | undefined;
        comfyUIInstalled: boolean;
        modelsInstalled: boolean;
        foundryDetected: boolean;
        ready: boolean;
    };
}
