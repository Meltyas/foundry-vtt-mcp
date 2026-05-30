/**
 * DSA5 System Adapter
 *
 * Implements SystemAdapter interface for DSA5 (Das Schwarze Auge 5) support.
 * Handles creature indexing, filtering, formatting, and data extraction.
 */
import type { SystemAdapter, SystemMetadata, SystemCreatureIndex } from '../types.js';
/**
 * DSA5 system adapter
 */
export declare class DSA5Adapter implements SystemAdapter {
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
        species: import("zod").ZodOptional<import("zod").ZodEnum<["mensch", "elf", "halbelf", "zwerg", "goblin", "ork", "halborc", "achaz", "troll", "oger", "drache", "dämon", "elementar", "untot", "tier", "chimäre"]>>;
        culture: import("zod").ZodOptional<import("zod").ZodString>;
        size: import("zod").ZodOptional<import("zod").ZodEnum<["tiny", "small", "medium", "large", "huge", "gargantuan"]>>;
        hasSpells: import("zod").ZodOptional<import("zod").ZodBoolean>;
        experiencePoints: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodObject<{
            min: import("zod").ZodOptional<import("zod").ZodNumber>;
            max: import("zod").ZodOptional<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
        }>]>>;
    }, "strip", import("zod").ZodTypeAny, {
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
