/**
 * Pathfinder 2e Index Builder
 *
 * Builds enhanced creature index from Foundry compendiums.
 * This code runs in Foundry's browser context, not Node.js.
 *
 * Extracted from data-access.ts for modular system support.
 */
import type { IndexBuilder, PF2eCreatureIndex } from '../types.js';
/**
 * PF2e implementation of IndexBuilder
 */
export declare class PF2eIndexBuilder implements IndexBuilder {
    private moduleId;
    constructor(moduleId?: string);
    getSystemId(): "pf2e";
    /**
     * Build enhanced creature index from compendium packs
     */
    buildIndex(packs: any[], force?: boolean): Promise<PF2eCreatureIndex[]>;
    /**
     * Extract creature data from a single compendium pack
     */
    extractDataFromPack(pack: any): Promise<{
        creatures: PF2eCreatureIndex[];
        errors: number;
    }>;
    /**
     * Extract Pathfinder 2e creature data from a single document
     */
    extractCreatureData(doc: any, pack: any): {
        creature: PF2eCreatureIndex;
        errors: number;
    } | null;
}
