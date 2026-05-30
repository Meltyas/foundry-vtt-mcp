/**
 * Cross-platform utilities for detecting OS and providing platform-specific paths
 */
export type Platform = 'win32' | 'darwin' | 'linux';
export declare function getPlatform(): Platform;
export declare function isWindows(): boolean;
export declare function isMac(): boolean;
export declare function isLinux(): boolean;
/**
 * Get the default Claude Desktop config directory for the current platform
 */
export declare function getClaudeConfigDir(): string;
/**
 * Get the default Foundry VTT data directory for the current platform
 */
export declare function getFoundryDataDir(): string;
/**
 * Get the default application data directory for this MCP server
 */
export declare function getAppDataDir(): string;
/**
 * Get the default ComfyUI installation directory for the current platform
 */
export declare function getDefaultComfyUIDir(): string;
/**
 * Get platform-specific spawn options for running a hidden background process
 */
export declare function getHiddenProcessSpawnOptions(): {
    detached: boolean;
    stdio: 'ignore' | Array<'ignore' | 'pipe'>;
    windowsHide?: boolean;
};
/**
 * Check if running on Apple Silicon (ARM64 Mac)
 */
export declare function isAppleSilicon(): boolean;
/**
 * Check if running on Intel Mac
 */
export declare function isIntelMac(): boolean;
