/**
 * Compendium Search Filter Schemas
 *
 * Defines filter schemas for different game systems (D&D 5e, Pathfinder 2e)
 * to enable system-specific creature/actor searches.
 */
import { z } from 'zod';
import type { GameSystem } from './system-detection.js';
/**
 * D&D 5e creature types
 */
export declare const DnD5eCreatureTypes: readonly ["aberration", "beast", "celestial", "construct", "dragon", "elemental", "fey", "fiend", "giant", "humanoid", "monstrosity", "ooze", "plant", "undead"];
export type DnD5eCreatureType = (typeof DnD5eCreatureTypes)[number];
/**
 * Pathfinder 2e creature types (traits)
 * This is a common subset - PF2e has many more creature traits
 */
export declare const PF2eCreatureTypes: readonly ["aberration", "animal", "beast", "celestial", "construct", "dragon", "elemental", "fey", "fiend", "fungus", "humanoid", "monitor", "ooze", "plant", "undead"];
export type PF2eCreatureType = (typeof PF2eCreatureTypes)[number];
/**
 * Pathfinder 2e rarity levels
 */
export declare const PF2eRarities: readonly ["common", "uncommon", "rare", "unique"];
export type PF2eRarity = (typeof PF2eRarities)[number];
/**
 * Common creature sizes (used by both systems)
 */
export declare const CreatureSizes: readonly ["tiny", "small", "medium", "large", "huge", "gargantuan"];
export type CreatureSize = (typeof CreatureSizes)[number];
/**
 * D&D 5e filter schema
 */
export declare const DnD5eFiltersSchema: z.ZodObject<{
    challengeRating: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
    }>]>>;
    creatureType: z.ZodOptional<z.ZodEnum<["aberration", "beast", "celestial", "construct", "dragon", "elemental", "fey", "fiend", "giant", "humanoid", "monstrosity", "ooze", "plant", "undead"]>>;
    size: z.ZodOptional<z.ZodEnum<["tiny", "small", "medium", "large", "huge", "gargantuan"]>>;
    alignment: z.ZodOptional<z.ZodString>;
    hasLegendaryActions: z.ZodOptional<z.ZodBoolean>;
    spellcaster: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    challengeRating?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    creatureType?: "aberration" | "beast" | "celestial" | "construct" | "dragon" | "elemental" | "fey" | "fiend" | "giant" | "humanoid" | "monstrosity" | "ooze" | "plant" | "undead" | undefined;
    size?: "small" | "tiny" | "medium" | "large" | "huge" | "gargantuan" | undefined;
    alignment?: string | undefined;
    hasLegendaryActions?: boolean | undefined;
    spellcaster?: boolean | undefined;
}, {
    challengeRating?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    creatureType?: "aberration" | "beast" | "celestial" | "construct" | "dragon" | "elemental" | "fey" | "fiend" | "giant" | "humanoid" | "monstrosity" | "ooze" | "plant" | "undead" | undefined;
    size?: "small" | "tiny" | "medium" | "large" | "huge" | "gargantuan" | undefined;
    alignment?: string | undefined;
    hasLegendaryActions?: boolean | undefined;
    spellcaster?: boolean | undefined;
}>;
export type DnD5eFilters = z.infer<typeof DnD5eFiltersSchema>;
/**
 * Pathfinder 2e filter schema
 */
