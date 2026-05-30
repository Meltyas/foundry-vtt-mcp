import { FoundryClient } from '../../foundry-client.js';
import { Logger } from '../../logger.js';
export interface DSA5CharacterCreatorOptions {
    foundryClient: FoundryClient;
    logger: Logger;
}
/**
 * DSA5 Character Creator
 *
 * Handles creation of DSA5 characters from archetypes with customization options.
 * Supports archetype-based creation with name, age, biography, and other customizations.
 */
export declare class DSA5CharacterCreator {
    private foundryClient;
    private logger;
    private errorHandler;
    constructor({ foundryClient, logger }: DSA5CharacterCreatorOptions);
    /**
     * Tool definitions for DSA5 character creation
     */
    getToolDefinitions(): ({
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                archetypePackId: {
                    type: string;
                    description: string;
                };
                archetypeId: {
                    type: string;
                    description: string;
                };
                characterName: {
                    type: string;
                    description: string;
                };
                customization: {
                    type: string;
                    description: string;
                    properties: {
                        age: {
                            type: string;
                            description: string;
                            minimum: number;
                            maximum: number;
                        };
                        biography: {
                            type: string;
                            description: string;
                        };
                        gender: {
                            type: string;
                            description: string;
                            enum: string[];
                        };
                        eyeColor: {
                            type: string;
                            description: string;
                        };
                        hairColor: {
                            type: string;
                            description: string;
                        };
                        height: {
                            type: string;
                            description: string;
                        };
                        weight: {
                            type: string;
                            description: string;
                        };
                        species: {
                            type: string;
                            description: string;
                        };
                        culture: {
                            type: string;
                            description: string;
                        };
                        profession: {
                            type: string;
                            description: string;
                        };
                    };
                };
                addToWorld: {
                    type: string;
                    description: string;
                    default: boolean;
                };
                packId?: never;
                filterBySpecies?: never;
                filterByProfession?: never;
            };
            required: string[];
        };
    } | {
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                packId: {
                    type: string;
                    description: string;
                };
                filterBySpecies: {
                    type: string;
                    description: string;
                };
                filterByProfession: {
                    type: string;
                    description: string;
                };
                archetypePackId?: never;
                archetypeId?: never;
                characterName?: never;
                customization?: never;
                addToWorld?: never;
            };
            required?: never;
        };
    })[];
    /**
     * Handle DSA5 character creation from archetype
     */
    handleCreateCharacterFromArchetype(args: any): Promise<any>;
    /**
     * Handle listing DSA5 archetypes
     */
    handleListArchetypes(args: any): Promise<any>;
    /**
     * Prepare character data with customizations
     */
    private prepareCharacterData;
    /**
     * Format character creation response
     */
    private formatCharacterCreationResponse;
    /**
     * Format archetype list response
     */
    private formatArchetypeListResponse;
}
