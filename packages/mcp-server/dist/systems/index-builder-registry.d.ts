/**
 * Index Builder Registry
 *
 * Registry for enhanced creature index builders. This runs in Foundry's
 * browser context (foundry-module), separate from the SystemRegistry
 * which runs in the MCP server (Node.js).
 */
import { IndexBuilder, SystemId } from './types.js';
/**
 * Registry for index builders
 */
export declare class IndexBuilderRegistry {
    private builders;
    /**
     * Register an index builder
     * @param builder - Index builder to register
     */
    register(builder: IndexBuilder): void;
    /**
     * Get builder for a specific system ID
     * @param systemId - System ID to look up
     * @returns Index builder or null if not found
     */
    getBuilder(systemId: string): IndexBuilder | null;
    /**
     * Get all registered builders
     */
    getAllBuilders(): IndexBuilder[];
    /**
     * Check if a system has a registered builder
     * @param systemId - System ID to check
     */
    hasBuilder(systemId: string): boolean;
    /**
     * Get list of all supported system IDs
     */
    getSupportedSystems(): SystemId[];
    /**
     * Clear all registered builders (useful for testing)
     */
    clear(): void;
}
/**
 * Get the global index builder registry instance
 */
export declare function getIndexBuilderRegistry(): IndexBuilderRegistry;
/**
 * Reset the global registry (for testing)
 */
export declare function resetIndexBuilderRegistry(): void;
