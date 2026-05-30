/**
 * DSA5 System Module
 *
 * Exports for DSA5 (Das Schwarze Auge 5) system support
 * in the v0.6.0 Registry Pattern architecture.
 */
// Index builder (runs in Foundry browser context)
export { DSA5IndexBuilder } from './index-builder.js';
// System adapter (runs in MCP server Node.js context)
export { DSA5Adapter } from './adapter.js';
// Character creator (runs in MCP server Node.js context)
export { DSA5CharacterCreator } from './character-creator.js';
// Filter system
export { DSA5Species, CreatureSizes, ExperienceLevels, DSA5FiltersSchema, matchesDSA5Filters, describeDSA5Filters, isValidDSA5Species, isValidExperienceLevel, } from './filters.js';
// Constants
export { EXPERIENCE_LEVELS, getExperienceLevel, getExperienceLevelByNumber, EXPERIENCE_LEVEL_NAMES_DE, EXPERIENCE_LEVEL_NAMES_EN, EIGENSCHAFT_NAMES, SIZE_MAP_DE_TO_EN, SIZE_MAP_EN_TO_DE, FIELD_PATHS, ITEM_TYPES, ACTOR_TYPES, RESOURCE_TYPES, SKILL_GROUPS, } from './constants.js';
//# sourceMappingURL=index.js.map