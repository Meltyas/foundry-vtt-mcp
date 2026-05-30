/**
 * Pathfinder 2e System Adapter
 *
 * Implements SystemAdapter interface for Pathfinder 2nd Edition support.
 * Handles creature indexing, filtering, formatting, and data extraction.
 */
import type { SystemAdapter, SystemMetadata, SystemCreatureIndex } from '../types.js';
/**
 * Pathfinder 2e system adapter
 */
export declare class PF2eAdapter implements SystemAdapter {
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
        level: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodObject<{
            min: import("zod").ZodOptional<import("zod").ZodNumber>;
            max: import("zod").ZodOptional<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
        }>]>>;
        creatureType: import("zod").ZodOptional<import("zod").ZodEnum<["aberration", "animal", "beast", "celestial", "construct", "dragon", "elemental", "fey", "fiend", "fungus", "humanoid", "monitor", "ooze", "plant", "undead"]>>;
        traits: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
        rarity: import("zod").ZodOptional<import("zod").ZodEnum<["common", "uncommon", "rare", "unique"]>>;
        size: import("zod").ZodOptional<import("zod").ZodEnum<["tiny", "small", "medium", "large", "huge", "gargantuan"]>>;
        alignment: import("zod").ZodOptional<import("zod").ZodString>;
        hasSpells: import("zod").ZodOptional<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
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
