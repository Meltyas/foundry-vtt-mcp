/**
 * Mac Setup Tools - Check status and run ComfyUI auto-installer
 */
import { Logger } from '../logger.js';
export declare class MacSetupTools {
    private logger;
    private installer;
    private setupInProgress;
    private lastProgress?;
    constructor(logger: Logger);
    getTools(): ({
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                skip_comfyui?: never;
                skip_model?: never;
            };
            required: never[];
        };
    } | {
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                skip_comfyui: {
                    type: string;
                    description: string;
                };
                skip_model: {
                    type: string;
                    description: string;
                };
            };
            required: never[];
        };
    })[];
    handleToolCall(toolName: string, args: any): Promise<any>;
    private checkSetupStatus;
    private runSetup;
    private getSetupProgress;
}
