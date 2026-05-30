/**
 * Daggerheart System Adapter
 *
 * Implements SystemAdapter for the Daggerheart RPG Foundry system (v2.x).
 *
 * Supported features:
 *   - Adversary/creature indexing (tier, difficulty, type)
 *   - Character stats (attributes, HP, stress, hope, evasion, armor score)
 *   - Item type validation (11 item types)
 *   - Basic filters for adversary search
 */
import { z } from 'zod';
import type { SystemAdapter, SystemMetadata, SystemCreatureIndex } from '../types.js';
export declare const DaggerheartFiltersSchema: z.ZodObject<{
    tier: z.ZodOptional<z.ZodNumber>;
    difficulty: z.ZodOptional<z.ZodNumber>;
    adversaryType: z.ZodOptional<z.ZodString>;
    environment: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    tier?: number | undefined;
    difficulty?: number | undefined;
    environment?: string | undefined;
    adversaryType?: string | undefined;
}, {
    tier?: number | undefined;
    difficulty?: number | undefined;
    environment?: string | undefined;
    adversaryType?: string | undefined;
}>;
export type DaggerheartFilters = z.infer<typeof DaggerheartFiltersSchema>;
export declare class DaggerheartAdapter implements SystemAdapter {
    getMetadata(): SystemMetadata;
    canHandle(systemId: string): boolean;
    extractCreatureData(doc: any, pack: any): {
        creature: SystemCreatureIndex;
        errors: number;
    } | null;
    getFilterSchema(): z.ZodObject<{
        tier: z.ZodOptional<z.ZodNumber>;
        difficulty: z.ZodOptional<z.ZodNumber>;
        adversaryType: z.ZodOptional<z.ZodString>;
        environment: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        tier?: number | undefined;
        difficulty?: number | undefined;
        environment?: string | undefined;
        adversaryType?: string | undefined;
    }, {
        tier?: number | undefined;
        difficulty?: number | undefined;
        environment?: string | undefined;
        adversaryType?: string | undefined;
    }>;
    matchesFilters(creature: SystemCreatureIndex, filters: Record<string, any>): boolean;
    getDataPaths(): Record<string, string | null>;
    formatCreatureForList(creature: SystemCreatureIndex): any;
    formatCreatureForDetails(creature: SystemCreatureIndex): any;
    describeFilters(filters: Record<string, any>): string;
    getPowerLevel(creature: SystemCreatureIndex): number | undefined;
    extractCharacterStats(actorData: any): any;
    extractBasicInfo(actorData: any): any;
}