export declare const PF2eFiltersSchema: z.ZodObject<{
    level: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
    }>]>>;
    creatureType: z.ZodOptional<z.ZodEnum<["aberration", "animal", "beast", "celestial", "construct", "dragon", "elemental", "fey", "fiend", "fungus", "humanoid", "monitor", "ooze", "plant", "undead"]>>;
    traits: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    rarity: z.ZodOptional<z.ZodEnum<["common", "uncommon", "rare", "unique"]>>;
    size: z.ZodOptional<z.ZodEnum<["tiny", "small", "medium", "large", "huge", "gargantuan"]>>;
    alignment: z.ZodOptional<z.ZodString>;
    hasSpells: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    level?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    creatureType?: "aberration" | "beast" | "celestial" | "construct" | "dragon" | "elemental" | "fey" | "fiend" | "humanoid" | "ooze" | "plant" | "undead" | "animal" | "fungus" | "monitor" | undefined;
    size?: "small" | "tiny" | "medium" | "large" | "huge" | "gargantuan" | undefined;
    alignment?: string | undefined;
    traits?: string[] | undefined;
    rarity?: "common" | "uncommon" | "rare" | "unique" | undefined;
    hasSpells?: boolean | undefined;
}, {
    level?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    creatureType?: "aberration" | "beast" | "celestial" | "construct" | "dragon" | "elemental" | "fey" | "fiend" | "humanoid" | "ooze" | "plant" | "undead" | "animal" | "fungus" | "monitor" | undefined;
    size?: "small" | "tiny" | "medium" | "large" | "huge" | "gargantuan" | undefined;
    alignment?: string | undefined;
    traits?: string[] | undefined;
    rarity?: "common" | "uncommon" | "rare" | "unique" | undefined;
    hasSpells?: boolean | undefined;
}>;
export type PF2eFilters = z.infer<typeof PF2eFiltersSchema>;
/**
 * Generic filter schema that accepts both D&D 5e and PF2e filters
 * Used when we don't know the system yet
 */
export declare const GenericFiltersSchema: z.ZodObject<{
    challengeRating: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
    }>]>>;
    level: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
    }>]>>;
    creatureType: z.ZodOptional<z.ZodString>;
    traits: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    rarity: z.ZodOptional<z.ZodEnum<["common", "uncommon", "rare", "unique"]>>;
    size: z.ZodOptional<z.ZodEnum<["tiny", "small", "medium", "large", "huge", "gargantuan"]>>;
    alignment: z.ZodOptional<z.ZodString>;
    hasLegendaryActions: z.ZodOptional<z.ZodBoolean>;
    spellcaster: z.ZodOptional<z.ZodBoolean>;
    hasSpells: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    level?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    challengeRating?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    creatureType?: string | undefined;
    size?: "small" | "tiny" | "medium" | "large" | "huge" | "gargantuan" | undefined;
    alignment?: string | undefined;
    hasLegendaryActions?: boolean | undefined;
    spellcaster?: boolean | undefined;
    traits?: string[] | undefined;
    rarity?: "common" | "uncommon" | "rare" | "unique" | undefined;
    hasSpells?: boolean | undefined;
}, {
    level?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    challengeRating?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    creatureType?: string | undefined;
    size?: "small" | "tiny" | "medium" | "large" | "huge" | "gargantuan" | undefined;
    alignment?: string | undefined;
    hasLegendaryActions?: boolean | undefined;
    spellcaster?: boolean | undefined;
    traits?: string[] | undefined;
    rarity?: "common" | "uncommon" | "rare" | "unique" | undefined;
    hasSpells?: boolean | undefined;
}>;
export type GenericFilters = z.infer<typeof GenericFiltersSchema>;
/**
 * Get appropriate filter schema for a game system
 */
