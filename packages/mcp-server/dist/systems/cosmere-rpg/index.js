/**
 * Cosmere RPG System Module
 *
 * Re-exports for the Cosmere RPG adapter and index builder.
 *
 * Register `CosmereRpgAdapter` with the system registry in backend.ts (Node)
 * and `CosmereRpgIndexBuilder` with the IndexBuilderRegistry in the foundry
 * module's main.ts (browser) to enable creature indexing end-to-end.
 */
// Index builder (runs in Foundry browser context)
export { CosmereRpgIndexBuilder } from './index-builder.js';
// System adapter (runs in MCP server Node.js context)
export { CosmereRpgAdapter } from './adapter.js';
// Filter system
export { CosmereRpgFiltersSchema, matchesCosmereRpgFilters, describeCosmereRpgFilters, COSMERE_ROLES, COSMERE_CREATURE_TYPES, COSMERE_SIZES, } from './filters.js';
// Constants
export { COSMERE_ATTR_KEYS, COSMERE_DEFENSE_KEYS, COSMERE_RESOURCES, readDerived, } from './constants.js';
//# sourceMappingURL=index.js.map