/**
 * Cosmere RPG Filter Schema
 *
 * Filters for `search-compendium` and `list-creatures-by-criteria`.
 *
 * Cosmere RPG uses tiers (1-4) and adversary roles (minion/rival/boss/…)
 * rather than CR or level, so the filter surface is intentionally distinct
 * from the dnd5e/pf2e schemas.
 */
import { z } from 'zod';
import type { CosmereRpgCreatureIndex } from '../types.js';
/**
 * Adversary role values seen in the official Stormlight compendia.
 * Treated as a free-form string downstream (system may add roles).
 */
export declare const COSMERE_ROLES: readonly ["minion", "rival", "boss"];
export type CosmereRole = (typeof COSMERE_ROLES)[number];
/**
 * Common cosmere creature types observed in compendium content.
 * Matched against `system.type.id` (lowercased).
 */
export declare const COSMERE_CREATURE_TYPES: readonly ["humanoid", "animal", "spren", "parshendi", "singer", "voidbringer", "fabrial", "unknown"];
export type CosmereCreatureType = (typeof COSMERE_CREATURE_TYPES)[number];
export declare const COSMERE_SIZES: readonly ["tiny", "small", "medium", "large", "huge", "gargantuan"];
export declare const CosmereRpgFiltersSchema: z.ZodObject<{
    /** Tier filter — exact value or {min, max}. */
    tier: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
    }>]>>;
    /** Adversary role (minion/rival/boss/…). Case-insensitive match. */
    role: z.ZodOptional<z.ZodString>;
    /** Creature type — matches `system.type.id`. Case-insensitive. */
    creatureType: z.ZodOptional<z.ZodString>;
    /** Size category. */
    size: z.ZodOptional<z.ZodEnum<["tiny", "small", "medium", "large", "huge", "gargantuan"]>>;
    /** Filter for Surge/Investiture-using adversaries. */
    hasInvestiture: z.ZodOptional<z.ZodBoolean>;
    /** Health max range. */
    health: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
    }>]>>;
    /** Minimum defense thresholds — pass any subset. */
    defensesMin: z.ZodOptional<z.ZodObject<{
        phy: z.ZodOptional<z.ZodNumber>;
        cog: z.ZodOptional<z.ZodNumber>;
        spi: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        phy?: number | undefined;
        cog?: number | undefined;
        spi?: number | undefined;
    }, {
        phy?: number | undefined;
        cog?: number | undefined;
        spi?: number | undefined;
    }>>;
    /** Minimum deflect rating. */
    deflectMin: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    creatureType?: string | undefined;
    size?: "small" | "tiny" | "medium" | "large" | "huge" | "gargantuan" | undefined;
    health?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    tier?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    role?: string | undefined;
    hasInvestiture?: boolean | undefined;
    defensesMin?: {
        phy?: number | undefined;
        cog?: number | undefined;
        spi?: number | undefined;
    } | undefined;
    deflectMin?: number | undefined;
}, {
    creatureType?: string | undefined;
    size?: "small" | "tiny" | "medium" | "large" | "huge" | "gargantuan" | undefined;
    health?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    tier?: number | {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    role?: string | undefined;
    hasInvestiture?: boolean | undefined;
    defensesMin?: {
        phy?: number | undefined;
        cog?: number | undefined;
        spi?: number | undefined;
    } | undefined;
    deflectMin?: number | undefined;
}>;
export type CosmereRpgFilters = z.infer<typeof CosmereRpgFiltersSchema>;
export declare function matchesCosmereRpgFilters(creature: CosmereRpgCreatureIndex, filters: CosmereRpgFilters): boolean;
export declare function describeCosmereRpgFilters(filters: CosmereRpgFilters): string;
