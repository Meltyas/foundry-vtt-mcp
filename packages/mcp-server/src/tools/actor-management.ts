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
