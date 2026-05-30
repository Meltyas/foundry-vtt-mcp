/**
 * Cosmere RPG Index Builder
 *
 * Builds the enhanced creature index from Foundry compendium packs.
 *
 * Runs in Foundry's browser context (foundry-module side); does NOT execute
 * on the Node MCP server. Mirrors the dnd5e/pf2e/dsa5 IndexBuilder pattern.
 *
 * Schema reference: github.com/the-metalworks/cosmere-rpg
 *   - Adversary actors expose `system.tier`, `system.role`, defenses,
 *     resources, etc. — see ../filters.ts for the indexed field list.
 *
 * Note: today the foundry-module's data-access.ts contains a parallel
 * inline extractor that's the actual runtime path. This file mirrors that
 * behavior so the two paths produce equivalent shapes if the registry is
 * ever wired up — same tech-debt situation as dnd5e/pf2e.
 */
import type { IndexBuilder, CosmereRpgCreatureIndex } from '../types.js';
interface CosmereExtractionResult {
    creature: CosmereRpgCreatureIndex;
    errors: number;
}
export declare class CosmereRpgIndexBuilder implements IndexBuilder {
    private moduleId;
    constructor(moduleId?: string);
    getSystemId(): "cosmere-rpg";
    buildIndex(packs: any[], _force?: boolean): Promise<CosmereRpgCreatureIndex[]>;
    extractDataFromPack(pack: any): Promise<{
        creatures: CosmereRpgCreatureIndex[];
        errors: number;
    }>;
    /**
     * Extract a single Cosmere RPG creature.
     *
     * Reads the live (post-derive) `doc.system` block. DerivedValueField
     * fields (resources.*.max, defenses.*, deflect, movement.*.rate) are
     * resolved via `readDerived`, which honours `useOverride`.
     *
     * Defaults (tier=0, role='unknown', etc.) match the browser-side extractor
     * in foundry-module's data-access.ts so both paths produce equivalent
     * shapes. "0" / "unknown" mean "field not set on the actor"; consumers
     * filtering by tier/role typically use ranges that exclude these.
     */
    extractCreatureData(doc: any, pack: any): CosmereExtractionResult | null;
}
export {};
