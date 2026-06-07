import { FoundryClient } from '../foundry-client.js';
import { Logger } from '../logger.js';

export interface GuardManagementToolsOptions {
  foundryClient: FoundryClient;
  logger: Logger;
}

export class GuardManagementTools {
  private foundryClient: FoundryClient;
  private logger: Logger;

  constructor({ foundryClient, logger }: GuardManagementToolsOptions) {
    this.foundryClient = foundryClient;
    this.logger = logger.child({ component: 'GuardManagementTools' });
  }

  // ── Generic query helper ────────────────────────────────────────────────
  private async query(method: string, data: any = {}) {
    return this.foundryClient.query(method, data);
  }

  private text(t: string) {
    return { content: [{ type: 'text', text: t }] };
  }

  private json(data: any) {
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  }

  getToolDefinitions() {
    return [
      // ── Organizations ────────────────────────────────────────────────
      {
        name: 'guard-organizations-list',
        description: 'List all guard organizations.',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'guard-organizations-get',
        description: 'Get a specific guard organization by ID.',
        inputSchema: {
          type: 'object',
          properties: { id: { type: 'string', description: 'Organization ID' } },
          required: ['id'],
        },
      },
      {
        name: 'guard-organizations-create',
        description: 'Create a new guard organization.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            subtitle: { type: 'string' },
            baseStats: { type: 'object' },
          },
          required: ['name'],
        },
      },
      {
        name: 'guard-organizations-update',
        description: 'Update an existing guard organization.',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            subtitle: { type: 'string' },
            baseStats: { type: 'object' },
          },
          required: ['id'],
        },
      },
      {
        name: 'guard-organizations-delete',
        description: 'Delete a guard organization by ID.',
        inputSchema: {
          type: 'object',
          properties: { id: { type: 'string' } },
          required: ['id'],
        },
      },
      // ── Patrols ──────────────────────────────────────────────────────
      {
        name: 'guard-patrols-list',
        description: 'List all patrols for the currently active organization.',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'guard-patrols-create',
        description: 'Create a patrol for the currently active organization.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            baseStats: { type: 'object' },
          },
          required: ['name'],
        },
      },
      {
        name: 'guard-patrols-update',
        description: 'Update an existing patrol by ID.',
        inputSchema: {
          type: 'object',
          properties: {
            patrolId: { type: 'string', description: 'Patrol ID to update' },
            name: { type: 'string' },
            subtitle: { type: 'string' },
            soldierSlots: { type: 'number', description: 'Number of available slots (1-11)' },
            baseStats: { type: 'object' },
            officerId: { type: 'string', description: 'ID of the assigned officer (or null)' },
            maxHope: { type: 'number', description: 'Max hope pool (0-6)' },
            currentHope: { type: 'number' },
          },
          required: ['patrolId'],
        },
      },
      {
        name: 'guard-patrols-delete',
        description: 'Delete a patrol by ID.',
        inputSchema: {
          type: 'object',
          properties: { patrolId: { type: 'string' } },
          required: ['patrolId'],
        },
      },
      // ── Resources ────────────────────────────────────────────────────
      {
        name: 'guard-resources-list',
        description: 'List all guard resources.',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'guard-resources-create',
        description: 'Create a guard resource.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            quantity: { type: 'number' },
            image: { type: 'string' },
            organizationId: { type: 'string' },
          },
          required: ['name'],
        },
      },
      {
        name: 'guard-resources-update',
        description: 'Update a guard resource.',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            quantity: { type: 'number' },
            image: { type: 'string' },
            organizationId: { type: 'string' },
          },
          required: ['id'],
        },
      },
      {
        name: 'guard-resources-delete',
        description: 'Delete a guard resource by ID.',
        inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      },
      // ── Reputations ──────────────────────────────────────────────────
      {
        name: 'guard-reputations-list',
        description: 'List all guard reputations.',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'guard-reputations-create',
        description: 'Create a guard reputation.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            level: { type: 'number', description: '1=Enemigos … 7=Aliados' },
            organizationId: { type: 'string' },
            image: { type: 'string' },
            faction: { type: 'string', description: 'Nombre real de la facción en el mundo' },
            trend: { type: 'string', enum: ['rising', 'stable', 'falling'] },
            category: { type: 'string', enum: ['gremio', 'banda', 'noble', 'militar', 'religiosa', 'otra'] },
            contact: { type: 'string', description: 'NPC de contacto' },
            gmNotes: { type: 'string', description: 'Notas privadas del GM' },
            factionRelations: {
              type: 'array',
              description: 'Relaciones con otras facciones del mundo',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  factionName: { type: 'string' },
                  relationType: { type: 'string', enum: ['aliada', 'rival', 'enemiga', 'neutral'] },
                  notes: { type: 'string' },
                },
                required: ['id', 'factionName', 'relationType'],
              },
            },
            favors: {
              type: 'array',
              description: 'Favores que puede ofrecer la facción',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                  cost: { type: 'string', description: 'Coste opcional (texto libre)' },
                },
                required: ['id', 'name', 'description'],
              },
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'guard-reputations-update',
        description: 'Update a guard reputation.',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            level: { type: 'number', description: '1=Enemigos … 7=Aliados' },
            image: { type: 'string' },
            faction: { type: 'string' },
            trend: { type: 'string', enum: ['rising', 'stable', 'falling'] },
            category: { type: 'string', enum: ['gremio', 'banda', 'noble', 'militar', 'religiosa', 'otra'] },
            contact: { type: 'string' },
            gmNotes: { type: 'string' },
            hidden: { type: 'boolean', description: 'Si true, la reputación está oculta en el panel (dimmed, al final de la lista)' },
            factionRelations: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  factionName: { type: 'string' },
                  relationType: { type: 'string', enum: ['aliada', 'rival', 'enemiga', 'neutral'] },
                  notes: { type: 'string' },
                },
                required: ['id', 'factionName', 'relationType'],
              },
            },
            favors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                  cost: { type: 'string' },
                },
                required: ['id', 'name', 'description'],
              },
            },
          },
          required: ['id'],
        },
      },
      {
        name: 'guard-reputations-delete',
        description: 'Delete a guard reputation by ID.',
        inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      },
      // ── Crimes ───────────────────────────────────────────────────────
      {
        name: 'guard-crimes-list',
        description: 'List all crimes.',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'guard-crimes-create',
        description: 'Create a crime.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            offenseType: { type: 'string', enum: ['minor', 'major', 'capital', 'civil'], description: 'Severity of the offense' },
            customSentence: { type: 'string', description: 'Custom sentence description (overrides default)' },
          },
          required: ['name'],
        },
      },
      {
        name: 'guard-crimes-update',
        description: 'Update a crime.',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            offenseType: { type: 'string', enum: ['minor', 'major', 'capital', 'civil'] },
            customSentence: { type: 'string' },
          },
          required: ['id'],
        },
      },
      {
        name: 'guard-crimes-delete',
        description: 'Delete a crime by ID.',
        inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      },
      // ── Gangs ────────────────────────────────────────────────────────
      {
        name: 'guard-gangs-list',
        description: 'List all gangs.',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'guard-gangs-create',
        description: 'Create a gang.',
        inputSchema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
      },
      {
        name: 'guard-gangs-update',
        description: 'Update a gang.',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            img: { type: 'string' },
            notes: { type: 'string' },
            status: { type: 'string', enum: ['active', 'disbanded', 'arrested', 'unknown'] },
            hidden: { type: 'boolean', description: 'Si true, la banda está oculta en el panel (dimmed, al final de la lista)' },
          },
          required: ['id'],
        },
      },
      {
        name: 'guard-gangs-delete',
        description: 'Delete a gang by ID.',
        inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      },
      // ── POIs ─────────────────────────────────────────────────────────
      {
        name: 'guard-pois-list',
        description: 'List all points of interest.',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'guard-pois-create',
        description: 'Create a point of interest.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            actorId: { type: 'string', description: 'Linked Foundry actor ID' },
            img: { type: 'string', description: 'Image path or URL' },
            notes: { type: 'string' },
            possibleCrimes: { type: 'array', items: { type: 'string' }, description: 'Crime IDs linked to this POI' },
            gangIds: { type: 'array', items: { type: 'string' }, description: 'Gang IDs linked to this POI' },
            status: { type: 'string', enum: ['active', 'arrested', 'released', 'deceased'] },
          },
          required: ['name'],
        },
      },
      {
        name: 'guard-pois-update',
        description: 'Update a point of interest.',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            actorId: { type: 'string' },
            img: { type: 'string' },
            notes: { type: 'string' },
            possibleCrimes: { type: 'array', items: { type: 'string' } },
            gangIds: { type: 'array', items: { type: 'string' } },
            status: { type: 'string', enum: ['active', 'arrested', 'released', 'deceased'] },
          },
          required: ['id'],
        },
      },
      {
        name: 'guard-pois-delete',
        description: 'Delete a point of interest by ID.',
        inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      },
      // ── Prisoners ────────────────────────────────────────────────────
      {
        name: 'guard-prisoners-list',
        description: 'List all prisoners.',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'guard-prisoners-create',
        description: 'Create a prisoner.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            actorId: { type: 'string', description: 'Linked Foundry actor ID' },
            img: { type: 'string', description: 'Image path or URL' },
            cellIndex: { type: 'number', description: 'Cell index where the prisoner is held' },
            notes: { type: 'string' },
            crimes: { type: 'array', items: { type: 'string' }, description: 'Crime IDs from the crime catalog' },
            sentencePhases: { type: 'number', description: 'Number of phases for the sentence' },
            status: { type: 'string', enum: ['awaiting', 'serving', 'released', 'executed'] },
          },
          required: ['name'],
        },
      },
      {
        name: 'guard-prisoners-update',
        description: 'Update a prisoner.',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            actorId: { type: 'string' },
            img: { type: 'string' },
            cellIndex: { type: 'number' },
            notes: { type: 'string' },
            crimes: { type: 'array', items: { type: 'string' } },
            sentencePhases: { type: 'number' },
            sentenceStartPhase: { type: 'number' },
            releaseTurn: { type: 'number', description: 'Turn on which the prisoner is released (null = indefinite)' },
            status: { type: 'string', enum: ['awaiting', 'serving', 'released', 'executed'] },
          },
          required: ['id'],
        },
      },
      {
        name: 'guard-prisoners-delete',
        description: 'Delete a prisoner by ID.',
        inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      },
      // ── Buildings ────────────────────────────────────────────────────
      {
        name: 'guard-buildings-list',
        description: 'List all guard buildings.',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'guard-buildings-create',
        description: 'Create a guard building.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Building name' },
            description: { type: 'string', description: 'Building description' },
            img: { type: 'string', description: 'Image path or URL' },
            tags: {
              type: 'array',
              items: { type: 'string', enum: ['civil', 'auxiliar', 'guardia', 'publico', 'oficial'] },
              description: 'Building tags',
            },
            zone: {
              type: 'string',
              enum: [
                'claro-entrada',
                'claro-obrero',
                'claro-central',
                'claro-fronterizo',
                'claro-noble',
                'zona-salvaje',
                'bajo-arbol',
                'fuera-arboria',
              ],
              description: 'Zone where the building is located (default: fuera-arboria)',
            },
            gangLink: {
              type: 'object',
              properties: {
                gangId: { type: 'string' },
                gangName: { type: 'string' },
                notes: { type: 'string' },
              },
              description: 'Associated gang link',
            },
            active: { type: 'boolean', description: 'Whether the building is visible in zones (default: false)' },
            hidden: { type: 'boolean', description: 'GM only: hide from player activator (default: false)' },
          },
          required: ['name'],
        },
      },
      {
        name: 'guard-buildings-update',
        description: 'Update a guard building.',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Building ID to update' },
            name: { type: 'string', description: 'New name' },
            description: { type: 'string', description: 'New description' },
            img: { type: 'string', description: 'New image path or URL' },
            tags: {
              type: 'array',
              items: { type: 'string', enum: ['civil', 'auxiliar', 'guardia', 'publico', 'oficial'] },
              description: 'Updated tags',
            },
            zone: {
              type: 'string',
              enum: [
                'claro-entrada',
                'claro-obrero',
                'claro-central',
                'claro-fronterizo',
                'claro-noble',
                'zona-salvaje',
                'bajo-arbol',
                'fuera-arboria',
              ],
              description: 'Zone where the building is located',
            },
            gangLink: {
              type: 'object',
              properties: {
                gangId: { type: 'string' },
                gangName: { type: 'string' },
                notes: { type: 'string' },
              },
              description: 'Associated gang link',
            },
            active: { type: 'boolean', description: 'Whether the building is visible in zones' },
            hidden: { type: 'boolean', description: 'GM only: hide from player activator' },
          },
          required: ['id'],
        },
      },
      {
        name: 'guard-buildings-delete',
        description: 'Delete a guard building by ID.',
        inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      },
      {
        name: 'guard-buildings-activate',
        description: 'Activate a building so it appears in its zone for all players.',
        inputSchema: { type: 'object', properties: { id: { type: 'string', description: 'Building ID' } }, required: ['id'] },
      },
      {
        name: 'guard-buildings-deactivate',
        description: 'Deactivate a building so it no longer appears in its zone.',
        inputSchema: { type: 'object', properties: { id: { type: 'string', description: 'Building ID' } }, required: ['id'] },
      },
      {
        name: 'guard-buildings-setHidden',
        description: 'GM only: set whether a building is hidden from the player activator.',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Building ID' },
            hidden: { type: 'boolean', description: 'true = hidden from players, false = visible in activator' },
          },
          required: ['id', 'hidden'],
        },
      },
      // ── Finance ──────────────────────────────────────────────────────
      {
        name: 'guard-finance-get',
        description: 'Get the guard finances.',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'guard-finance-update',
        description: 'Update the guard finances.',
        inputSchema: { type: 'object', properties: {} },
      },
      // ── Phase ────────────────────────────────────────────────────────
      {
        name: 'guard-phase-get',
        description: 'Get the current guard phase.',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'guard-phase-advance',
        description: 'Advance the guard phase.',
        inputSchema: { type: 'object', properties: {} },
      },
      // ── Phase Events ─────────────────────────────────────────────────
      {
        name: 'guard-phase-events-list',
        description: 'List all scheduled phase events (avisos).',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'guard-phase-events-get',
        description: 'Get a single scheduled phase event by ID.',
        inputSchema: {
          type: 'object',
          properties: { id: { type: 'string', description: 'Event ID' } },
          required: ['id'],
        },
      },
      {
        name: 'guard-phase-events-search',
        description:
          'Search scheduled phase events by text, category, visibility, status or trigger turn range.',
        inputSchema: {
          type: 'object',
          properties: {
            text: { type: 'string', description: 'Free text matched against title/description' },
            category: {
              type: 'string',
              enum: ['aviso', 'recordatorio', 'economico', 'prision', 'banda', 'aleatorio', 'otro'],
            },
            visibility: { type: 'string', enum: ['all', 'players', 'gm'] },
            status: { type: 'string', enum: ['pending', 'fired', 'cancelled'] },
            turnFrom: { type: 'number', description: 'Minimum trigger turn (inclusive)' },
            turnTo: { type: 'number', description: 'Maximum trigger turn (inclusive)' },
          },
        },
      },
      {
        name: 'guard-phase-events-create',
        description:
          'Schedule a new phase event/aviso that fires at a given turn. Supports one-off, recurring and random (RollTable) events with player/GM visibility.',
        inputSchema: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Event title' },
            description: { type: 'string', description: 'Event description (HTML allowed)' },
            triggerTurn: { type: 'number', description: 'Turn at which the event fires (>=1)' },
            visibility: {
              type: 'string',
              enum: ['all', 'players', 'gm'],
              description: 'Who can see the event (default: all)',
            },
            category: {
              type: 'string',
              enum: ['aviso', 'recordatorio', 'economico', 'prision', 'banda', 'aleatorio', 'otro'],
              description: 'Event category (default: aviso)',
            },
            recurrence: {
              type: 'object',
              description: 'Recurrence behaviour (default: none)',
              properties: {
                mode: {
                  type: 'string',
                  enum: ['none', 'everyNTurns', 'everyDay', 'everyNight'],
                },
                interval: { type: 'number', description: 'Interval in turns (mode=everyNTurns)' },
                endTurn: {
                  type: ['number', 'null'],
                  description: 'Stop recurring after this turn. null = forever',
                },
              },
              required: ['mode'],
            },
            rollTableId: {
              type: 'string',
              description: 'RollTable ID for random events (category=aleatorio)',
            },
            notifyChat: {
              type: 'boolean',
              description: 'Post a chat message when the event fires (default: true)',
            },
            linkedId: {
              type: 'string',
              description: 'Optional linked entity ID (prisoner/gang/building)',
            },
          },
          required: ['title', 'triggerTurn'],
        },
      },
      {
        name: 'guard-phase-events-update',
        description: 'Update fields of an existing scheduled phase event.',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Event ID to update' },
            title: { type: 'string' },
            description: { type: 'string' },
            triggerTurn: { type: 'number' },
            visibility: { type: 'string', enum: ['all', 'players', 'gm'] },
            category: {
              type: 'string',
              enum: ['aviso', 'recordatorio', 'economico', 'prision', 'banda', 'aleatorio', 'otro'],
            },
            status: { type: 'string', enum: ['pending', 'fired', 'cancelled'] },
            recurrence: {
              type: 'object',
              properties: {
                mode: { type: 'string', enum: ['none', 'everyNTurns', 'everyDay', 'everyNight'] },
                interval: { type: 'number' },
                endTurn: { type: ['number', 'null'] },
              },
              required: ['mode'],
            },
            rollTableId: { type: 'string' },
            notifyChat: { type: 'boolean' },
            linkedId: { type: 'string' },
          },
          required: ['id'],
        },
      },
      {
        name: 'guard-phase-events-cancel',
        description: 'Cancel a scheduled phase event (sets status to cancelled).',
        inputSchema: {
          type: 'object',
          properties: { id: { type: 'string', description: 'Event ID' } },
          required: ['id'],
        },
      },
      {
        name: 'guard-phase-events-delete',
        description: 'Delete a scheduled phase event by ID.',
        inputSchema: {
          type: 'object',
          properties: { id: { type: 'string', description: 'Event ID' } },
          required: ['id'],
        },
      },
      // ── Phase Reports ────────────────────────────────────────────────
      {
        name: 'guard-phase-reports-list',
        description: 'List all auto-generated phase reports (newest first).',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'guard-phase-reports-get',
        description: 'Get the phase report for a specific turn.',
        inputSchema: {
          type: 'object',
          properties: { turn: { type: 'number', description: 'Turn number' } },
          required: ['turn'],
        },
      },
      {
        name: 'guard-phase-reports-search',
        description: 'Search phase report entries by text, category or turn range.',
        inputSchema: {
          type: 'object',
          properties: {
            text: { type: 'string', description: 'Free text matched against entry text' },
            category: {
              type: 'string',
              enum: [
                'aviso',
                'recordatorio',
                'economico',
                'prision',
                'banda',
                'aleatorio',
                'otro',
                'sistema',
              ],
            },
            turnFrom: { type: 'number', description: 'Minimum turn (inclusive)' },
            turnTo: { type: 'number', description: 'Maximum turn (inclusive)' },
          },
        },
      },
      // ── Officers (existing) ──────────────────────────────────────────
      {
        name: 'guard-create-officer',
        description:
          'Create a new officer in the guard-management module. Requires an existing Foundry actor. Use list-characters first to get the actorId and actorName.',
        inputSchema: {
          type: 'object',
          properties: {
            actorId: {
              type: 'string',
              description: 'Foundry actor ID for this officer',
            },
            actorName: {
              type: 'string',
              description: 'Display name of the actor',
            },
            actorImg: {
              type: 'string',
              description: 'Optional path or URL for the actor portrait',
            },
            title: {
              type: 'string',
              description: 'Officer title or rank (e.g. "Cabo", "Sargento", "Capitán")',
            },
            organizationId: {
              type: 'string',
              description: 'Optional ID of the guard organization to assign this officer to',
            },
            isCivil: {
              type: 'boolean',
              description:
                'If true, officer appears in the Civiles tab instead of Oficiales (default: false)',
            },
            skill: {
              type: 'object',
              description: 'Optional skill shown in patrol cards',
              properties: {
                name: { type: 'string' },
                image: { type: 'string' },
              },
              required: ['name'],
            },
            pros: {
              type: 'array',
              description: 'Positive traits or characteristics of the officer',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                },
                required: ['title', 'description'],
              },
            },
            cons: {
              type: 'array',
              description: 'Negative traits or characteristics of the officer',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                },
                required: ['title', 'description'],
              },
            },
          },
          required: ['actorId', 'actorName', 'title'],
        },
      },
      {
        name: 'guard-list-officers',
        description: 'List all officers registered in the guard-management module.',
        inputSchema: {
          type: 'object',
          properties: {
            organizationId: {
              type: 'string',
              description: 'Optional: filter officers by organization ID',
            },
          },
        },
      },
      {
        name: 'guard-delete-officer',
        description:
          'Delete an officer from the guard-management module. Use guard-list-officers first to get the officer ID.',
        inputSchema: {
          type: 'object',
          properties: {
            officerId: {
              type: 'string',
              description: 'The internal officer ID (obtained from guard-list-officers)',
            },
          },
          required: ['officerId'],
        },
      },
      {
        name: 'guard-update-officer',
        description:
          'Update fields of an existing officer in the guard-management module (e.g. actorImg, title, pros, cons, skill). Use guard-list-officers first to get the officer ID.',
        inputSchema: {
          type: 'object',
          properties: {
            officerId: {
              type: 'string',
              description: 'The internal officer ID (obtained from guard-list-officers)',
            },
            data: {
              type: 'object',
              description: 'Fields to update on the officer',
              properties: {
                actorImg: { type: 'string', description: 'New portrait path or URL' },
                actorName: { type: 'string' },
                actorId: { type: 'string' },
                title: { type: 'string' },
                isCivil: { type: 'boolean' },
                organizationId: { type: 'string' },
                skill: {
                  type: 'object',
                  properties: { name: { type: 'string' }, image: { type: 'string' } },
                  required: ['name'],
                },
                pros: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: { title: { type: 'string' }, description: { type: 'string' } },
                    required: ['title', 'description'],
                  },
                },
                cons: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: { title: { type: 'string' }, description: { type: 'string' } },
                    required: ['title', 'description'],
                  },
                },
              },
            },
          },
          required: ['officerId', 'data'],
        },
      },
      // ── Decisions ────────────────────────────────────────────────────────
      {
        name: 'guard-decisions-list',
        description: 'List all guard decisions (talent tree nodes).',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'guard-decisions-create',
        description: 'Create a guard decision node in the talent tree.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            img: { type: 'string', description: 'Icon image path' },
            description: { type: 'string', description: 'Rich HTML description' },
            col: { type: 'number', description: 'Grid column (0-based)' },
            row: { type: 'number', description: 'Grid row (0-based)' },
            parentIds: { type: 'array', items: { type: 'string' }, description: 'IDs of parent nodes (incoming connections)' },
            visible: { type: 'boolean', description: 'Whether players can see this node (default false)' },
            state: { type: 'string', enum: ['locked', 'unlocked'], description: 'Node state: locked=shown dimmed, unlocked=fully revealed' },
            section: { type: 'string', description: 'ID of the section (tab) this node belongs to' },
          },
          required: ['name'],
        },
      },
      {
        name: 'guard-decisions-update',
        description: 'Update a guard decision node.',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            img: { type: 'string' },
            description: { type: 'string' },
            col: { type: 'number' },
            row: { type: 'number' },
            parentIds: { type: 'array', items: { type: 'string' } },
            visible: { type: 'boolean' },
            state: { type: 'string', enum: ['locked', 'unlocked'] },
            section: { type: 'string', description: 'Move node to this section ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'guard-decisions-delete',
        description: 'Delete a guard decision node by ID.',
        inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      },
      // ── Decision Sections ─────────────────────────────────────────────────
      {
        name: 'guard-decision-sections-list',
        description: 'List all decision sections (tabs in the talent tree).',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'guard-decision-sections-create',
        description: 'Create a new decision section (tab).',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Section display name' },
            order: { type: 'number', description: 'Display order (0-based). Defaults to last.' },
          },
          required: ['name'],
        },
      },
      {
        name: 'guard-decision-sections-update',
        description: 'Update a decision section.',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            order: { type: 'number' },
          },
          required: ['id'],
        },
      },
      {
        name: 'guard-decision-sections-delete',
        description: 'Delete a decision section. Nodes in the deleted section are reassigned to the next available section.',
        inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      },
      // ── Abilities / Favors ────────────────────────────────────────────────
      {
        name: 'guard-abilities-list',
        description: 'List all guard abilities and favors.',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'guard-abilities-create',
        description: 'Create a guard ability / favor.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            img: { type: 'string', description: 'Icon image path' },
            description: { type: 'string', description: 'Rich HTML description' },
            cost: { type: 'string', description: 'Cost label (e.g. "2 Esperanza")' },
            category: { type: 'string', description: 'Category / tag' },
          },
          required: ['name'],
        },
      },
      {
        name: 'guard-abilities-update',
        description: 'Update a guard ability / favor.',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            img: { type: 'string' },
            description: { type: 'string' },
            cost: { type: 'string' },
            category: { type: 'string' },
          },
          required: ['id'],
        },
      },
      {
        name: 'guard-abilities-delete',
        description: 'Delete a guard ability / favor by ID.',
        inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      },
    ];
  }

  async handleCreateOfficer(args: any) {
    this.logger.debug('Creating guard officer', { actorId: args.actorId, title: args.title });

    const result = await this.foundryClient.query('foundry-mcp-bridge.createGuardOfficer', args);

    if (result?.error) {
      return {
        content: [{ type: 'text', text: `Error creating officer: ${result.error}` }],
      };
    }

    const o = result.officer;
    const lines = [
      `Officer created successfully.`,
      `Name: ${o.actorName}`,
      `Title: ${o.title}`,
      `ID: ${o.id}`,
    ];
    if (o.organizationId) lines.push(`Organization: ${o.organizationId}`);
    if (o.isCivil) lines.push(`Type: Civil`);

    return { content: [{ type: 'text', text: lines.join('\n') }] };
  }

  async handleListOfficers(args: any) {
    this.logger.debug('Listing guard officers', args);

    const result = await this.foundryClient.query('foundry-mcp-bridge.listGuardOfficers', args);

    if (result?.error) {
      return {
        content: [{ type: 'text', text: `Error listing officers: ${result.error}` }],
      };
    }

    if (!result.officers?.length) {
      return { content: [{ type: 'text', text: 'No officers registered.' }] };
    }

    const lines = result.officers.map(
      (o: any) =>
        `- **${o.actorName}** (${o.title}) | ID: ${o.id}` +
        (o.isCivil ? ' [Civil]' : '') +
        (o.organizationId ? ` | Org: ${o.organizationId}` : '')
    );

    return {
      content: [{ type: 'text', text: `Officers (${result.total}):\n${lines.join('\n')}` }],
    };
  }

  async handleDeleteOfficer(args: any) {
    this.logger.debug('Deleting guard officer', { officerId: args.officerId });

    const result = await this.foundryClient.query('foundry-mcp-bridge.deleteGuardOfficer', args);

    if (result?.error) {
      return {
        content: [{ type: 'text', text: `Error deleting officer: ${result.error}` }],
      };
    }

    return {
      content: [{ type: 'text', text: `Officer ${args.officerId} deleted successfully.` }],
    };
  }

  async handleUpdateOfficer(args: any) {
    this.logger.debug('Updating guard officer', { officerId: args.officerId });

    const result = await this.foundryClient.query('foundry-mcp-bridge.updateGuardOfficer', args);

    if (result?.error) {
      return {
        content: [{ type: 'text', text: `Error updating officer: ${result.error}` }],
      };
    }

    const o = result.officer;
    return {
      content: [
        {
          type: 'text',
          text: `Officer updated.\nName: ${o.actorName}\nTitle: ${o.title}\nImg: ${o.actorImg || '(none)'}`,
        },
      ],
    };
  }

  // ── New manager handlers ───────────────────────────────────────────────

  async handleOrganizationsList(_args: any) {
    return this.json(await this.query('guard-management.organizations.list'));
  }
  async handleOrganizationsGet(args: any) {
    return this.json(await this.query('guard-management.organizations.get', args));
  }
  async handleOrganizationsCreate(args: any) {
    return this.json(await this.query('guard-management.organizations.create', args));
  }
  async handleOrganizationsUpdate(args: any) {
    return this.json(await this.query('guard-management.organizations.update', args));
  }
  async handleOrganizationsDelete(args: any) {
    return this.json(await this.query('guard-management.organizations.delete', args));
  }

  async handlePatrolsList(_args: any) {
    return this.json(await this.query('guard-management.patrols.list'));
  }
  async handlePatrolsCreate(args: any) {
    return this.json(await this.query('guard-management.patrols.create', args));
  }
  async handlePatrolsUpdate(args: any) {
    return this.json(await this.query('guard-management.patrols.update', args));
  }
  async handlePatrolsDelete(args: any) {
    return this.json(await this.query('guard-management.patrols.delete', args));
  }

  async handleResourcesList(_args: any) {
    return this.json(await this.query('guard-management.resources.list'));
  }
  async handleResourcesCreate(args: any) {
    return this.json(await this.query('guard-management.resources.create', args));
  }
  async handleResourcesUpdate(args: any) {
    return this.json(await this.query('guard-management.resources.update', args));
  }
  async handleResourcesDelete(args: any) {
    return this.json(await this.query('guard-management.resources.delete', args));
  }

  async handleReputationsList(_args: any) {
    return this.json(await this.query('guard-management.reputations.list'));
  }
  async handleReputationsCreate(args: any) {
    return this.json(await this.query('guard-management.reputations.create', args));
  }
  async handleReputationsUpdate(args: any) {
    return this.json(await this.query('guard-management.reputations.update', args));
  }
  async handleReputationsDelete(args: any) {
    return this.json(await this.query('guard-management.reputations.delete', args));
  }

  async handleCrimesList(_args: any) {
    return this.json(await this.query('guard-management.crimes.list'));
  }
  async handleCrimesCreate(args: any) {
    return this.json(await this.query('guard-management.crimes.create', args));
  }
  async handleCrimesUpdate(args: any) {
    return this.json(await this.query('guard-management.crimes.update', args));
  }
  async handleCrimesDelete(args: any) {
    return this.json(await this.query('guard-management.crimes.delete', args));
  }

  async handleGangsList(_args: any) {
    return this.json(await this.query('guard-management.gangs.list'));
  }
  async handleGangsCreate(args: any) {
    return this.json(await this.query('guard-management.gangs.create', args));
  }
  async handleGangsUpdate(args: any) {
    return this.json(await this.query('guard-management.gangs.update', args));
  }
  async handleGangsDelete(args: any) {
    return this.json(await this.query('guard-management.gangs.delete', args));
  }

  async handlePoisList(_args: any) {
    return this.json(await this.query('guard-management.pois.list'));
  }
  async handlePoisCreate(args: any) {
    return this.json(await this.query('guard-management.pois.create', args));
  }
  async handlePoisUpdate(args: any) {
    return this.json(await this.query('guard-management.pois.update', args));
  }
  async handlePoisDelete(args: any) {
    return this.json(await this.query('guard-management.pois.delete', args));
  }

  async handlePrisonersList(_args: any) {
    return this.json(await this.query('guard-management.prisoners.list'));
  }
  async handlePrisonersCreate(args: any) {
    return this.json(await this.query('guard-management.prisoners.create', args));
  }
  async handlePrisonersUpdate(args: any) {
    return this.json(await this.query('guard-management.prisoners.update', args));
  }
  async handlePrisonersDelete(args: any) {
    return this.json(await this.query('guard-management.prisoners.delete', args));
  }

  async handleBuildingsList(_args: any) {
    return this.json(await this.query('guard-management.buildings.list'));
  }
  async handleBuildingsCreate(args: any) {
    return this.json(await this.query('guard-management.buildings.create', args));
  }
  async handleBuildingsUpdate(args: any) {
    return this.json(await this.query('guard-management.buildings.update', args));
  }
  async handleBuildingsDelete(args: any) {
    return this.json(await this.query('guard-management.buildings.delete', args));
  }
  async handleBuildingsActivate(args: any) {
    return this.json(await this.query('guard-management.buildings.activate', args));
  }
  async handleBuildingsDeactivate(args: any) {
    return this.json(await this.query('guard-management.buildings.deactivate', args));
  }
  async handleBuildingsSetHidden(args: any) {
    return this.json(await this.query('guard-management.buildings.setHidden', args));
  }

  async handleFinanceGet(_args: any) {
    return this.json(await this.query('guard-management.finance.get'));
  }
  async handleFinanceUpdate(args: any) {
    return this.json(await this.query('guard-management.finance.update', args));
  }

  async handlePhaseGet(_args: any) {
    return this.json(await this.query('guard-management.phase.get'));
  }
  async handlePhaseAdvance(_args: any) {
    return this.json(await this.query('guard-management.phase.advance'));
  }

  async handlePhaseEventsList(_args: any) {
    return this.json(await this.query('guard-management.phaseEvents.list'));
  }
  async handlePhaseEventsGet(args: any) {
    return this.json(await this.query('guard-management.phaseEvents.get', args));
  }
  async handlePhaseEventsSearch(args: any) {
    return this.json(await this.query('guard-management.phaseEvents.search', args));
  }
  async handlePhaseEventsCreate(args: any) {
    return this.json(await this.query('guard-management.phaseEvents.create', args));
  }
  async handlePhaseEventsUpdate(args: any) {
    return this.json(await this.query('guard-management.phaseEvents.update', args));
  }
  async handlePhaseEventsCancel(args: any) {
    return this.json(await this.query('guard-management.phaseEvents.cancel', args));
  }
  async handlePhaseEventsDelete(args: any) {
    return this.json(await this.query('guard-management.phaseEvents.delete', args));
  }

  async handlePhaseReportsList(_args: any) {
    return this.json(await this.query('guard-management.phaseReports.list'));
  }
  async handlePhaseReportsGet(args: any) {
    return this.json(await this.query('guard-management.phaseReports.get', args));
  }
  async handlePhaseReportsSearch(args: any) {
    return this.json(await this.query('guard-management.phaseReports.search', args));
  }

  // ── Decisions ──────────────────────────────────────────────────────────
  async handleDecisionsList(_args: any) {
    return this.json(await this.query('guard-management.decisions.list'));
  }
  async handleDecisionsCreate(args: any) {
    return this.json(await this.query('guard-management.decisions.create', args));
  }
  async handleDecisionsUpdate(args: any) {
    return this.json(await this.query('guard-management.decisions.update', args));
  }
  async handleDecisionsDelete(args: any) {
    return this.json(await this.query('guard-management.decisions.delete', args));
  }

  // ── Decision Sections ──────────────────────────────────────────────────
  async handleDecisionSectionsList(_args: any) {
    return this.json(await this.query('guard-management.decisions.sections.list'));
  }
  async handleDecisionSectionsCreate(args: any) {
    return this.json(await this.query('guard-management.decisions.sections.create', args));
  }
  async handleDecisionSectionsUpdate(args: any) {
    return this.json(await this.query('guard-management.decisions.sections.update', args));
  }
  async handleDecisionSectionsDelete(args: any) {
    return this.json(await this.query('guard-management.decisions.sections.delete', args));
  }

  // ── Abilities / Favors ─────────────────────────────────────────────────
  async handleAbilitiesList(_args: any) {
    return this.json(await this.query('guard-management.abilities.list'));
  }
  async handleAbilitiesCreate(args: any) {
    return this.json(await this.query('guard-management.abilities.create', args));
  }
  async handleAbilitiesUpdate(args: any) {
    return this.json(await this.query('guard-management.abilities.update', args));
  }
  async handleAbilitiesDelete(args: any) {
    return this.json(await this.query('guard-management.abilities.delete', args));
  }
}
