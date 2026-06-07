import { FoundryClient } from '../foundry-client.js';
import { Logger } from '../logger.js';

export interface ActorManagementToolsOptions {
  foundryClient: FoundryClient;
  logger: Logger;
}

export class ActorManagementTools {
  private foundryClient: FoundryClient;
  private logger: Logger;

  constructor({ foundryClient, logger }: ActorManagementToolsOptions) {
    this.foundryClient = foundryClient;
    this.logger = logger.child({ component: 'ActorManagementTools' });
  }

  getToolDefinitions() {
    return [
      {
        name: 'create-actor',
        description:
          'Create a new Foundry actor with a given name, type, image, and system data. Returns the new actor ID.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Actor name' },
            type: {
              type: 'string',
              description: 'Actor type (e.g. "adversary", "character", "npc")',
            },
            img: {
              type: 'string',
              description: 'Portrait image path relative to Foundry Data root (e.g. "worlds/my-world/npcs/eira.png")',
            },
            system: {
              type: 'object',
              description: 'System-specific data (free-form, passed directly to the Foundry DataModel)',
              additionalProperties: true,
            },
          },
          required: ['name', 'type'],
        },
      },
      {
        name: 'create-actor-folder',
        description:
          'Create a folder (and optional parent folder) for Actors in Foundry. Returns the folder ID. Use move-actor-to-folder to assign actors.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Folder name to create (e.g. "Reclutables")' },
            parentName: {
              type: 'string',
              description: 'Optional parent folder name (e.g. "Oficiales"). Created if not found.',
            },
            type: {
              type: 'string',
              description: 'Foundry document type for the folder (default: "Actor")',
              default: 'Actor',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'move-actor-to-folder',
        description: 'Move an existing actor into a folder. Use create-actor-folder first to get the folderId.',
        inputSchema: {
          type: 'object',
          properties: {
            actorId: { type: 'string', description: 'ID of the actor to move' },
            folderId: { type: 'string', description: 'ID of the target folder' },
          },
          required: ['actorId', 'folderId'],
        },
      },
      {
        name: 'update-actor-items',
        description:
          'Update embedded items (features, weapons, spells) on an existing actor. Use get-character to get item IDs first.',
        inputSchema: {
          type: 'object',
          properties: {
            actorId: { type: 'string', description: 'ID of the actor' },
            items: {
              type: 'array',
              description: 'Array of item patches. Each must include _id plus fields to change.',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string', description: 'Item ID to update' },
                  name: { type: 'string' },
                  img: { type: 'string' },
                  system: { type: 'object', additionalProperties: true },
                },
                required: ['_id'],
              },
            },
          },
          required: ['actorId', 'items'],
        },
      },
      {
        name: 'fix-item-actions',
        description:
          'Fix a Daggerheart feature item with corrupt/invalid actions (Action._id undefined error). Clears system.actions via actor._source, bypassing embedded-collection validation. Use when an item fails to initialize on Foundry load.',
        inputSchema: {
          type: 'object',
          properties: {
            actorId: { type: 'string', description: 'ID of the actor' },
            itemId: { type: 'string', description: 'ID of the corrupt feature item' },
          },
          required: ['actorId', 'itemId'],
        },
      },
      {
        name: 'create-item-action',
        description:
          'Create an attack/action inside a Daggerheart feature item\'s Actions tab. Use this instead of update-actor-items when adding a clickable attack roll to a feature. Requires actorId, itemId, and actionData with type ("attack"), name, range ("veryClose"|"close"|"far"), and damage.',
        inputSchema: {
          type: 'object',
          properties: {
            actorId: { type: 'string', description: 'ID of the actor' },
            itemId: { type: 'string', description: 'ID of the feature item to add the action to' },
            actionData: {
              type: 'object',
              description: 'Action configuration. Required: type ("attack"), name, range. Optional: damage parts, roll config, save config.',
              additionalProperties: true,
            },
          },
          required: ['actorId', 'itemId', 'actionData'],
        },
      },
      {
        name: 'repair-item-actions',
        description:
          'Fix duplicate actions on a Daggerheart feature item by deleting the item and recreating it with exactly one action. Use when a feature has multiple identical attack entries. Preserves item _id, name, description and all other data. Deletion via update API is broken in Daggerheart V14. Pass force:true to force recreate even if the item already has only 1 action (use to fix key/id mismatches that cause ".sheet null" crashes).',
        inputSchema: {
          type: 'object',
          properties: {
            actorId: { type: 'string', description: 'ID of the actor' },
            itemId: { type: 'string', description: 'ID of the feature item with duplicate actions' },
            force: { type: 'boolean', description: 'If true, recreate the item even if it already has ≤1 action (fixes Map key vs action._id mismatches)' },
          },
          required: ['actorId', 'itemId'],
        },
      },
      {
        name: 'get-item-actions',
        description:
          'Read the real action IDs currently on a Daggerheart feature item directly from Foundry memory. Use this before delete-item-actions to discover which IDs exist (get-character-entity does NOT serialize system.actions reliably).',
        inputSchema: {
          type: 'object',
          properties: {
            actorId: { type: 'string', description: 'ID of the actor' },
            itemId: { type: 'string', description: 'ID of the feature item' },
          },
          required: ['actorId', 'itemId'],
        },
      },
      {
        name: 'delete-item-actions',
        description:
          'Delete specific attack actions from a Daggerheart feature item by ID. Pass actionIds array with the IDs to remove. Use get-item-actions first to list current IDs, then pass all EXCEPT the one you want to keep. Do NOT use clearAll — it uses a different code path that does not persist to LevelDB.',
        inputSchema: {
          type: 'object',
          properties: {
            actorId: { type: 'string', description: 'ID of the actor' },
            itemId: { type: 'string', description: 'ID of the feature item' },
            actionIds: {
              type: 'array',
              items: { type: 'string' },
              description: 'IDs of specific actions to delete. Pass all IDs except the one to keep.',
            },
          },
          required: ['actorId', 'itemId', 'actionIds'],
        },
      },
      {
        name: 'update-actor',
        description:
          'Update properties of an existing Foundry actor (img, name, system data, biography, etc.). Use list-characters first to get the actorId. Pass folderPath ("Parent/Child") to move the actor into a nested folder, creating it if needed.',
        inputSchema: {
          type: 'object',
          properties: {
            actorId: {
              type: 'string',
              description: 'ID of the actor to update',
            },
            updates: {
              type: 'object',
              description:
                'Fields to update on the actor. Common fields: img (portrait path), name, "system.details.biography.value" (for biography HTML). Any valid Foundry actor update path is accepted.',
              additionalProperties: true,
            },
            folderPath: {
              type: 'string',
              description: 'Optional folder path like "Oficiales/Reclutables". Creates the folder hierarchy if needed and moves the actor there.',
            },
          },
          required: ['actorId', 'updates'],
        },
      },
      {
        name: 'add-actor-to-scene',
        description:
          'Add an existing actor to the currently active scene as a token. Returns the new token ID and its position.',
        inputSchema: {
          type: 'object',
          properties: {
            actorId: {
              type: 'string',
              description: 'ID of the actor to place as a token',
            },
            x: {
              type: 'number',
              description: 'X coordinate in pixels (defaults to scene center)',
            },
            y: {
              type: 'number',
              description: 'Y coordinate in pixels (defaults to scene center)',
            },
          },
          required: ['actorId'],
        },
      },
    ];
  }

  async handleCreateActorFolder(args: any) {
    const result = await this.foundryClient.query('foundry-mcp-bridge.createFolder', args);
    if (result?.error) throw new Error(`Error creating folder: ${result.error}`);
    return {
      content: [{ type: 'text', text: `Folder created.\nID: ${result.folderId}\nName: ${result.name}\nParentId: ${result.parentId || '(root)'}` }],
    };
  }

  async handleMoveActorToFolder(args: any) {
    const result = await this.foundryClient.query('foundry-mcp-bridge.moveActorToFolder', args);
    if (result?.error) throw new Error(`Error moving actor: ${result.error}`);
    return {
      content: [{ type: 'text', text: `Actor ${args.actorId} moved to folder ${args.folderId}.` }],
    };
  }

  async handleUpdateActorItems(args: any) {
    const result = await this.foundryClient.query('foundry-mcp-bridge.updateActorItems', args);
    if (result?.error) throw new Error(`Error updating actor items: ${result.error}`);
    return {
      content: [{ type: 'text', text: `Updated ${result.updated} item(s) on actor ${args.actorId}.` }],
    };
  }

  async handleFixItemActions(args: any) {
    const result = await this.foundryClient.query('foundry-mcp-bridge.fixItemActions', args);
    if (result?.error) throw new Error(`fix-item-actions failed: ${result.error}`);
    return { content: [{ type: 'text', text: `Fixed item ${args.itemId}: ${result.message}` }] };
  }

  async handleCreateItemAction(args: any) {
    const result = await this.foundryClient.query('foundry-mcp-bridge.createItemAction', args);
    if (result?.error) throw new Error(`Error creating item action: ${result.error}`);
    return {
      content: [{ type: 'text', text: `Action created on item ${args.itemId}. Action ID: ${result.actionId}` }],
    };
  }

  async handleRepairItemActions(args: any) {
    const result = await this.foundryClient.query('foundry-mcp-bridge.repairItemActions', args);
    if (result?.error) throw new Error(`repair-item-actions failed: ${result.error}`);
    if (result?.alreadyClean) return { content: [{ type: 'text', text: `Item ${args.itemId} already has ≤1 action — nothing to do. Pass force:true to recreate anyway.` }] };
    const keyInfo = result.canonicalKey !== undefined
      ? `\nMap key used: "${result.canonicalKey}"${result.originalKey !== result.canonicalKey ? ` (was "${result.originalKey}" — fixed mismatch!)` : ' (matches internal _id)'}`
      : '';
    return { content: [{ type: 'text', text: `Repaired item ${args.itemId}: removed ${result.removed} duplicate action(s). New ID: ${result.newId}${keyInfo}` }] };
  }

  async handleGetItemActions(args: any) {
    const result = await this.foundryClient.query('foundry-mcp-bridge.getItemActions', args);
    if (result?.error) throw new Error(`Error reading item actions: ${result.error}`);
    const lines = [`Item: ${result.itemName} (${result.itemId})`, `Total actions: ${result.count}`, ``];
    for (const [id, data] of Object.entries(result.actions as Record<string, any>)) {
      const mismatch = data.keyMatchesId === false ? ` ⚠️ KEY MISMATCH (internalId=${data.internalId})` : '';
      lines.push(`  mapKey="${id}" internalId="${data.internalId}" → ${data.name} (${data.type})${mismatch}`);
    }
    return { content: [{ type: 'text', text: lines.join('\n') }] };
  }

  async handleDeleteItemActions(args: any) {
    const result = await this.foundryClient.query('foundry-mcp-bridge.deleteItemActions', args);
    if (result?.error) throw new Error(`Error deleting item actions: ${result.error}`);
    return {
      content: [{ type: 'text', text: `Removed ${result.removed} action(s) from item ${args.itemId}. Remaining: ${result.remaining}.` }],
    };
  }

  async handleCreateActor(args: any) {
    this.logger.debug('Creating actor', { name: args.name, type: args.type });

    const result = await this.foundryClient.query('foundry-mcp-bridge.createActor', args);

    if (result?.error) {
      throw new Error(`Error creating actor: ${result.error}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: `Actor created.\nID: ${result.actorId}\nName: ${result.name}\nImg: ${result.img || '(none)'}`,
        },
      ],
    };
  }

  async handleUpdateActor(args: any) {
    this.logger.debug('Updating actor', { actorId: args.actorId });

    const result = await this.foundryClient.query('foundry-mcp-bridge.updateActor', args);

    if (result?.error) {
      return {
        content: [{ type: 'text', text: `Error updating actor: ${result.error}` }],
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: `Actor updated.\nID: ${result.actorId}\nName: ${result.name}\nImg: ${result.img || '(none)'}`,
        },
      ],
    };
  }

  async handleAddActorToScene(args: any) {
    this.logger.debug('Adding actor to scene', { actorId: args.actorId });

    const result = await this.foundryClient.query('foundry-mcp-bridge.addActorToScene', args);

    if (result?.error) {
      return {
        content: [{ type: 'text', text: `Error adding actor to scene: ${result.error}` }],
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: `Token placed in scene.\nToken ID: ${result.tokenId}\nActor ID: ${result.actorId}\nPosition: (${result.x}, ${result.y})`,
        },
      ],
    };
  }
}
