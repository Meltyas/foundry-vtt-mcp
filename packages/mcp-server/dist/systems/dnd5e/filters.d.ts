/**
 * D&D 5e Filter Schemas
 *
 * Extracted from compendium-filters.ts for modular system support.
 */
import { z } from 'zod';
/**
 * D&D 5e creature types
 */
export declare const DnD5eCreatureTypes: readonly ["aberration", "beast", "celestial", "construct", "dragon", "elemental", "fey", "fiend", "giant", "humanoid", "monstrosity", "ooze", "plant", "undead"];
export type DnD5eCreatureType = (typeof DnD5eCreatureTypes)[number];
/**
 * Common creature sizes
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
 * Check if a creature matches D&D 5e filters
 */
export declare function matchesDnD5eFilters(creature: any, filters: DnD5eFilters): boolean;
/**
 * Generate human-readable description of D&D 5e filters
 */
export declare function describeDnD5eFilters(filters: DnD5eFilters): string;
/**
 * Validate creature type
 */
export declare function isValidDnD5eCreatureType(creatureType: string): boolean;
