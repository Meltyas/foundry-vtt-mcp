/**
 * Index Builder Registry
 *
 * Registry for enhanced creature index builders. This runs in Foundry's
 * browser context (foundry-module), separate from the SystemRegistry
 * which runs in the MCP server (Node.js).
 */
/**
 * Registry for index builders
 */
export class IndexBuilderRegistry {
    builders = new Map();
    /**
     * Register an index builder
     * @param builder - Index builder to register
     */
    register(builder) {
        const systemId = builder.getSystemId();
        if (this.builders.has(systemId)) {
            console.warn(`Index builder already registered: ${systemId}. Overwriting.`);
        }
        this.builders.set(systemId, builder);
        console.log(`Registered index builder for system: ${systemId}`);
    }
    /**
     * Get builder for a specific system ID
     * @param systemId - System ID to look up
     * @returns Index builder or null if not found
     */
    getBuilder(systemId) {
        const builder = this.builders.get(systemId);
        if (!builder) {
            console.warn(`No index builder found for system: ${systemId}`);
            return null;
        }
        return builder;
    }
    /**
     * Get all registered builders
     */
    getAllBuilders() {
        return Array.from(this.builders.values());
    }
    /**
     * Check if a system has a registered builder
     * @param systemId - System ID to check
     */
    hasBuilder(systemId) {
        return this.builders.has(systemId);
    }
    /**
     * Get list of all supported system IDs
     */
    getSupportedSystems() {
        return Array.from(this.builders.keys());
    }
    /**
     * Clear all registered builders (useful for testing)
     */
    clear() {
        this.builders.clear();
        console.log('Cleared all index builders');
    }
}
// Singleton instance (browser context)
let registryInstance = null;
/**
 * Get the global index builder registry instance
 */
export function getIndexBuilderRegistry() {
    if (!registryInstance) {
        registryInstance = new IndexBuilderRegistry();
    }
    return registryInstance;
}
/**
 * Reset the global registry (for testing)
 */
export function resetIndexBuilderRegistry() {
    registryInstance = null;
}
//# sourceMappingURL=index-builder-registry.js.map