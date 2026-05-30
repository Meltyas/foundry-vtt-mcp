import { FoundryClient } from '../foundry-client.js';
import { Logger } from '../logger.js';
import { SystemRegistry } from '../systems/system-registry.js';
export interface CharacterToolsOptions {
    foundryClient: FoundryClient;
    logger: Logger;
    systemRegistry?: SystemRegistry;
}
export declare class CharacterTools {
    private foundryClient;
    private logger;
    private systemRegistry;
    private cachedGameSystem;
    constructor({ foundryClient, logger, systemRegistry }: CharacterToolsOptions);
    /**
     * Get or detect the game system (cached)
     */
    private getGameSystem;
    /**
     * Resolve the active SystemAdapter, if any. Looks up by the raw
     * Foundry system id first (so adapters whose id isn't part of the
     * narrow `GameSystem` enum — e.g. 'dsa5', 'cosmere-rpg' — still
     * resolve), then falls back to the normalised GameSystem.
     */
    private getAdapter;
    /**
     * Tool: get-character
     * Retrieve detailed information about a specific character
     */
    getToolDefinitions(): ({
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                identifier: {
                    type: string;
                    description: string;
                };
                characterIdentifier?: never;
                entityIdentifier?: never;
                type?: never;
                actorIdentifier?: never;
                itemIdentifier?: never;
                targets?: never;
                consume?: never;
                spellLevel?: never;
                action?: never;
                items?: never;
                updates?: never;
                folder?: never;
                nameFilter?: never;
                query?: never;
                category?: never;
                limit?: never;
            };
            required: string[];
        };
    } | {
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                characterIdentifier: {
                    type: string;
                    description: string;
                };
                entityIdentifier: {
                    type: string;
                    description: string;
                };
                identifier?: never;
                type?: never;
                actorIdentifier?: never;
                itemIdentifier?: never;
                targets?: never;
                consume?: never;
                spellLevel?: never;
                action?: never;
                items?: never;
                updates?: never;
                folder?: never;
                nameFilter?: never;
                query?: never;
                category?: never;
                limit?: never;
            };
            required: string[];
        };
    } | {
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                type: {
                    type: string;
                    description: string;
                };
                identifier?: never;
                characterIdentifier?: never;
                entityIdentifier?: never;
                actorIdentifier?: never;
                itemIdentifier?: never;
                targets?: never;
                consume?: never;
                spellLevel?: never;
                action?: never;
                items?: never;
                updates?: never;
                folder?: never;
                nameFilter?: never;
                query?: never;
                category?: never;
                limit?: never;
            };
            required?: never;
        };
    } | {
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                actorIdentifier: {
                    type: string;
                    description: string;
                };
                itemIdentifier: {
                    type: string;
                    description: string;
                };
                targets: {
                    type: string;
                    items: {
                        type: string;
                    };
                    description: string;
                };
                consume: {
                    type: string;
                    description: string;
                };
                spellLevel: {
                    type: string;
                    description: string;
                };
                identifier?: never;
                characterIdentifier?: never;
                entityIdentifier?: never;
                type?: never;
                action?: never;
                items?: never;
                updates?: never;
                folder?: never;
                nameFilter?: never;
                query?: never;
                category?: never;
                limit?: never;
            };
            required: string[];
        };
    } | {
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                action: {
                    type: string;
                    enum: string[];
                    description: string;
                };
                items: {
                    type: string;
                    minItems: number;
                    description: string;
                    items: {
                        type: string;
                        properties: {
                            name: {
                                type: string;
                                description: string;
                            };
                            type: {
                                type: string;
                                description: string;
                            };
                            img: {
                                type: string;
                                description: string;
                            };
                            system: {
                                type: string;
                                description: string;
                                additionalProperties: boolean;
                            };
                        };
                        required: string[];
                    };
                };
                updates: {
                    type: string;
                    minItems: number;
                    description: string;
                    items: {
                        type: string;
                        properties: {
                            id: {
                                type: string;
                                description: string;
                            };
                            name: {
                                type: string;
                                description: string;
                            };
                            img: {
                                type: string;
                                description: string;
                            };
                            system: {
                                type: string;
                                description: string;
                                additionalProperties: boolean;
                            };
                            folder: {
                                type: string;
                                description: string;
                            };
                        };
                        required: string[];
                    };
                };
                folder: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                };
                nameFilter: {
                    type: string;
                    description: string;
                };
                actorIdentifier: {
                    type: string;
                    description: string;
                };
                identifier?: never;
                characterIdentifier?: never;
                entityIdentifier?: never;
                itemIdentifier?: never;
                targets?: never;
                consume?: never;
                spellLevel?: never;
                query?: never;
                category?: never;
                limit?: never;
            };
            required: string[];
        };
    } | {
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                characterIdentifier: {
                    type: string;
                    description: string;
                };
                query: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                };
                category: {
                    type: string;
                    description: string;
                };
                limit: {
                    type: string;
                    description: string;
                };
                identifier?: never;
                entityIdentifier?: never;
                actorIdentifier?: never;
                itemIdentifier?: never;
                targets?: never;
                consume?: never;
                spellLevel?: never;
                action?: never;
                items?: never;
                updates?: never;
                folder?: never;
                nameFilter?: never;
            };
            required: string[];
        };
    })[];
    handleGetCharacter(args: any): Promise<any>;
    handleGetCharacterEntity(args: any): Promise<any>;
    handleListCharacters(args: any): Promise<any>;
    handleUseItem(args: any): Promise<any>;
    handleAddActorItems(args: any): Promise<any>;
    handleUpdateWorldItems(args: any): Promise<any>;
    handleListWorldItems(args: any): Promise<any>;
    handleCreateWorldItems(args: any): Promise<any>;
    handleManageWorldItems(args: any): Promise<any>;
    handleSearchCharacterItems(args: any): Promise<any>;
    private formatCharacterResponse;
    private formatSpellcasting;
    private formatActions;
    private extractBasicInfo;
    private extractStats;
    private formatItems;
    private formatEffects;
    private truncateText;
}
