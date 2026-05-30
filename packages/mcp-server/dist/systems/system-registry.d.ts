/**
 * System Registry
 *
 * Central registry for managing system adapters. Allows dynamic registration
 * of game system support without modifying core files.
 */
import { SystemAdapter, SystemId } from './types.js';
import { Logger } from '../logger.js';
/**
 * Registry for system adapters
 */
export declare class SystemRegistry {
    private adapters;
    private logger;
    constructor(logger?: Logger);
    /**
     * Register a system adapter
     * @param adapter - System adapter to register
     */
    register(adapter: SystemAdapter): void;
    /**
     * Get adapter for a specific system ID
     * @param systemId - Foundry system ID to look up
     * @returns System adapter or null if not found
     */
    getAdapter(systemId: string): SystemAdapter | null;
    /**
     * Get all registered adapters
     */
    getAllAdapters(): SystemAdapter[];
    /**
     * Check if a system is supported
     * @param systemId - Foundry system ID
     */
    isSupported(systemId: string): boolean;
    /**
     * Get list of all supported system IDs
     */
    getSupportedSystems(): SystemId[];
    /**
     * Get metadata for all registered systems
     */
    getAllMetadata(): import("./types.js").SystemMetadata[];
    /**
     * Clear all registered adapters (useful for testing)
     */
    clear(): void;
}
/**
 * Get the global system registry instance
 */
export declare function getSystemRegistry(logger?: Logger): SystemRegistry;
/**
 * Reset the global registry (for testing)
 */
export declare function resetSystemRegistry(): void;
