/**
 * Cosmere RPG System Adapter
 *
 * Implements SystemAdapter for the Cosmere RPG Foundry system
 * (https://github.com/the-metalworks/cosmere-rpg).
 *
 * Scope of this adapter:
 *   - extractBasicInfo: level, tier, health/focus/investiture (current+max+bonus), deflect
 *   - extractCharacterStats: attributes (with pre→prs remap), defenses, skills (rank+mod)
 *   - Filters: tier / role / creatureType / size / hasInvestiture / health
 *     / defensesMin / deflectMin (see ./filters.ts)
 *
 * Index extraction lives in `./index-builder.ts` (browser-context).
 * `extractCreatureData` here throws to match the dnd5e/pf2e/dsa5 convention.
 */
import type { SystemAdapter, SystemMetadata, SystemCreatureIndex } from '../types.js';
export declare class CosmereRpgAdapter implements SystemAdapter {
    getMetadata(): SystemMetadata;
    canHandle(systemId: string): boolean;
    extractCreatureData(_doc: any, _pack: any): {
        creature: SystemCreatureIndex;
        errors: number;
    } | null;
    getFilterSchema(): import("zod").ZodObject<{
        tier: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodObject<{
            min: import("zod").ZodOptional<import("zod").ZodNumber>;
            max: import("zod").ZodOptional<import("zod").ZodNumber>;
        }, "strict", import("zod").ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
        }>]>>;
        role: import("zod").ZodOptional<import("zod").ZodString>;
        creatureType: import("zod").ZodOptional<import("zod").ZodString>;
        size: import("zod").ZodOptional<import("zod").ZodEnum<["tiny", "small", "medium", "large", "huge", "gargantuan"]>>;
        hasInvestiture: import("zod").ZodOptional<import("zod").ZodBoolean>;
        health: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodObject<{
            min: import("zod").ZodOptional<import("zod").ZodNumber>;
            max: import("zod").ZodOptional<import("zod").ZodNumber>;
        }, "strict", import("zod").ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
        }>]>>;
        defensesMin: import("zod").ZodOptional<import("zod").ZodObject<{
            phy: import("zod").ZodOptional<import("zod").ZodNumber>;
            cog: import("zod").ZodOptional<import("zod").ZodNumber>;
            spi: import("zod").ZodOptional<import("zod").ZodNumber>;
        }, "strict", import("zod").ZodTypeAny, {
            phy?: number | undefined;
            cog?: number | undefined;
            spi?: number | undefined;
        }, {
            phy?: number | undefined;
            cog?: number | undefined;
            spi?: number | undefined;
        }>>;
        deflectMin: import("zod").ZodOptional<import("zod").ZodNumber>;
    }, "strict", import("zod").ZodTypeAny, {
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
    matchesFilters(creature: SystemCreatureIndex, filters: Record<string, any>): boolean;
    getDataPaths(): Record<string, string | null>;
    formatCreatureForList(creature: SystemCreatureIndex): any;
    formatCreatureForDetails(creature: SystemCreatureIndex): any;
    describeFilters(filters: Record<string, any>): string;
    getPowerLevel(creature: SystemCreatureIndex): number | undefined;
    /**
     * Extract Cosmere-specific basic info: level, tier, resource maxes,
     * deflect. Returned object is merged into the get-character response's
     * `basicInfo` block.
     */
    extractBasicInfo(actorData: any): any;
    /**
     * Extract Cosmere-specific stats: attributes (with pre→prs remap),
     * defenses (final values), skills (rank + mod).
     */
    extractCharacterStats(actorData: any): any;
}
