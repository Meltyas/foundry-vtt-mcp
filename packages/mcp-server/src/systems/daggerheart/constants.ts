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
] as const;

export type DaggerheartItemType = (typeof DAGGERHEART_ITEM_TYPES)[number];

/** Valid actor types in the Daggerheart system */
export const DAGGERHEART_ACTOR_TYPES = [
  'character',
  'companion',
  'adversary',
  'environment',
  'party',
] as const;

export type DaggerheartActorType = (typeof DAGGERHEART_ACTOR_TYPES)[number];

/** Human-readable labels for item types */
export const DAGGERHEART_ITEM_LABELS: Record<DaggerheartItemType, string> = {
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
export const DAGGERHEART_EQUIPMENT_TYPES: DaggerheartItemType[] = [
  'weapon',
  'armor',
  'consumable',
  'loot',
];

/** Character-build item types (options chosen during character creation) */
export const DAGGERHEART_BUILD_TYPES: DaggerheartItemType[] = [
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
} as const;