export declare function getFilterSchema(system: GameSystem): z.ZodObject<{
    challengeRating: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
    }>]>>;
    creatureType: z.ZodOptional<z.ZodEnum<["aberration", "beast", "celestial", "construct", "dragon", "elemental", "fey", "fiend", "giant", "humanoid", "monstrosity", "ooze", "plant", "undead"]>>;
    size: z.ZodOptional<z.ZodEnum<["tiny", "small", "medium", "large", "huge", "gargantuan"]>>;
    alignment: z.ZodOptional<z.ZodString>;
    hasLegendaryActions: z.ZodOptional<z.ZodBoolean>;
    spellcaster: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    challengeRating?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    creatureType?: "aberration" | "beast" | "celestial" | "construct" | "dragon" | "elemental" | "fey" | "fiend" | "giant" | "humanoid" | "monstrosity" | "ooze" | "plant" | "undead" | undefined;
    size?: "small" | "tiny" | "medium" | "large" | "huge" | "gargantuan" | undefined;
    alignment?: string | undefined;
    hasLegendaryActions?: boolean | undefined;
    spellcaster?: boolean | undefined;
}, {
    challengeRating?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    creatureType?: "aberration" | "beast" | "celestial" | "construct" | "dragon" | "elemental" | "fey" | "fiend" | "giant" | "humanoid" | "monstrosity" | "ooze" | "plant" | "undead" | undefined;
    size?: "small" | "tiny" | "medium" | "large" | "huge" | "gargantuan" | undefined;
    alignment?: string | undefined;
    hasLegendaryActions?: boolean | undefined;
    spellcaster?: boolean | undefined;
}> | z.ZodObject<{
    level: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
    }>]>>;
    creatureType: z.ZodOptional<z.ZodEnum<["aberration", "animal", "beast", "celestial", "construct", "dragon", "elemental", "fey", "fiend", "fungus", "humanoid", "monitor", "ooze", "plant", "undead"]>>;
    traits: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    rarity: z.ZodOptional<z.ZodEnum<["common", "uncommon", "rare", "unique"]>>;
    size: z.ZodOptional<z.ZodEnum<["tiny", "small", "medium", "large", "huge", "gargantuan"]>>;
    alignment: z.ZodOptional<z.ZodString>;
    hasSpells: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    level?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    creatureType?: "aberration" | "beast" | "celestial" | "construct" | "dragon" | "elemental" | "fey" | "fiend" | "humanoid" | "ooze" | "plant" | "undead" | "animal" | "fungus" | "monitor" | undefined;
    size?: "small" | "tiny" | "medium" | "large" | "huge" | "gargantuan" | undefined;
    alignment?: string | undefined;
    traits?: string[] | undefined;
    rarity?: "common" | "uncommon" | "rare" | "unique" | undefined;
    hasSpells?: boolean | undefined;
}, {
    level?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    creatureType?: "aberration" | "beast" | "celestial" | "construct" | "dragon" | "elemental" | "fey" | "fiend" | "humanoid" | "ooze" | "plant" | "undead" | "animal" | "fungus" | "monitor" | undefined;
    size?: "small" | "tiny" | "medium" | "large" | "huge" | "gargantuan" | undefined;
    alignment?: string | undefined;
    traits?: string[] | undefined;
    rarity?: "common" | "uncommon" | "rare" | "unique" | undefined;
    hasSpells?: boolean | undefined;
}> | z.ZodObject<{
    challengeRating: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
    }>]>>;
    level: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
    }>]>>;
    creatureType: z.ZodOptional<z.ZodString>;
    traits: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    rarity: z.ZodOptional<z.ZodEnum<["common", "uncommon", "rare", "unique"]>>;
    size: z.ZodOptional<z.ZodEnum<["tiny", "small", "medium", "large", "huge", "gargantuan"]>>;
    alignment: z.ZodOptional<z.ZodString>;
    hasLegendaryActions: z.ZodOptional<z.ZodBoolean>;
    spellcaster: z.ZodOptional<z.ZodBoolean>;
    hasSpells: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    level?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    challengeRating?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    creatureType?: string | undefined;
    size?: "small" | "tiny" | "medium" | "large" | "huge" | "gargantuan" | undefined;
    alignment?: string | undefined;
    hasLegendaryActions?: boolean | undefined;
    spellcaster?: boolean | undefined;
    traits?: string[] | undefined;
    rarity?: "common" | "uncommon" | "rare" | "unique" | undefined;
    hasSpells?: boolean | undefined;
}, {
    level?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    challengeRating?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    creatureType?: string | undefined;
    size?: "small" | "tiny" | "medium" | "large" | "huge" | "gargantuan" | undefined;
    alignment?: string | undefined;
    hasLegendaryActions?: boolean | undefined;
    spellcaster?: boolean | undefined;
    traits?: string[] | undefined;
    rarity?: "common" | "uncommon" | "rare" | "unique" | undefined;
    hasSpells?: boolean | undefined;
}>;
/**
 * Validate creature type for a given system
 */
export declare function isValidCreatureType(creatureType: string, system: GameSystem): boolean;
/**
 * Convert filters from one system to another (best effort)
 * Used when user provides D&D 5e filters but world is PF2e (or vice versa)
 */
export declare function convertFilters(filters: GenericFilters, fromSystem: GameSystem, toSystem: GameSystem): GenericFilters;
/**
 * Build human-readable filter description for tool responses
 */
export declare function describeFilters(filters: GenericFilters, system: GameSystem): string;
