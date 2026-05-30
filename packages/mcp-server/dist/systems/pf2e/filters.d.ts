/**
 * Pathfinder 2e Filter Schemas
 *
 * Extracted from compendium-filters.ts for modular system support.
 */
import { z } from 'zod';
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
 * Common creature sizes
 */
export declare const CreatureSizes: readonly ["tiny", "small", "medium", "large", "huge", "gargantuan"];
export type CreatureSize = (typeof CreatureSizes)[number];
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
 * Check if a creature matches PF2e filters
 */
export declare function matchesPF2eFilters(creature: any, filters: PF2eFilters): boolean;
/**
 * Generate human-readable description of PF2e filters
 */
export declare function describePF2eFilters(filters: PF2eFilters): string;
/**
 * Validate creature type
 */
export declare function isValidPF2eCreatureType(creatureType: string): boolean;
