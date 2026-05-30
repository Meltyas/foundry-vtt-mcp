import { FoundryClient } from '../foundry-client.js';
import { Logger } from '../logger.js';
export interface TokenManipulationToolsOptions {
    foundryClient: FoundryClient;
    logger: Logger;
}
export declare class TokenManipulationTools {
    private foundryClient;
    private logger;
    constructor({ foundryClient, logger }: TokenManipulationToolsOptions);
    /**
     * Tool definitions for token manipulation operations
     */
    getToolDefinitions(): ({
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                tokenId: {
                    type: string;
                    description: string;
                };
                x: {
                    type: string;
                    description: string;
                };
                y: {
                    type: string;
                    description: string;
                };
                animate: {
                    type: string;
                    description: string;
                    default: boolean;
                };
                updates?: never;
                tokenIds?: never;
                conditionId?: never;
                active?: never;
            };
            required: string[];
        };
    } | {
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                tokenId: {
                    type: string;
                    description: string;
                };
                updates: {
                    type: string;
                    description: string;
                    properties: {
                        x: {
                            type: string;
                            description: string;
                        };
                        y: {
                            type: string;
                            description: string;
                        };
                        width: {
                            type: string;
                            description: string;
                        };
                        height: {
                            type: string;
                            description: string;
                        };
                        rotation: {
                            type: string;
                            description: string;
                        };
                        hidden: {
                            type: string;
                            description: string;
                        };
                        disposition: {
                            type: string;
                            description: string;
                            enum: number[];
                        };
                        name: {
                            type: string;
                            description: string;
                        };
                        elevation: {
                            type: string;
                            description: string;
                        };
                        lockRotation: {
                            type: string;
                            description: string;
                        };
                    };
                };
                x?: never;
                y?: never;
                animate?: never;
                tokenIds?: never;
                conditionId?: never;
                active?: never;
            };
            required: string[];
        };
    } | {
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                tokenIds: {
                    type: string;
                    description: string;
                    items: {
                        type: string;
                    };
                    minItems: number;
                };
                tokenId?: never;
                x?: never;
                y?: never;
                animate?: never;
                updates?: never;
                conditionId?: never;
                active?: never;
            };
            required: string[];
        };
    } | {
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                tokenId: {
                    type: string;
                    description: string;
                };
                x?: never;
                y?: never;
                animate?: never;
                updates?: never;
                tokenIds?: never;
                conditionId?: never;
                active?: never;
            };
            required: string[];
        };
    } | {
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                tokenId: {
                    type: string;
                    description: string;
                };
                conditionId: {
                    type: string;
                    description: string;
                };
                active: {
                    type: string;
                    description: string;
                };
                x?: never;
                y?: never;
                animate?: never;
                updates?: never;
                tokenIds?: never;
            };
            required: string[];
        };
    } | {
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                tokenId?: never;
                x?: never;
                y?: never;
                animate?: never;
                updates?: never;
                tokenIds?: never;
                conditionId?: never;
                active?: never;
            };
            required?: never;
        };
    })[];
    handleMoveToken(args: any): Promise<any>;
    handleUpdateToken(args: any): Promise<any>;
    handleDeleteTokens(args: any): Promise<any>;
    handleGetTokenDetails(args: any): Promise<any>;
    private formatTokenDetails;
    private getDispositionName;
    handleToggleTokenCondition(args: any): Promise<any>;
    handleGetAvailableConditions(args: any): Promise<any>;
}
