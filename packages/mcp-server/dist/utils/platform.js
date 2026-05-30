/**
 * Cross-platform utilities for detecting OS and providing platform-specific paths
 */
export function getPlatform() {
    return process.platform;
}
export function isWindows() {
    return process.platform === 'win32';
}
export function isMac() {
    return process.platform === 'darwin';
}
export function isLinux() {
    return process.platform === 'linux';
}
/**
 * Get the default Claude Desktop config directory for the current platform
 */
export function getClaudeConfigDir() {
    const platform = getPlatform();
    switch (platform) {
        case 'win32':
            return process.env.APPDATA
                ? `${process.env.APPDATA}\\Claude`
                : 'C:\\Users\\Default\\AppData\\Roaming\\Claude';
        case 'darwin':
            return `${process.env.HOME}/Library/Application Support/Claude`;
        case 'linux':
            return `${process.env.HOME}/.config/Claude`;
        default:
            throw new Error(`Unsupported platform: ${platform}`);
    }
}
/**
 * Get the default Foundry VTT data directory for the current platform
 */
export function getFoundryDataDir() {
    const platform = getPlatform();
    switch (platform) {
        case 'win32':
            return process.env.LOCALAPPDATA
                ? `${process.env.LOCALAPPDATA}\\FoundryVTT\\Data`
                : 'C:\\Users\\Default\\AppData\\Local\\FoundryVTT\\Data';
        case 'darwin':
            return `${process.env.HOME}/Library/Application Support/FoundryVTT/Data`;
        case 'linux':
            return `${process.env.HOME}/.local/share/FoundryVTT/Data`;
        default:
            throw new Error(`Unsupported platform: ${platform}`);
    }
}
/**
 * Get the default application data directory for this MCP server
 */
export function getAppDataDir() {
    const platform = getPlatform();
    switch (platform) {
        case 'win32':
            return process.env.LOCALAPPDATA
                ? `${process.env.LOCALAPPDATA}\\FoundryMCPServer`
                : 'C:\\Users\\Default\\AppData\\Local\\FoundryMCPServer';
        case 'darwin':
            return `${process.env.HOME}/Library/Application Support/FoundryMCPServer`;
        case 'linux':
            return `${process.env.HOME}/.local/share/FoundryMCPServer`;
        default:
            throw new Error(`Unsupported platform: ${platform}`);
    }
}
/**
 * Get the default ComfyUI installation directory for the current platform
 */
export function getDefaultComfyUIDir() {
    const appDataDir = getAppDataDir();
    // Both Windows and Mac use the same relative path structure
    return `${appDataDir}/ComfyUI-headless`;
}
/**
 * Get platform-specific spawn options for running a hidden background process
 */
export function getHiddenProcessSpawnOptions() {
    const platform = getPlatform();
    if (platform === 'win32') {
        return {
            detached: false,
            stdio: 'ignore',
            windowsHide: true,
        };
    }
    else {
        // Mac and Linux: detached + ignore stdio to prevent terminal window
        return {
            detached: true,
            stdio: 'ignore',
        };
    }
}
/**
 * Check if running on Apple Silicon (ARM64 Mac)
 */
export function isAppleSilicon() {
    return process.platform === 'darwin' && process.arch === 'arm64';
}
/**
 * Check if running on Intel Mac
 */
export function isIntelMac() {
    return process.platform === 'darwin' && process.arch === 'x64';
}
//# sourceMappingURL=platform.js.map