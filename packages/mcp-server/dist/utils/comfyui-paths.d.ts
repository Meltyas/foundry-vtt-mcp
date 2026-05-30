/**
 * ComfyUI installation detection utilities
 */
/**
 * Check if a directory contains a valid ComfyUI installation
 */
export declare function isValidComfyUIPath(dirPath: string): boolean;
/**
 * Attempt to detect an existing ComfyUI installation
 * Returns the path if found, or null if not found
 */
export declare function detectComfyUIInstallation(): string | null;
/**
 * Get the ComfyUI Desktop download URL for Mac
 */
export declare function getComfyUIDesktopURL(): string;
/**
 * Check if ComfyUI Desktop is likely installed on Mac
 */
export declare function isComfyUIDesktopInstalled(): boolean;
/**
 * Get Python command for running ComfyUI on the current platform
 * For headless installs, returns the path to the venv Python
 */
export declare function getDefaultPythonCommand(installPath?: string): string;
