/**
 * Cosmere RPG Schema Constants
 *
 * Field paths and key sets for the Cosmere RPG Foundry system.
 * Schema reference: https://github.com/the-metalworks/cosmere-rpg
 *
 * Notable shape characteristics:
 *   - `system.level` (number, top-level for character)
 *   - `system.tier` (number)
 *   - `system.attributes.<key>.{value, bonus}` — keys: str/spd/int/wil/awa/pre
 *   - `system.defenses.<key>` — DerivedValueField; read `.value` for final
 *   - `system.resources.<key>.{value, max, bonus}` — keys: hea/foc/inv;
 *      `.max` is itself a DerivedValueField (read `.value`)
 *   - `system.skills.<key>.{rank, mod}` — `.mod` is a DerivedValueField
 *   - `system.deflect` — DerivedValueField; read `.value`
 */
/** Attribute keys as Foundry stores them. */
export declare const COSMERE_ATTR_KEYS: readonly ["str", "spd", "int", "wil", "awa", "pre"];
export type CosmereAttrKey = (typeof COSMERE_ATTR_KEYS)[number];
/** Defense keys (attribute groups). */
export declare const COSMERE_DEFENSE_KEYS: readonly ["phy", "cog", "spi"];
export type CosmereDefenseKey = (typeof COSMERE_DEFENSE_KEYS)[number];
/** Resource keys mapped to friendly names used in the get-character response. */
export declare const COSMERE_RESOURCES: Record<string, 'health' | 'focus' | 'investiture'>;
/**
 * Normalise a Cosmere DerivedValueField. The shape is:
 *   { value: T, derived: T, override?: T, useOverride: boolean, base?, bonus? }
 *
 * Resolution order:
 *   1. If `useOverride` is true and `override` is a number, return `override`.
 *      (The actor sheet honours this; e.g. Investiture max where the system
 *      can't auto-derive a value and the GM/player has typed one in.)
 *   2. Otherwise prefer `value` (the final post-bonus result on most fields).
 *   3. Fall back to `derived` (raw computed pre-bonus).
 */
export declare function readDerived(field: any): number | undefined;
