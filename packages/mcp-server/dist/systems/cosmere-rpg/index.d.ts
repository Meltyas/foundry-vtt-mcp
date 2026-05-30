/**
 * Cosmere RPG System Module
 *
 * Re-exports for the Cosmere RPG adapter and index builder.
 *
 * Register `CosmereRpgAdapter` with the system registry in backend.ts (Node)
 * and `CosmereRpgIndexBuilder` with the IndexBuilderRegistry in the foundry
 * module's main.ts (browser) to enable creature indexing end-to-end.
 */
export type { CosmereRpgCreatureIndex } from '../types.js';
export { CosmereRpgIndexBuilder } from './index-builder.js';
export { CosmereRpgAdapter } from './adapter.js';
export { CosmereRpgFiltersSchema, matchesCosmereRpgFilters, describeCosmereRpgFilters, COSMERE_ROLES, COSMERE_CREATURE_TYPES, COSMERE_SIZES, type CosmereRpgFilters, type CosmereRole, type CosmereCreatureType, } from './filters.js';
export { COSMERE_ATTR_KEYS, COSMERE_DEFENSE_KEYS, COSMERE_RESOURCES, readDerived, } from './constants.js';
