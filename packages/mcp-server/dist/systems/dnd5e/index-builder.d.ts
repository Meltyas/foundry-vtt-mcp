/**
 * D&D 5e Index Builder
 *
 * Builds enhanced creature index from Foundry compendiums.
 * This code runs in Foundry's browser context, not Node.js.
 *
 * Extracted from data-access.ts for modular system support.
 */
import type { IndexBuilder, DnD5eCreatureIndex } from '../types.js';
/**
 * D&D 5e implementation of IndexBuilder
 */
export declare class DnD5eIndexBuilder implements IndexBuilder {
    private moduleId;
    constructor(moduleId?: string);
    getSystemId(): "dnd5e";
    /**
     * Build enhanced creature index from compendium packs
     */
    buildIndex(packs: any[], force?: boolean): Promise<DnD5eCreatureIndex[]>;
    /**
     * Extract creature data from a single compendium pack
     */
    extractDataFromPack(pack: any): Promise<{
        creatures: DnD5eCreatureIndex[];
        errors: number;
    }>;
    /**
     * Extract D&D 5e creature data from a single document
     */
    extractCreatureData(doc: any, pack: any): {
        creature: DnD5eCreatureIndex;
        errors: number;
    } | null;
}
