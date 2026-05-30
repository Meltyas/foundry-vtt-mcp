import { FoundryClient } from '../foundry-client.js';
import { Logger } from '../logger.js';
import { SystemRegistry } from '../systems/system-registry.js';
export interface CompendiumToolsOptions {
    foundryClient: FoundryClient;
    logger: Logger;
    systemRegistry?: SystemRegistry;
}
export declare class CompendiumTools {
    private foundryClient;
    private logger;
    private systemRegistry;
    private gameSystem;
    constructor({ foundryClient, logger, systemRegistry }: CompendiumToolsOptions);
    /**
     * Get or detect the game system (cached)
     */
    private getGameSystem;
    /**
     * Tool definitions for compendium operations
     */
    getToolDefinitions(): ({
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                query: {
                    type: string;
                    description: string;
                };
                packType: {
                    type: string;
                    description: string;
                };
                filters: {
                    type: string;
                    description: string;
                    properties: {
                        challengeRating: {
                            oneOf: ({
                                type: string;
                                description: string;
                                properties?: never;
                            } | {
                                type: string;
                                properties: {
                                    min: {
                                        type: string;
                                        description: string;
                                    };
                                    max: {
                                        type: string;
                                        description: string;
                                    };
                                };
                                description?: never;
                            })[];
                        };
                        creatureType: {
                            type: string;
                            description: string;
                            enum: string[];
                        };
                        size: {
                            type: string;
                            description: string;
                            enum: string[];
                        };
                        alignment: {
                            type: string;
                            description: string;
                        };
                        hasLegendaryActions: {
                            type: string;
                            description: string;
                        };
                        spellcaster: {
                            type: string;
                            description: string;
                        };
                        level: {
                            oneOf: ({
                                type: string;
                                description: string;
                                properties?: never;
                            } | {
                                type: string;
                                properties: {
                                    min: {
                                        type: string;
                                        description: string;
                                    };
                                    max: {
                                        type: string;
                                        description: string;
                                    };
                                };
                                description?: never;
                            })[];
                            description: string;
                        };
                        traits: {
                            type: string;
                            items: {
                                type: string;
                            };
                            description: string;
                        };
                        rarity: {
                            type: string;
                            enum: string[];
                            description: string;
                        };
                        hasSpells: {
                            type: string;
                            description: string;
                        };
                    };
                };
                limit: {
                    type: string;
                    description: string;
                    minimum: number;
                    maximum: number;
                    default?: never;
                };
                packId?: never;
                itemId?: never;
                compact?: never;
                challengeRating?: never;
                creatureType?: never;
                size?: never;
                hasSpells?: never;
                hasLegendaryActions?: never;
                level?: never;
                traits?: never;
                rarity?: never;
                tier?: never;
                role?: never;
                hasInvestiture?: never;
                hitPoints?: never;
                defensesMin?: never;
                deflectMin?: never;
                type?: never;
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
                itemId: {
                    type: string;
                    description: string;
                };
                compact: {
                    type: string;
                    description: string;
                    default: boolean;
                };
                query?: never;
                packType?: never;
                filters?: never;
                limit?: never;
                challengeRating?: never;
                creatureType?: never;
                size?: never;
                hasSpells?: never;
                hasLegendaryActions?: never;
                level?: never;
                traits?: never;
                rarity?: never;
                tier?: never;
                role?: never;
                hasInvestiture?: never;
                hitPoints?: never;
                defensesMin?: never;
                deflectMin?: never;
                type?: never;
            };
            required: string[];
        };
    } | {
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                challengeRating: {
                    oneOf: ({
                        type: string;
                        description: string;
                        properties?: never;
                    } | {
                        type: string;
                        properties: {
                            min: {
                                type: string;
                                description: string;
                            };
                            max: {
                                type: string;
                                description: string;
                            };
                        };
                        description: string;
                    })[];
                    description: string;
                };
                creatureType: {
                    type: string;
                    description: string;
                    enum: string[];
                };
                size: {
                    type: string;
                    description: string;
                    enum: string[];
                };
                hasSpells: {
                    type: string;
                    description: string;
                };
                hasLegendaryActions: {
                    type: string;
                    description: string;
                };
                level: {
                    oneOf: ({
                        type: string;
                        description: string;
                        properties?: never;
                    } | {
                        type: string;
                        properties: {
                            min: {
                                type: string;
                                description: string;
                            };
                            max: {
                                type: string;
                                description: string;
                            };
                        };
                        description: string;
                    })[];
                    description: string;
                };
                traits: {
                    type: string;
                    items: {
                        type: string;
                    };
                    description: string;
                };
                rarity: {
                    type: string;
                    enum: string[];
                    description: string;
                };
                tier: {
                    oneOf: ({
                        type: string;
                        description: string;
                        properties?: never;
                    } | {
                        type: string;
                        properties: {
                            min: {
                                type: string;
                                description: string;
                            };
                            max: {
                                type: string;
                                description: string;
                            };
                        };
                        description: string;
                    })[];
                    description: string;
                };
                role: {
                    type: string;
                    description: string;
                };
                hasInvestiture: {
                    type: string;
                    description: string;
                };
                hitPoints: {
                    oneOf: ({
                        type: string;
                        description: string;
                        properties?: never;
                    } | {
                        type: string;
                        properties: {
                            min: {
                                type: string;
                            };
                            max: {
                                type: string;
                            };
                        };
                        description: string;
                    })[];
                    description: string;
                };
                defensesMin: {
                    type: string;
                    properties: {
                        phy: {
                            type: string;
                            description: string;
                        };
                        cog: {
                            type: string;
                            description: string;
                        };
                        spi: {
                            type: string;
                            description: string;
                        };
                    };
                    additionalProperties: boolean;
                    description: string;
                };
                deflectMin: {
                    type: string;
                    description: string;
                };
                limit: {
                    type: string;
                    description: string;
                    minimum: number;
                    maximum: number;
                    default: number;
                };
                query?: never;
                packType?: never;
                filters?: never;
                packId?: never;
                itemId?: never;
                compact?: never;
                type?: never;
            };
            required: never[];
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
                query?: never;
                packType?: never;
                filters?: never;
                limit?: never;
                packId?: never;
                itemId?: never;
                compact?: never;
                challengeRating?: never;
                creatureType?: never;
                size?: never;
                hasSpells?: never;
                hasLegendaryActions?: never;
                level?: never;
                traits?: never;
                rarity?: never;
                tier?: never;
                role?: never;
                hasInvestiture?: never;
                hitPoints?: never;
                defensesMin?: never;
                deflectMin?: never;
            };
            required?: never;
        };
    })[];
    handleSearchCompendium(args: any): Promise<any>;
    handleGetCompendiumItem(args: any): Promise<any>;
    handleListCreaturesByCriteria(args: any): Promise<any>;
    handleListCompendiumPacks(args: any): Promise<any>;
    private formatCompendiumItem;
    private formatDetailedCompendiumItem;
    private extractDescription;
    private extractFullDescription;
    private createItemSummary;
    private formatCreatureListItem;
    /**
     * Helper method to describe criteria in human-readable format
     */
    private describeCriteria;
    private extractCompactStats;
    private extractItemProperties;
    private sanitizeSystemData;
    private stripHtml;
    private truncateText;
}
