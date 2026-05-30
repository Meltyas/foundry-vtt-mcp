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
import { CosmereRpgFiltersSchema, matchesCosmereRpgFilters, describeCosmereRpgFilters, } from './filters.js';
import { COSMERE_ATTR_KEYS, COSMERE_DEFENSE_KEYS, COSMERE_RESOURCES, readDerived, } from './constants.js';
export class CosmereRpgAdapter {
    getMetadata() {
        return {
            id: 'cosmere-rpg',
            name: 'cosmere-rpg',
            displayName: 'Cosmere RPG',
            version: '1.0.0',
            description: 'Support for the Cosmere RPG (Plotweaver) system: levels/tiers, ' +
                'attributes (str/spd/int/wil/awa/pre), defenses (phy/cog/spi), ' +
                'resources (health/focus/investiture), deflect, and skills (rank+mod). ' +
                'Adversary indexing covers tier, role, creature type, size, defenses, ' +
                'deflect, and Investiture pool.',
            supportedFeatures: {
                creatureIndex: true,
                characterStats: true,
                spellcasting: false, // Surges are modelled as items, not a spellcasting feature
                powerLevel: true, // Uses adversary tier (1-4) or character level
            },
        };
    }
    canHandle(systemId) {
        return systemId.toLowerCase() === 'cosmere-rpg';
    }
    extractCreatureData(_doc, _pack) {
        throw new Error('extractCreatureData should be called from CosmereRpgIndexBuilder, not the adapter');
    }
    getFilterSchema() {
        return CosmereRpgFiltersSchema;
    }
    matchesFilters(creature, filters) {
        const validated = CosmereRpgFiltersSchema.safeParse(filters);
        if (!validated.success)
            return false;
        return matchesCosmereRpgFilters(creature, validated.data);
    }
    getDataPaths() {
        return {
            level: 'system.level',
            tier: 'system.tier',
            // Cosmere RPG doesn't use D&D-style class/race; leaving null.
            challengeRating: null,
            creatureType: 'system.type.id',
            size: 'system.size',
            alignment: null,
            // Resource maxes (DerivedValueFields — read .value)
            hitPoints: 'system.resources.hea.max.value',
            armorClass: null, // Defenses replace AC; cosmere splits phys/cog/spi
            // Cosmere-specific
            attributes: 'system.attributes',
            defenses: 'system.defenses',
            resources: 'system.resources',
            skills: 'system.skills',
            deflect: 'system.deflect.value',
        };
    }
    formatCreatureForList(creature) {
        const c = creature;
        const formatted = {
            id: c.id,
            name: c.name,
            type: c.type,
            pack: { id: c.packName, label: c.packLabel },
        };
        if (c.systemData) {
            const stats = {};
            if (c.systemData.tier !== undefined)
                stats.tier = c.systemData.tier;
            if (c.systemData.role)
                stats.role = c.systemData.role;
            if (c.systemData.level !== undefined)
                stats.level = c.systemData.level;
            if (c.systemData.creatureType)
                stats.creatureType = c.systemData.creatureType;
            if (c.systemData.size)
                stats.size = c.systemData.size;
            if (c.systemData.health !== undefined)
                stats.health = c.systemData.health;
            if (c.systemData.deflect !== undefined)
                stats.deflect = c.systemData.deflect;
            if (c.systemData.hasInvestiture)
                stats.hasInvestiture = true;
            if (Object.keys(stats).length > 0)
                formatted.stats = stats;
        }
        if (c.img)
            formatted.hasImage = true;
        return formatted;
    }
    formatCreatureForDetails(creature) {
        const c = creature;
        const formatted = this.formatCreatureForList(creature);
        if (c.systemData) {
            formatted.detailedStats = { ...c.systemData };
        }
        if (c.img)
            formatted.img = c.img;
        return formatted;
    }
    describeFilters(filters) {
        const validated = CosmereRpgFiltersSchema.safeParse(filters);
        if (!validated.success)
            return 'invalid filters';
        return describeCosmereRpgFilters(validated.data);
    }
    getPowerLevel(creature) {
        // Cosmere's primary encounter-design dial is tier (1-4) for adversaries.
        // Player-character level is exposed if present but adversaries don't
        // carry one — fall back to tier first, level second.
        const c = creature;
        return c.systemData?.tier ?? c.systemData?.level;
    }
    /**
     * Extract Cosmere-specific basic info: level, tier, resource maxes,
     * deflect. Returned object is merged into the get-character response's
     * `basicInfo` block.
     */
    extractBasicInfo(actorData) {
        const system = actorData?.system || {};
        const out = {};
        if (typeof system.level === 'number')
            out.level = system.level;
        if (typeof system.tier === 'number')
            out.tier = system.tier;
        if (system.resources) {
            for (const [key, name] of Object.entries(COSMERE_RESOURCES)) {
                const r = system.resources[key];
                if (r) {
                    out[name] = {
                        current: typeof r.value === 'number' ? r.value : 0,
                        max: readDerived(r.max) ?? 0,
                        bonus: typeof r.bonus === 'number' ? r.bonus : 0,
                    };
                }
            }
        }
        const deflect = readDerived(system.deflect);
        if (deflect !== undefined)
            out.deflect = deflect;
        return out;
    }
    /**
     * Extract Cosmere-specific stats: attributes (with pre→prs remap),
     * defenses (final values), skills (rank + mod).
     */
    extractCharacterStats(actorData) {
        const system = actorData?.system || {};
        const stats = {};
        if (system.attributes) {
            stats.attributes = {};
            for (const key of COSMERE_ATTR_KEYS) {
                const a = system.attributes[key];
                if (a && typeof a.value === 'number') {
                    stats.attributes[key] = a.value;
                }
            }
        }
        if (system.defenses) {
            stats.defenses = {};
            for (const key of COSMERE_DEFENSE_KEYS) {
                const v = readDerived(system.defenses[key]);
                if (v !== undefined)
                    stats.defenses[key] = v;
            }
        }
        if (system.skills) {
            stats.skills = {};
            for (const [key, skill] of Object.entries(system.skills)) {
                if (typeof skill === 'object' && skill !== null) {
                    const rank = skill.rank;
                    const mod = readDerived(skill.mod);
                    stats.skills[key] = {
                        rank: typeof rank === 'number' ? rank : 0,
                        mod: mod ?? 0,
                    };
                }
            }
        }
        return stats;
    }
}
//# sourceMappingURL=adapter.js.map