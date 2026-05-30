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
import { DAGGERHEART_DATA_PATHS } from './constants.js';
// ─── Filter schema ─────────────────────────────────────────────────────────────
export const DaggerheartFiltersSchema = z
    .object({
    tier: z.number().int().min(1).max(4).optional(),
    difficulty: z.number().int().min(0).optional(),
    adversaryType: z.string().optional(),
    environment: z.string().optional(),
})
    .strict();
// ─── Adapter ──────────────────────────────────────────────────────────────────
export class DaggerheartAdapter {
    getMetadata() {
        return {
            id: 'daggerheart',
            name: 'daggerheart',
            displayName: 'Daggerheart',
            version: '1.0.0',
            description: 'Support for the Daggerheart RPG system: adversary tier and difficulty, ' +
                'character attributes (Agility/Strength/Finesse/Instinct/Presence/Knowledge), ' +
                'HP, Stress, Hope, and all 11 Daggerheart item types ' +
                '(weapon, armor, consumable, loot, ancestry, community, class, subclass, feature, domainCard, beastform).',
            supportedFeatures: {
                creatureIndex: true,
                characterStats: true,
                spellcasting: false, // Daggerheart uses domain cards, not spellcasting
                powerLevel: true, // Adversary tier (1–4)
            },
        };
    }
    canHandle(systemId) {
        return systemId.toLowerCase() === 'daggerheart';
    }
    extractCreatureData(doc, pack) {
        // Only index adversary and environment actors
        if (!['adversary', 'environment'].includes(doc.type))
            return null;
        try {
            const sys = doc.system ?? {};
            const creature = {
                id: doc._id ?? doc.id,
                name: doc.name,
                type: doc.type,
                packName: pack.metadata?.name ?? pack.collection ?? '',
                packLabel: pack.metadata?.label ?? pack.title ?? '',
                img: doc.img,
                system: 'daggerheart',
                systemData: {
                    tier: sys.tier ?? undefined,
                    difficulty: sys.difficulty ?? undefined,
                    adversaryType: sys.type ?? sys.adversaryType ?? undefined,
                    environment: doc.type === 'environment' ? (sys.environment ?? doc.name) : undefined,
                    hp: sys.hp?.max ?? sys.hp?.value ?? undefined,
                    evasion: sys.evasion ?? undefined,
                    armorScore: sys.armorScore ?? sys.armor?.score ?? undefined,
                },
            };
            return { creature, errors: 0 };
        }
        catch {
            return null;
        }
    }
    getFilterSchema() {
        return DaggerheartFiltersSchema;
    }
    matchesFilters(creature, filters) {
        const validated = DaggerheartFiltersSchema.safeParse(filters);
        if (!validated.success)
            return false;
        const f = validated.data;
        const d = creature.systemData;
        if (f.tier !== undefined && d.tier !== f.tier)
            return false;
        if (f.difficulty !== undefined && d.difficulty !== f.difficulty)
            return false;
        if (f.adversaryType && d.adversaryType?.toLowerCase() !== f.adversaryType.toLowerCase())
            return false;
        if (f.environment && !d.environment?.toLowerCase().includes(f.environment.toLowerCase()))
            return false;
        return true;
    }
    getDataPaths() {
        return {
            hp: DAGGERHEART_DATA_PATHS.hp,
            hpMax: DAGGERHEART_DATA_PATHS.hpMax,
            stress: DAGGERHEART_DATA_PATHS.stress,
            stressMax: DAGGERHEART_DATA_PATHS.stressMax,
            hope: DAGGERHEART_DATA_PATHS.hope,
            hopeMax: DAGGERHEART_DATA_PATHS.hopeMax,
            level: null, // Daggerheart uses tier, not level
            armorClass: null, // Uses evasion instead
            spellcastingAbility: null,
        };
    }
    formatCreatureForList(creature) {
        const d = creature.systemData;
        return {
            id: creature.id,
            name: creature.name,
            type: creature.type,
            pack: creature.packLabel,
            tier: d.tier ?? '—',
            difficulty: d.difficulty ?? '—',
            adversaryType: d.adversaryType ?? '—',
            hp: d.hp ?? '—',
        };
    }
    formatCreatureForDetails(creature) {
        const d = creature.systemData;
        return {
            id: creature.id,
            name: creature.name,
            type: creature.type,
            pack: creature.packLabel,
            img: creature.img,
            stats: {
                tier: d.tier,
                difficulty: d.difficulty,
                adversaryType: d.adversaryType,
                environment: d.environment,
                hp: d.hp,
                evasion: d.evasion,
                armorScore: d.armorScore,
            },
        };
    }
    describeFilters(filters) {
        const parts = [];
        if (filters.tier !== undefined)
            parts.push(`tier ${filters.tier}`);
        if (filters.difficulty !== undefined)
            parts.push(`difficulty ${filters.difficulty}`);
        if (filters.adversaryType)
            parts.push(`type "${filters.adversaryType}"`);
        if (filters.environment)
            parts.push(`environment "${filters.environment}"`);
        return parts.length > 0 ? parts.join(', ') : 'no filters';
    }
    getPowerLevel(creature) {
        return creature.systemData.tier;
    }
    extractCharacterStats(actorData) {
        const sys = actorData?.system ?? {};
        const attrs = sys.attributes ?? {};
        return {
            attributes: {
                agility: attrs.agility?.value ?? attrs.agility ?? null,
                strength: attrs.strength?.value ?? attrs.strength ?? null,
                finesse: attrs.finesse?.value ?? attrs.finesse ?? null,
                instinct: attrs.instinct?.value ?? attrs.instinct ?? null,
                presence: attrs.presence?.value ?? attrs.presence ?? null,
                knowledge: attrs.knowledge?.value ?? attrs.knowledge ?? null,
            },
            evasion: sys.evasion ?? null,
            armorScore: sys.armorScore ?? sys.armor?.score ?? null,
        };
    }
    extractBasicInfo(actorData) {
        const sys = actorData?.system ?? {};
        return {
            hp: {
                value: sys.hp?.value ?? null,
                max: sys.hp?.max ?? null,
            },
            stress: {
                value: sys.stress?.value ?? null,
                max: sys.stress?.max ?? null,
            },
            hope: {
                value: sys.hope?.value ?? null,
                max: sys.hope?.max ?? null,
            },
            evasion: sys.evasion ?? null,
            armorScore: sys.armorScore ?? sys.armor?.score ?? null,
        };
    }
}
//# sourceMappingURL=adapter.js.map