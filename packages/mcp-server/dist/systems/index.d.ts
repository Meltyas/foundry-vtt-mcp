/**
 * System Adapter Architecture
 *
 * Exports all types, registries, and utilities for the multi-system support.
 */
export type { SystemId, SystemMetadata, SystemCreatureIndex, SystemAdapter, IndexBuilder, DnD5eCreatureIndex, PF2eCreatureIndex, DSA5CreatureIndex, CosmereRpgCreatureIndex, DaggerheartCreatureIndex, GenericCreatureIndex, AnyCreatureIndex, } from './types.js';
export { SystemRegistry, getSystemRegistry, resetSystemRegistry } from './system-registry.js';
export { IndexBuilderRegistry, getIndexBuilderRegistry, resetIndexBuilderRegistry, } from './index-builder-registry.js';
