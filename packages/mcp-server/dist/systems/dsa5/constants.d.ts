/**
 * DSA5 Constants
 *
 * Central definitions for DSA5 system including experience levels,
 * field paths, and type mappings.
 */
/**
 * Erfahrungsgrad-Definitionen (DSA5 "Levels")
 * Quelle: https://dsa.ulisses-regelwiki.de/Heldenerschaffung.html
 *
 * WICHTIG: Level 1-7, nicht 0-6!
 * DSA5 startet bei Level 1 (Unerfahren), genau wie D&D5e bei Level 1
 */
export declare const EXPERIENCE_LEVELS: readonly [{
    readonly name: "Unerfahren";
    readonly nameEn: "Inexperienced";
    readonly min: 0;
    readonly max: 900;
    readonly level: 1;
}, {
    readonly name: "Durchschnittlich";
    readonly nameEn: "Average";
    readonly min: 901;
    readonly max: 1800;
    readonly level: 2;
}, {
    readonly name: "Erfahren";
    readonly nameEn: "Experienced";
    readonly min: 1801;
    readonly max: 2700;
    readonly level: 3;
}, {
    readonly name: "Kompetent";
    readonly nameEn: "Competent";
    readonly min: 2701;
    readonly max: 3600;
    readonly level: 4;
}, {
    readonly name: "Meisterlich";
    readonly nameEn: "Masterful";
    readonly min: 3601;
    readonly max: 4500;
    readonly level: 5;
}, {
    readonly name: "Brillant";
    readonly nameEn: "Brilliant";
    readonly min: 4501;
    readonly max: 5400;
    readonly level: 6;
}, {
    readonly name: "Legendär";
    readonly nameEn: "Legendary";
    readonly min: 5401;
    readonly max: number;
    readonly level: 7;
}];
/**
 * Erfahrungsgrad-Typ
 */
export type DSA5ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];
/**
 * Konvertiert Abenteuerpunkte zu Erfahrungsgrad
 * @param totalAP - Gesamt-Abenteuerpunkte
 * @returns Erfahrungsgrad-Info (Name, Level, AP-Bereich)
 */
export declare function getExperienceLevel(totalAP: number): DSA5ExperienceLevel;
/**
 * Konvertiert numerischen Level zu Erfahrungsgrad
 * @param level - Level (1-7)
 * @returns Erfahrungsgrad-Info
 */
export declare function getExperienceLevelByNumber(level: number): DSA5ExperienceLevel;
/**
 * Erfahrungsgrad-Namen (Deutsch)
 */
export declare const EXPERIENCE_LEVEL_NAMES_DE: ("Unerfahren" | "Durchschnittlich" | "Erfahren" | "Kompetent" | "Meisterlich" | "Brillant" | "Legendär")[];
/**
 * Erfahrungsgrad-Namen (Englisch)
 */
export declare const EXPERIENCE_LEVEL_NAMES_EN: ("Inexperienced" | "Average" | "Experienced" | "Competent" | "Masterful" | "Brilliant" | "Legendary")[];
/**
 * DSA5 Eigenschaften (Attributes) - German abbreviations to full names
 */
export declare const EIGENSCHAFT_NAMES: Record<string, {
    short: string;
    german: string;
    english: string;
}>;
/**
 * Size categories - German to English
 */
export declare const SIZE_MAP_DE_TO_EN: Record<string, string>;
/**
 * Size categories - English to German
 */
export declare const SIZE_MAP_EN_TO_DE: Record<string, string>;
/**
 * Common DSA5 field paths for system data access
 * Based on template.json reverse engineering from:
 * https://github.com/Plushtoast/dsa5-foundryVTT/blob/master/template.json
 */
export declare const FIELD_PATHS: {
    readonly CHARACTERISTICS: "system.characteristics";
    readonly CHAR_MU: "system.characteristics.mu.value";
    readonly CHAR_KL: "system.characteristics.kl.value";
    readonly CHAR_IN: "system.characteristics.in.value";
    readonly CHAR_CH: "system.characteristics.ch.value";
    readonly CHAR_FF: "system.characteristics.ff.value";
    readonly CHAR_GE: "system.characteristics.ge.value";
    readonly CHAR_KO: "system.characteristics.ko.value";
    readonly CHAR_KK: "system.characteristics.kk.value";
    readonly STATUS_WOUNDS: "system.status.wounds";
    readonly STATUS_WOUNDS_CURRENT: "system.status.wounds.current";
    readonly STATUS_WOUNDS_MAX: "system.status.wounds.max";
    readonly STATUS_ASTRAL: "system.status.astralenergy";
    readonly STATUS_KARMA: "system.status.karmaenergy";
    readonly STATUS_SPEED: "system.status.speed";
    readonly STATUS_INITIATIVE: "system.status.initiative";
    readonly STATUS_DODGE: "system.status.dodge";
    readonly STATUS_ARMOR: "system.status.armour";
    readonly DETAILS_SPECIES: "system.details.species.value";
    readonly DETAILS_CULTURE: "system.details.culture.value";
    readonly DETAILS_CAREER: "system.details.career.value";
    readonly DETAILS_EXPERIENCE: "system.details.experience";
    readonly DETAILS_EXPERIENCE_TOTAL: "system.details.experience.total";
    readonly DETAILS_EXPERIENCE_SPENT: "system.details.experience.spent";
    readonly STATUS_SIZE: "system.status.size.value";
    readonly TRADITION: "system.tradition";
    readonly TRADITION_MAGICAL: "system.tradition.magical";
    readonly TRADITION_CLERICAL: "system.tradition.clerical";
};
/**
 * Item types in DSA5
 */
export declare const ITEM_TYPES: {
    readonly SKILL: "skill";
    readonly COMBAT_SKILL: "combatskill";
    readonly SPELL: "spell";
    readonly LITURGY: "liturgy";
    readonly CEREMONY: "ceremony";
    readonly RITUAL: "ritual";
    readonly MELEE_WEAPON: "meleeweapon";
    readonly RANGE_WEAPON: "rangeweapon";
    readonly ARMOR: "armor";
    readonly ADVANTAGE: "advantage";
    readonly DISADVANTAGE: "disadvantage";
    readonly SPECIAL_ABILITY: "specialability";
};
/**
 * Actor types in DSA5
 */
export declare const ACTOR_TYPES: {
    readonly CHARACTER: "character";
    readonly NPC: "npc";
    readonly CREATURE: "creature";
};
/**
 * Resource types (for status values)
 */
export declare const RESOURCE_TYPES: {
    readonly WOUNDS: "wounds";
    readonly ASTRAL_ENERGY: "astralenergy";
    readonly KARMA_ENERGY: "karmaenergy";
    readonly SPEED: "speed";
    readonly INITIATIVE: "initiative";
    readonly ARMOR: "armour";
    readonly DODGE: "dodge";
    readonly SOUL_POWER: "soulpower";
    readonly TOUGHNESS: "toughness";
};
/**
 * Skill group translations (German to English)
 */
export declare const SKILL_GROUPS: Record<string, string>;
