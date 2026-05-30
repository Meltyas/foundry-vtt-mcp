/**
 * DSA5 Index Builder
 *
 * Builds enhanced creature index from Foundry compendiums.
 * This code runs in Foundry's browser context, not Node.js.
 *
 * Ported from foundry-module/src/tools/dsa5/creature-index.ts
 * Following v0.6.0 Registry Pattern.
 */
import type { IndexBuilder, DSA5CreatureIndex } from '../types.js';
/**
 * Result of extractCreatureData operation
 */
interface DSA5ExtractionResult {
    creature: DSA5CreatureIndex;
    errors: number;
}
/**
 * DSA5 implementation of IndexBuilder
 */
export declare class DSA5IndexBuilder implements IndexBuilder {
    private moduleId;
    constructor(moduleId?: string);
    getSystemId(): "dsa5";
    /**
     * Build enhanced creature index from compendium packs
     */
    buildIndex(packs: any[], force?: boolean): Promise<DSA5CreatureIndex[]>;
    /**
     * Extract creature data from a single compendium pack
     */
    extractDataFromPack(pack: any): Promise<{
        creatures: DSA5CreatureIndex[];
        errors: number;
    }>;
    /**
     * Extract DSA5 creature data from a single Foundry document
     *
     * @param doc - Foundry actor document
     * @param pack - Source compendium pack
     * @returns Extracted creature data or null if failed
     */
    extractCreatureData(doc: any, pack: any): DSA5ExtractionResult | null;
}
export {};
