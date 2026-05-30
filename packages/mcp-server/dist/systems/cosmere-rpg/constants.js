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
export const COSMERE_ATTR_KEYS = ['str', 'spd', 'int', 'wil', 'awa', 'pre'];
/** Defense keys (attribute groups). */
export const COSMERE_DEFENSE_KEYS = ['phy', 'cog', 'spi'];
/** Resource keys mapped to friendly names used in the get-character response. */
export const COSMERE_RESOURCES = {
    hea: 'health',
    foc: 'focus',
    inv: 'investiture',
};
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
export function readDerived(field) {
    if (field == null)
        return undefined;
    if (typeof field === 'number')
        return field;
    if (typeof field === 'object') {
        if (field.useOverride === true && typeof field.override === 'number') {
            return field.override;
        }
        if (typeof field.value === 'number')
            return field.value;
        if (typeof field.derived === 'number')
            return field.derived;
    }
    return undefined;
}
//# sourceMappingURL=constants.js.map