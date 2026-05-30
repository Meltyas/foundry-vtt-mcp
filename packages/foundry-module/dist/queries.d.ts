import { FoundryDataAccess } from './data-access.js';
export declare class QueryHandlers {
    dataAccess: FoundryDataAccess;
    private comfyuiManager;
    constructor();
    /**
     * SECURITY: Validate GM access - returns silent failure for non-GM users
     */
    private validateGMAccess;
    /**
     * Register all query handlers in CONFIG.queries
     */
    registerHandlers(): void;
    /**
     * Unregister all query handlers
     */
    unregisterHandlers(): void;
    /**
     * Handle query requests from other parts of the module
     */
    handleQuery(queryName: string, data: any): Promise<any>;
    /**
     * Handle character information request
     */
    private handleGetCharacterInfo;
    /**
     * Handle list actors request
     */
    private handleListActors;
    /**
     * Handle compendium search request
     */
    private handleSearchCompendium;
    /**
     * Handle list creatures by criteria request
     */
    private handleListCreaturesByCriteria;
    /**
     * Handle get available packs request
     */
    private handleGetAvailablePacks;
    /**
     * Handle get active scene request
     */
    private handleGetActiveScene;
    /**
     * Handle get world info request
     */
    private handleGetWorldInfo;
    /**
     * Handle ping request
     */
    private handlePing;
    /**
     * Get list of all registered query methods
     */
    getRegisteredMethods(): string[];
    /**
     * Test if a specific query handler is registered
     */
    isMethodRegistered(method: string): boolean;
    /**
     * Handle actor creation from specific compendium entry
     */
    private handleCreateActorFromCompendium;
    /**
     * Handle get compendium document full request
     */
    private handleGetCompendiumDocumentFull;
    /**
     * Handle add actors to scene request
     */
    private handleAddActorsToScene;
    /**
     * Handle validate write permissions request
     */
    private handleValidateWritePermissions;
    /**
     * Handle journal entry creation
     */
    handleCreateJournalEntry(data: any): Promise<any>;
    /**
     * Handle list journals request
     */
    handleListJournals(): Promise<any>;
    /**
     * Handle get journal content request
     */
    handleGetJournalContent(data: {
        journalId: string;
    }): Promise<any>;
    /**
     * Handle get specific journal page content request
     */
    handleGetJournalPageContent(data: {
        journalId: string;
        pageId: string;
    }): Promise<any>;
    /**
     * Handle update journal content request
     */
    handleUpdateJournalContent(data: {
        journalId: string;
        content: string;
        pageId?: string;
        newPageName?: string;
    }): Promise<any>;
    /**
     * Handle request player rolls - creates interactive roll buttons in chat
     */
    handleRequestPlayerRolls(data: {
        rollType: string;
        rollTarget: string;
        targetPlayer: string;
        isPublic: boolean;
        rollModifier: string;
        flavor: string;
    }): Promise<any>;
    /**
     * Handle get enhanced creature index request
     */
    handleGetEnhancedCreatureIndex(): Promise<any>;
    /**
     * Handle campaign progress update request
     */
    handleUpdateCampaignProgress(data: {
        campaignId: string;
        partId: string;
        newStatus: string;
    }): Promise<any>;
    /**
     * Handle set actor ownership request
     */
    handleSetActorOwnership(data: any): Promise<any>;
    /**
     * Handle get actor ownership request
     */
    handleGetActorOwnership(data: any): Promise<any>;
    /**
     * Handle get friendly NPCs request
     */
    handleGetFriendlyNPCs(): Promise<any>;
    /**
     * Handle get party characters request
     */
    handleGetPartyCharacters(): Promise<any>;
    /**
     * Handle get connected players request
     */
    handleGetConnectedPlayers(): Promise<any>;
    /**
     * Handle find players request
     */
    handleFindPlayers(data: any): Promise<any>;
    /**
     * Handle find actor request
     */
    handleFindActor(data: any): Promise<any>;
    /**
     * Handle list scenes request
     */
    private handleListScenes;
    /**
     * Handle switch scene request
     */
    private handleSwitchScene;
    /**
     * Handle map generation request - uses hybrid architecture
     */
    private handleGenerateMap;
    /**
     * Handle map status check request - uses hybrid architecture
     */
    private handleCheckMapStatus;
    /**
     * Handle map job cancellation request - uses hybrid architecture
     */
    private handleCancelMapJob;
    /**
     * Handle upload of generated map image (for remote Foundry instances)
     * Receives base64-encoded image data and saves it to generated-maps folder
     */
    private handleUploadGeneratedMap;
    /**
     * Handle move token request
     */
    private handleMoveToken;
    /**
     * Handle update token request
     */
    private handleUpdateToken;
    /**
     * Handle delete tokens request
     */
    private handleDeleteTokens;
    /**
     * Handle get token details request
     */
    private handleGetTokenDetails;
    /**
     * Handle toggle token condition request
     */
    private handleToggleTokenCondition;
    /**
     * Handle get available conditions request
     */
    private handleGetAvailableConditions;
    /**
     * Handle use item request (cast spell, use ability, consume item, etc.)
     */
    private handleUseItem;
    /**
     * Handle search character items request
     */
    private handleSearchCharacterItems;
    /**
     * Handle create world-level items request
     */
    private handleCreateWorldItems;
    /**
     * Handle list world-level items request
     */
    private handleListWorldItems;
    /**
     * Handle update world-level items request
     */
    private handleUpdateWorldItems;
    private handleAddActorItems;
}
//# sourceMappingURL=queries.d.ts.map