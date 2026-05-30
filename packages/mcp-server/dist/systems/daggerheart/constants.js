/**
 * Daggerheart System Constants
 *
 * Item types, actor types, and data path definitions for the Daggerheart RPG system.
 * Source: system.json from the Daggerheart Foundry VTT system (v2.x)
 */
/** Valid item types in the Daggerheart system */
export const DAGGERHEART_ITEM_TYPES = [
    'ancestry',
    'community',
    'class',
    'subclass',
    'feature',
    'domainCard',
    'loot',
    'consumable',
    'weapon',
    'armor',
    'beastform',
];
/** Valid actor types in the Daggerheart system */
export const DAGGERHEART_ACTOR_TYPES = [
    'character',
    'companion',
    'adversary',
    'environment',
    'party',
];
/** Human-readable labels for item types */
export const DAGGERHEART_ITEM_LABELS = {
    ancestry: 'Ancestry',
    community: 'Community',
    class: 'Class',
    subclass: 'Subclass',
    feature: 'Feature',
    domainCard: 'Domain Card',
    loot: 'Loot',
    consumable: 'Consumable',
    weapon: 'Weapon',
    armor: 'Armor',
    beastform: 'Beast Form',
};
/** Equipment item types (physical objects) */
export const DAGGERHEART_EQUIPMENT_TYPES = [
    'weapon',
    'armor',
    'consumable',
    'loot',
];
/** Character-build item types (options chosen during character creation) */
export const DAGGERHEART_BUILD_TYPES = [
    'ancestry',
    'community',
    'class',
    'subclass',
    'feature',
    'domainCard',
    'beastform',
];
/**
 * Data path mappings for Daggerheart actor properties.
 * Paths use dot notation relative to actor.system
 */
export const DAGGERHEART_DATA_PATHS = {
    // Character resources
    hp: 'hp.value',
    hpMax: 'hp.max',
    stress: 'stress.value',
    stressMax: 'stress.max',
    hope: 'hope.value',
    hopeMax: 'hope.max',
    // Character stats
    agility: 'attributes.agility.value',
    strength: 'attributes.strength.value',
    finesse: 'attributes.finesse.value',
    instinct: 'attributes.instinct.value',
    presence: 'attributes.presence.value',
    knowledge: 'attributes.knowledge.value',
    // Adversary properties
    difficulty: 'difficulty',
    tier: 'tier',
    adversaryType: 'type',
};
//# sourceMappingURL=constants.js.map