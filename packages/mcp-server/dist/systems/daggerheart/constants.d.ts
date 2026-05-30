/**
 * Daggerheart System Constants
 *
 * Item types, actor types, and data path definitions for the Daggerheart RPG system.
 * Source: system.json from the Daggerheart Foundry VTT system (v2.x)
 */
/** Valid item types in the Daggerheart system */
export declare const DAGGERHEART_ITEM_TYPES: readonly ["ancestry", "community", "class", "subclass", "feature", "domainCard", "loot", "consumable", "weapon", "armor", "beastform"];
export type DaggerheartItemType = (typeof DAGGERHEART_ITEM_TYPES)[number];
/** Valid actor types in the Daggerheart system */
export declare const DAGGERHEART_ACTOR_TYPES: readonly ["character", "companion", "adversary", "environment", "party"];
export type DaggerheartActorType = (typeof DAGGERHEART_ACTOR_TYPES)[number];
/** Human-readable labels for item types */
export declare const DAGGERHEART_ITEM_LABELS: Record<DaggerheartItemType, string>;
/** Equipment item types (physical objects) */
export declare const DAGGERHEART_EQUIPMENT_TYPES: DaggerheartItemType[];
/** Character-build item types (options chosen during character creation) */
export declare const DAGGERHEART_BUILD_TYPES: DaggerheartItemType[];
/**
 * Data path mappings for Daggerheart actor properties.
 * Paths use dot notation relative to actor.system
 */
export declare const DAGGERHEART_DATA_PATHS: {
    readonly hp: "hp.value";
    readonly hpMax: "hp.max";
    readonly stress: "stress.value";
    readonly stressMax: "stress.max";
    readonly hope: "hope.value";
    readonly hopeMax: "hope.max";
    readonly agility: "attributes.agility.value";
    readonly strength: "attributes.strength.value";
    readonly finesse: "attributes.finesse.value";
    readonly instinct: "attributes.instinct.value";
    readonly presence: "attributes.presence.value";
    readonly knowledge: "attributes.knowledge.value";
    readonly difficulty: "difficulty";
    readonly tier: "tier";
    readonly adversaryType: "type";
};
