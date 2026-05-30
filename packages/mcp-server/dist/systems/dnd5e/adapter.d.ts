/**
 * D&D 5e System Adapter
 *
 * Implements SystemAdapter interface for D&D 5th Edition support.
 * Handles creature indexing, filtering, formatting, and data extraction.
 */
import type { SystemAdapter, SystemMetadata, SystemCreatureIndex } from '../types.js';
/**
 * D&D 5e system adapter
 */
export declare class DnD5eAdapter implements SystemAdapter {
    getMetadata(): SystemMetadata;
    canHandle(systemId: string): boolean;
    /**
     * Extract creature data from Foundry document for indexing
     * This is called by the index builder in Foundry's browser context
     */
    extractCreatureData(doc: any, pack: any): {
        creature: SystemCreatureIndex;
        errors: number;
    } | null;
    getFilterSchema(): import("zod").ZodObject<{
        challengeRating: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodObject<{
            min: import("zod").ZodOptional<import("zod").ZodNumber>;
            max: import("zod").ZodOptional<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
        }>]>>;
        creatureType: import("zod").ZodOptional<import("zod").ZodEnum<["aberration", "beast", "celestial", "construct", "dragon", "elemental", "fey", "fiend", "giant", "humanoid", "monstrosity", "ooze", "plant", "undead"]>>;
        size: import("zod").ZodOptional<import("zod").ZodEnum<["tiny", "small", "medium", "large", "huge", "gargantuan"]>>;
        alignment: import("zod").ZodOptional<import("zod").ZodString>;
        hasLegendaryActions: import("zod").ZodOptional<import("zod").ZodBoolean>;
        spellcaster: import("zod").ZodOptional<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
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
    matchesFilters(creature: SystemCreatureIndex, filters: Record<string, any>): boolean;
    getDataPaths(): Record<string, string | null>;
    formatCreatureForList(creature: SystemCreatureIndex): any;
    formatCreatureForDetails(creature: SystemCreatureIndex): any;
    describeFilters(filters: Record<string, any>): string;
    getPowerLevel(creature: SystemCreatureIndex): number | undefined;
    /**
     * Extract character statistics from actor data
     */
    extractCharacterStats(actorData: any): any;
}
