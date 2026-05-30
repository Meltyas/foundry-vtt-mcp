/**
 * DSA5 Filter Schemas
 *
 * Filter definitions for Das Schwarze Auge 5 (DSA5) system.
 * Based on D&D5e filter pattern from v0.6.0 Registry Pattern.
 */
import { z } from 'zod';
/**
 * DSA5 Species (Spezies/Rassen)
 * Common species from DSA5 Grundregelwerk
 */
export declare const DSA5Species: readonly ["mensch", "elf", "halbelf", "zwerg", "goblin", "ork", "halborc", "achaz", "troll", "oger", "drache", "dämon", "elementar", "untot", "tier", "chimäre"];
export type DSA5SpeciesType = (typeof DSA5Species)[number];
/**
 * Common creature sizes (shared with D&D5e)
 */
export declare const CreatureSizes: readonly ["tiny", "small", "medium", "large", "huge", "gargantuan"];
export type CreatureSize = (typeof CreatureSizes)[number];
/**
 * Experience levels (Erfahrungsgrade) 1-7
 * Maps to AP ranges defined in DSA5_EXPERIENCE_LEVELS.md
 */
export declare const ExperienceLevels: readonly [1, 2, 3, 4, 5, 6, 7];
export type ExperienceLevel = (typeof ExperienceLevels)[number];
/**
 * DSA5 filter schema
 */
export declare const DSA5FiltersSchema: z.ZodObject<{
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
    species: z.ZodOptional<z.ZodEnum<["mensch", "elf", "halbelf", "zwerg", "goblin", "ork", "halborc", "achaz", "troll", "oger", "drache", "dämon", "elementar", "untot", "tier", "chimäre"]>>;
    culture: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodEnum<["tiny", "small", "medium", "large", "huge", "gargantuan"]>>;
    hasSpells: z.ZodOptional<z.ZodBoolean>;
    experiencePoints: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
    }>]>>;
}, "strip", z.ZodTypeAny, {
    level?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    size?: "small" | "tiny" | "medium" | "large" | "huge" | "gargantuan" | undefined;
    hasSpells?: boolean | undefined;
    species?: "tier" | "mensch" | "elf" | "halbelf" | "zwerg" | "goblin" | "ork" | "halborc" | "achaz" | "troll" | "oger" | "drache" | "dämon" | "elementar" | "untot" | "chimäre" | undefined;
    culture?: string | undefined;
    experiencePoints?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
}, {
    level?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    size?: "small" | "tiny" | "medium" | "large" | "huge" | "gargantuan" | undefined;
    hasSpells?: boolean | undefined;
    species?: "tier" | "mensch" | "elf" | "halbelf" | "zwerg" | "goblin" | "ork" | "halborc" | "achaz" | "troll" | "oger" | "drache" | "dämon" | "elementar" | "untot" | "chimäre" | undefined;
    culture?: string | undefined;
    experiencePoints?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
}>;
export type DSA5Filters = z.infer<typeof DSA5FiltersSchema>;
/**
 * Check if a creature matches DSA5 filters
 */
export declare function matchesDSA5Filters(creature: any, filters: DSA5Filters): boolean;
/**
 * Generate human-readable description of DSA5 filters
 */
export declare function describeDSA5Filters(filters: DSA5Filters): string;
/**
 * Validate DSA5 species type
 */
export declare function isValidDSA5Species(species: string): boolean;
/**
 * Validate experience level
 */
export declare function isValidExperienceLevel(level: number): boolean;
