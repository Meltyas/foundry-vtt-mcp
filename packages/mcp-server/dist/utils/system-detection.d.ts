/**
 * Game System Detection Utilities
 *
 * Detects the Foundry VTT game system (D&D 5e, Pathfinder 2e, etc.) and provides
 * system-specific data path mappings for cross-system compatibility.
 */
import { FoundryClient } from '../foundry-client.js';
import { Logger } from '../logger.js';
/**
 * Supported game systems
 */
export type GameSystem = 'dnd5e' | 'pf2e' | 'cosmere-rpg' | 'other';
/**
 * Detect the active Foundry game system
 * Results are cached to avoid repeated queries
 */
export declare function detectGameSystem(foundryClient: FoundryClient, logger?: Logger): Promise<GameSystem>;
/**
 * Get the raw system ID string (e.g., "dnd5e", "pf2e", "coc7")
 */
export declare function getCachedSystemId(): string | null;
/**
 * Clear cached system detection (useful for testing or world switches)
 */
export declare function clearSystemCache(): void;
/**
 * System-specific data paths for creature/actor stats
 */
export declare const SystemPaths: {
    readonly dnd5e: {
        readonly challengeRating: "system.details.cr";
        readonly creatureType: "system.details.type.value";
        readonly size: "system.traits.size";
        readonly alignment: "system.details.alignment";
        readonly level: "system.details.level.value";
        readonly hitPoints: "system.attributes.hp";
        readonly armorClass: "system.attributes.ac.value";
        readonly abilities: "system.abilities";
        readonly skills: "system.skills";
        readonly spells: "system.spells";
        readonly legendaryActions: "system.resources.legact";
        readonly legendaryResistances: "system.resources.legres";
    };
    readonly pf2e: {
        readonly level: "system.details.level.value";
        readonly creatureType: "system.traits.value";
        readonly size: "system.traits.size.value";
        readonly alignment: "system.details.alignment.value";
        readonly rarity: "system.traits.rarity";
        readonly traits: "system.traits.value";
        readonly hitPoints: "system.attributes.hp";
        readonly armorClass: "system.attributes.ac.value";
        readonly abilities: "system.abilities";
        readonly skills: "system.skills";
        readonly perception: "system.perception";
        readonly saves: "system.saves";
        readonly challengeRating: null;
        readonly legendaryActions: null;
    };
};
/**
 * Get system-specific data paths based on detected system.
 *
 * Returns null for systems without registered paths (cosmere-rpg, dsa5, other).
 * Callers must branch on `system` for those — falling back to dnd5e paths
 * silently produces wrong values when called against a non-dnd5e actor.
 */
export declare function getSystemPaths(system: GameSystem): {
    readonly challengeRating: "system.details.cr";
    readonly creatureType: "system.details.type.value";
    readonly size: "system.traits.size";
    readonly alignment: "system.details.alignment";
    readonly level: "system.details.level.value";
    readonly hitPoints: "system.attributes.hp";
    readonly armorClass: "system.attributes.ac.value";
    readonly abilities: "system.abilities";
    readonly skills: "system.skills";
    readonly spells: "system.spells";
    readonly legendaryActions: "system.resources.legact";
    readonly legendaryResistances: "system.resources.legres";
} | {
    readonly level: "system.details.level.value";
    readonly creatureType: "system.traits.value";
    readonly size: "system.traits.size.value";
    readonly alignment: "system.details.alignment.value";
    readonly rarity: "system.traits.rarity";
    readonly traits: "system.traits.value";
    readonly hitPoints: "system.attributes.hp";
    readonly armorClass: "system.attributes.ac.value";
    readonly abilities: "system.abilities";
    readonly skills: "system.skills";
    readonly perception: "system.perception";
    readonly saves: "system.saves";
    readonly challengeRating: null;
    readonly legendaryActions: null;
} | null;
/**
 * Extract a value from system data using a path string
 * Handles both simple and nested paths (e.g., "system.details.cr")
 */
export declare function extractSystemValue(data: any, path: string | null): any;
/**
 * Get creature level/CR based on system
 * Returns a normalized level value for D&D 5e, PF2e, and Cosmere RPG.
 */
export declare function getCreatureLevel(actorData: any, system: GameSystem): number | undefined;
/**
 * Get creature type/traits based on system
 */
export declare function getCreatureType(actorData: any, system: GameSystem): string | string[] | undefined;
/**
 * Check if creature has spellcasting based on system
 */
export declare function hasSpellcasting(actorData: any, system: GameSystem): boolean;
/**
 * Format system-specific error messages
 */
export declare function formatSystemError(system: GameSystem, systemId: string | null): string;
