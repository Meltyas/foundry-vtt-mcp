import { MODULE_ID } from './constants.js';
import { FoundryDataAccess } from './data-access.js';
import { ComfyUIManager } from './comfyui-manager.js';
export class QueryHandlers {
    dataAccess;
    comfyuiManager;
    constructor() {
        this.dataAccess = new FoundryDataAccess();
        this.comfyuiManager = new ComfyUIManager();
    }
    /**
     * SECURITY: Validate GM access - returns silent failure for non-GM users
     */
    validateGMAccess() {
        if (!game.user?.isGM) {
            // Silent failure - no error message for non-GM users
            return { allowed: false };
        }
        return { allowed: true };
    }
    /**
     * Register all query handlers in CONFIG.queries
     */
    registerHandlers() {
        const modulePrefix = MODULE_ID;
        // Character/Actor queries
        CONFIG.queries[`${modulePrefix}.getCharacterInfo`] = this.handleGetCharacterInfo.bind(this);
        CONFIG.queries[`${modulePrefix}.listActors`] = this.handleListActors.bind(this);
        // Compendium queries
        CONFIG.queries[`${modulePrefix}.searchCompendium`] = this.handleSearchCompendium.bind(this);
        CONFIG.queries[`${modulePrefix}.listCreaturesByCriteria`] =
            this.handleListCreaturesByCriteria.bind(this);
        CONFIG.queries[`${modulePrefix}.getAvailablePacks`] = this.handleGetAvailablePacks.bind(this);
        // Scene queries
        CONFIG.queries[`${modulePrefix}.getActiveScene`] = this.handleGetActiveScene.bind(this);
        CONFIG.queries[`${modulePrefix}.list-scenes`] = this.handleListScenes.bind(this);
        CONFIG.queries[`${modulePrefix}.switch-scene`] = this.handleSwitchScene.bind(this);
        // World queries
        CONFIG.queries[`${modulePrefix}.getWorldInfo`] = this.handleGetWorldInfo.bind(this);
        // Utility queries
        CONFIG.queries[`${modulePrefix}.ping`] = this.handlePing.bind(this);
        // Phase 2 & 3: Write operation queries
        CONFIG.queries[`${modulePrefix}.createActorFromCompendium`] =
            this.handleCreateActorFromCompendium.bind(this);
        CONFIG.queries[`${modulePrefix}.getCompendiumDocumentFull`] =
            this.handleGetCompendiumDocumentFull.bind(this);
        CONFIG.queries[`${modulePrefix}.addActorsToScene`] = this.handleAddActorsToScene.bind(this);
        CONFIG.queries[`${modulePrefix}.validateWritePermissions`] =
            this.handleValidateWritePermissions.bind(this);
        CONFIG.queries[`${modulePrefix}.createJournalEntry`] = this.handleCreateJournalEntry.bind(this);
        CONFIG.queries[`${modulePrefix}.listJournals`] = this.handleListJournals.bind(this);
        CONFIG.queries[`${modulePrefix}.getJournalContent`] = this.handleGetJournalContent.bind(this);
        CONFIG.queries[`${modulePrefix}.getJournalPageContent`] =
            this.handleGetJournalPageContent.bind(this);
        CONFIG.queries[`${modulePrefix}.updateJournalContent`] =
            this.handleUpdateJournalContent.bind(this);
        // Phase 4: Dice roll queries
        CONFIG.queries[`${modulePrefix}.request-player-rolls`] =
            this.handleRequestPlayerRolls.bind(this);
        // Enhanced creature index for campaign analysis
        CONFIG.queries[`${modulePrefix}.getEnhancedCreatureIndex`] =
            this.handleGetEnhancedCreatureIndex.bind(this);
        // Campaign management queries
        CONFIG.queries[`${modulePrefix}.updateCampaignProgress`] =
            this.handleUpdateCampaignProgress.bind(this);
        // Phase 6: Actor ownership management
        CONFIG.queries[`${modulePrefix}.setActorOwnership`] = this.handleSetActorOwnership.bind(this);
        CONFIG.queries[`${modulePrefix}.getActorOwnership`] = this.handleGetActorOwnership.bind(this);
        CONFIG.queries[`${modulePrefix}.getFriendlyNPCs`] = this.handleGetFriendlyNPCs.bind(this);
        CONFIG.queries[`${modulePrefix}.getPartyCharacters`] = this.handleGetPartyCharacters.bind(this);
        CONFIG.queries[`${modulePrefix}.getConnectedPlayers`] =
            this.handleGetConnectedPlayers.bind(this);
        CONFIG.queries[`${modulePrefix}.findPlayers`] = this.handleFindPlayers.bind(this);
        CONFIG.queries[`${modulePrefix}.findActor`] = this.handleFindActor.bind(this);
        // Token manipulation queries
        CONFIG.queries[`${modulePrefix}.moveToken`] = this.handleMoveToken.bind(this);
        CONFIG.queries[`${modulePrefix}.updateToken`] = this.handleUpdateToken.bind(this);
        CONFIG.queries[`${modulePrefix}.deleteTokens`] = this.handleDeleteTokens.bind(this);
        CONFIG.queries[`${modulePrefix}.getTokenDetails`] = this.handleGetTokenDetails.bind(this);
        CONFIG.queries[`${modulePrefix}.toggleTokenCondition`] =
            this.handleToggleTokenCondition.bind(this);
        CONFIG.queries[`${modulePrefix}.getAvailableConditions`] =
            this.handleGetAvailableConditions.bind(this);
        // Map generation queries (hybrid architecture)
        CONFIG.queries[`${modulePrefix}.generate-map`] = this.handleGenerateMap.bind(this);
        CONFIG.queries[`${modulePrefix}.check-map-status`] = this.handleCheckMapStatus.bind(this);
        CONFIG.queries[`${modulePrefix}.cancel-map-job`] = this.handleCancelMapJob.bind(this);
        CONFIG.queries[`${modulePrefix}.upload-generated-map`] =
            this.handleUploadGeneratedMap.bind(this);
        // Item usage queries
        CONFIG.queries[`${modulePrefix}.useItem`] = this.handleUseItem.bind(this);
        // Character search queries
        CONFIG.queries[`${modulePrefix}.searchCharacterItems`] =
            this.handleSearchCharacterItems.bind(this);
        // Item authoring on actor sheets
        CONFIG.queries[`${modulePrefix}.addActorItems`] = this.handleAddActorItems.bind(this);
        // World item management
        CONFIG.queries[`${modulePrefix}.createWorldItems`] = this.handleCreateWorldItems.bind(this);
        CONFIG.queries[`${modulePrefix}.listWorldItems`] = this.handleListWorldItems.bind(this);
        CONFIG.queries[`${modulePrefix}.updateWorldItems`] = this.handleUpdateWorldItems.bind(this);
        // Phase 7: Token manipulation queries
        CONFIG.queries[`${modulePrefix}.move-token`] = this.handleMoveToken.bind(this);
        CONFIG.queries[`${modulePrefix}.update-token`] = this.handleUpdateToken.bind(this);
        CONFIG.queries[`${modulePrefix}.delete-tokens`] = this.handleDeleteTokens.bind(this);
        CONFIG.queries[`${modulePrefix}.get-token-details`] = this.handleGetTokenDetails.bind(this);
        CONFIG.queries[`${modulePrefix}.toggle-token-condition`] =
            this.handleToggleTokenCondition.bind(this);
        CONFIG.queries[`${modulePrefix}.get-available-conditions`] =
            this.handleGetAvailableConditions.bind(this);
        // Guard Management - Officers
        CONFIG.queries[`${modulePrefix}.createGuardOfficer`] = this.handleCreateGuardOfficer.bind(this);
        CONFIG.queries[`${modulePrefix}.listGuardOfficers`] = this.handleListGuardOfficers.bind(this);
        CONFIG.queries[`${modulePrefix}.deleteGuardOfficer`] = this.handleDeleteGuardOfficer.bind(this);
        CONFIG.queries[`${modulePrefix}.updateGuardOfficer`] = this.handleUpdateGuardOfficer.bind(this);
        // Actor management
        CONFIG.queries[`${modulePrefix}.createActor`] = this.handleCreateActor.bind(this);
        CONFIG.queries[`${modulePrefix}.updateActor`] = this.handleUpdateActor.bind(this);
        CONFIG.queries[`${modulePrefix}.updateActorItems`] = this.handleUpdateActorItems.bind(this);
        CONFIG.queries[`${modulePrefix}.addActorToScene`] = this.handleAddActorToScene.bind(this);
        CONFIG.queries[`${modulePrefix}.createFolder`] = this.handleCreateFolder.bind(this);
        CONFIG.queries[`${modulePrefix}.moveActorToFolder`] = this.handleMoveActorToFolder.bind(this);
    }
    /**
     * Unregister all query handlers
     */
    unregisterHandlers() {
        const modulePrefix = MODULE_ID;
        const keysToRemove = Object.keys(CONFIG.queries).filter(key => key.startsWith(modulePrefix));
        for (const key of keysToRemove) {
            delete CONFIG.queries[key];
        }
    }
    /**
     * Handle query requests from other parts of the module
     */
    async handleQuery(queryName, data) {
        try {
            const handler = CONFIG.queries[queryName];
            if (!handler || typeof handler !== 'function') {
                throw new Error(`Query handler not found: ${queryName}`);
            }
            return await handler(data);
        }
        catch (error) {
            console.error(`[${MODULE_ID}] Query failed: ${queryName}`, error);
            return {
                error: error instanceof Error ? error.message : 'Unknown error',
                success: false,
            };
        }
    }
    /**
     * Handle character information request
     */
    async handleGetCharacterInfo(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            const identifier = data.characterName || data.characterId;
            if (!identifier) {
                throw new Error('characterName or characterId is required');
            }
            return await this.dataAccess.getCharacterInfo(identifier);
        }
        catch (error) {
            throw new Error(`Failed to get character info: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle list actors request
     */
    async handleListActors(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            const actors = await this.dataAccess.listActors();
            // Filter by type if specified
            if (data.type) {
                return actors.filter(actor => actor.type === data.type);
            }
            return actors;
        }
        catch (error) {
            throw new Error(`Failed to list actors: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle compendium search request
     */
    async handleSearchCompendium(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            // Add better parameter validation
            if (!data || typeof data !== 'object') {
                throw new Error('Invalid data parameter structure');
            }
            if (!data.query || typeof data.query !== 'string') {
                throw new Error('query parameter is required and must be a string');
            }
            return await this.dataAccess.searchCompendium(data.query, data.packType, data.filters);
        }
        catch (error) {
            throw new Error(`Failed to search compendium: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle list creatures by criteria request
     */
    async handleListCreaturesByCriteria(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            const result = await this.dataAccess.listCreaturesByCriteria(data);
            // Handle the new format with search summary
            return {
                response: result,
            };
        }
        catch (error) {
            throw new Error(`Failed to list creatures by criteria: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle get available packs request
     */
    async handleGetAvailablePacks() {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            return await this.dataAccess.getAvailablePacks();
        }
        catch (error) {
            throw new Error(`Failed to get available packs: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle get active scene request
     */
    async handleGetActiveScene() {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            return await this.dataAccess.getActiveScene();
        }
        catch (error) {
            throw new Error(`Failed to get active scene: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle get world info request
     */
    async handleGetWorldInfo() {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            return await this.dataAccess.getWorldInfo();
        }
        catch (error) {
            throw new Error(`Failed to get world info: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle ping request
     */
    async handlePing() {
        return {
            status: 'ok',
            timestamp: Date.now(),
            module: MODULE_ID,
            foundryVersion: game.version,
            worldId: game.world?.id,
            userId: game.user?.id,
        };
    }
    /**
     * Get list of all registered query methods
     */
    getRegisteredMethods() {
        const modulePrefix = MODULE_ID;
        return Object.keys(CONFIG.queries)
            .filter(key => key.startsWith(modulePrefix))
            .map(key => key.replace(`${modulePrefix}.`, ''));
    }
    /**
     * Test if a specific query handler is registered
     */
    isMethodRegistered(method) {
        const queryKey = `${MODULE_ID}.${method}`;
        return queryKey in CONFIG.queries && typeof CONFIG.queries[queryKey] === 'function';
    }
    // ===== PHASE 2: WRITE OPERATION HANDLERS =====
    /**
     * Handle actor creation from specific compendium entry
     */
    async handleCreateActorFromCompendium(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            // Clean interface - direct pack/item reference only
            const requestData = {
                packId: data.packId,
                itemId: data.itemId,
                customNames: data.customNames || [],
                quantity: data.quantity || 1,
                addToScene: data.addToScene || false,
            };
            if (data.placement) {
                requestData.placement = data.placement;
            }
            return await this.dataAccess.createActorFromCompendiumEntry(requestData);
        }
        catch (error) {
            throw new Error(`Failed to create actor from compendium: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle get compendium document full request
     */
    async handleGetCompendiumDocumentFull(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data.packId) {
                throw new Error('packId is required');
            }
            if (!data.documentId) {
                throw new Error('documentId is required');
            }
            return await this.dataAccess.getCompendiumDocumentFull(data.packId, data.documentId);
        }
        catch (error) {
            throw new Error(`Failed to get compendium document: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle add actors to scene request
     */
    async handleAddActorsToScene(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data.actorIds || !Array.isArray(data.actorIds) || data.actorIds.length === 0) {
                throw new Error('actorIds array is required and must not be empty');
            }
            return await this.dataAccess.addActorsToScene({
                actorIds: data.actorIds,
                placement: data.placement || 'random',
                hidden: data.hidden || false,
            });
        }
        catch (error) {
            throw new Error(`Failed to add actors to scene: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle validate write permissions request
     */
    async handleValidateWritePermissions(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data.operation) {
                throw new Error('operation is required');
            }
            return await this.dataAccess.validateWritePermissions(data.operation);
        }
        catch (error) {
            throw new Error(`Failed to validate write permissions: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle journal entry creation
     */
    async handleCreateJournalEntry(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            if (!data.name) {
                throw new Error('name is required');
            }
            if (!data.content) {
                throw new Error('content is required');
            }
            return await this.dataAccess.createJournalEntry({
                name: data.name,
                content: data.content,
                additionalPages: data.additionalPages,
            });
        }
        catch (error) {
            throw new Error(`Failed to create journal entry: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle list journals request
     */
    async handleListJournals() {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            return await this.dataAccess.listJournals();
        }
        catch (error) {
            throw new Error(`Failed to list journals: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle get journal content request
     */
    async handleGetJournalContent(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data.journalId) {
                throw new Error('journalId is required');
            }
            return await this.dataAccess.getJournalContent(data.journalId);
        }
        catch (error) {
            throw new Error(`Failed to get journal content: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle get specific journal page content request
     */
    async handleGetJournalPageContent(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data.journalId) {
                throw new Error('journalId is required');
            }
            if (!data.pageId) {
                throw new Error('pageId is required');
            }
            return await this.dataAccess.getJournalPageContent(data.journalId, data.pageId);
        }
        catch (error) {
            throw new Error(`Failed to get journal page content: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle update journal content request
     */
    async handleUpdateJournalContent(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data.journalId) {
                throw new Error('journalId is required');
            }
            if (!data.content) {
                throw new Error('content is required');
            }
            const updateRequest = {
                journalId: data.journalId,
                content: data.content,
            };
            if (data.pageId)
                updateRequest.pageId = data.pageId;
            if (data.newPageName)
                updateRequest.newPageName = data.newPageName;
            return await this.dataAccess.updateJournalContent(updateRequest);
        }
        catch (error) {
            throw new Error(`Failed to update journal content: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle request player rolls - creates interactive roll buttons in chat
     */
    async handleRequestPlayerRolls(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data.rollType || !data.rollTarget || !data.targetPlayer) {
                throw new Error('rollType, rollTarget, and targetPlayer are required');
            }
            return await this.dataAccess.requestPlayerRolls(data);
        }
        catch (error) {
            throw new Error(`Failed to request player rolls: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle get enhanced creature index request
     */
    async handleGetEnhancedCreatureIndex() {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            return await this.dataAccess.getEnhancedCreatureIndex();
        }
        catch (error) {
            throw new Error(`Failed to get enhanced creature index: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle campaign progress update request
     */
    async handleUpdateCampaignProgress(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            // For now, this is a pass-through to the MCP server
            // In the future, campaign data might be stored in Foundry world flags
            // Currently, the campaign dashboard regeneration happens server-side
            return {
                success: true,
                message: `Campaign progress updated: ${data.partId} is now ${data.newStatus}`,
                campaignId: data.campaignId,
                partId: data.partId,
                newStatus: data.newStatus,
            };
        }
        catch (error) {
            throw new Error(`Failed to update campaign progress: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle set actor ownership request
     */
    async handleSetActorOwnership(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data.actorId || !data.userId || data.permission === undefined) {
                throw new Error('actorId, userId, and permission are required');
            }
            return await this.dataAccess.setActorOwnership(data);
        }
        catch (error) {
            throw new Error(`Failed to set actor ownership: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle get actor ownership request
     */
    async handleGetActorOwnership(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            return await this.dataAccess.getActorOwnership(data);
        }
        catch (error) {
            throw new Error(`Failed to get actor ownership: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle get friendly NPCs request
     */
    async handleGetFriendlyNPCs() {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            return await this.dataAccess.getFriendlyNPCs();
        }
        catch (error) {
            throw new Error(`Failed to get friendly NPCs: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle get party characters request
     */
    async handleGetPartyCharacters() {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            return await this.dataAccess.getPartyCharacters();
        }
        catch (error) {
            throw new Error(`Failed to get party characters: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle get connected players request
     */
    async handleGetConnectedPlayers() {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            return await this.dataAccess.getConnectedPlayers();
        }
        catch (error) {
            throw new Error(`Failed to get connected players: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle find players request
     */
    async handleFindPlayers(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data.identifier) {
                throw new Error('identifier is required');
            }
            return await this.dataAccess.findPlayers(data);
        }
        catch (error) {
            throw new Error(`Failed to find players: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle find actor request
     */
    async handleFindActor(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data.identifier) {
                throw new Error('identifier is required');
            }
            return await this.dataAccess.findActor(data);
        }
        catch (error) {
            throw new Error(`Failed to find actor: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle list scenes request
     */
    async handleListScenes(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            return await this.dataAccess.listScenes(data);
        }
        catch (error) {
            throw new Error(`Failed to list scenes: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle switch scene request
     */
    async handleSwitchScene(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data.scene_identifier) {
                throw new Error('scene_identifier is required');
            }
            return await this.dataAccess.switchScene(data);
        }
        catch (error) {
            throw new Error(`Failed to switch scene: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle map generation request - uses hybrid architecture
     */
    async handleGenerateMap(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            if (!data.prompt || typeof data.prompt !== 'string') {
                throw new Error('Prompt is required and must be a string');
            }
            if (!data.scene_name || typeof data.scene_name !== 'string') {
                throw new Error('Scene name is required and must be a string');
            }
            // Get quality setting from module settings
            const quality = game.settings.get(MODULE_ID, 'mapGenQuality') || 'low';
            const params = {
                prompt: data.prompt.trim(),
                scene_name: data.scene_name.trim(),
                size: data.size || 'medium',
                grid_size: data.grid_size || 70,
                quality: quality,
            };
            // Use ComfyUIManager to communicate with backend via WebSocket
            const response = await this.comfyuiManager.generateMap(params);
            const isSuccess = typeof response?.success === 'boolean' ? response.success : response?.status === 'success';
            if (!isSuccess) {
                const errorMessage = response?.error || response?.message || 'Map generation failed';
                return {
                    error: errorMessage,
                    success: false,
                    status: response?.status ?? 'error',
                };
            }
            return {
                success: true,
                status: response?.status ?? 'success',
                jobId: response.jobId,
                message: response.message || 'Map generation started',
                estimatedTime: response.estimatedTime || '30-90 seconds',
            };
        }
        catch (error) {
            return {
                error: error.message,
                success: false,
            };
        }
    }
    /**
     * Handle map status check request - uses hybrid architecture
     */
    async handleCheckMapStatus(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            if (!data.job_id) {
                throw new Error('Job ID is required');
            }
            // Use ComfyUIManager to communicate with backend via WebSocket
            const response = await this.comfyuiManager.checkMapStatus(data);
            const isSuccess = typeof response?.success === 'boolean' ? response.success : response?.status === 'success';
            if (!isSuccess) {
                const errorMessage = response?.error || response?.message || 'Status check failed';
                return {
                    error: errorMessage,
                    success: false,
                    status: response?.status ?? 'error',
                };
            }
            return {
                success: true,
                status: response?.status ?? 'success',
                job: response.job,
            };
        }
        catch (error) {
            return {
                error: error.message,
                success: false,
            };
        }
    }
    /**
     * Handle map job cancellation request - uses hybrid architecture
     */
    async handleCancelMapJob(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            if (!data.job_id) {
                throw new Error('Job ID is required');
            }
            // Use ComfyUIManager to communicate with backend via WebSocket
            const response = await this.comfyuiManager.cancelMapJob(data);
            const isSuccess = typeof response?.success === 'boolean' ? response.success : response?.status === 'success';
            if (!isSuccess) {
                const errorMessage = response?.error || response?.message || 'Job cancellation failed';
                return {
                    error: errorMessage,
                    success: false,
                    status: response?.status ?? 'error',
                };
            }
            return {
                success: true,
                status: response?.status ?? 'success',
                message: response.message || 'Job cancelled successfully',
            };
        }
        catch (error) {
            return {
                error: error.message,
                success: false,
            };
        }
    }
    /**
     * Handle upload of generated map image (for remote Foundry instances)
     * Receives base64-encoded image data and saves it to generated-maps folder
     */
    async handleUploadGeneratedMap(data) {
        console.log(`[${MODULE_ID}] Upload generated map request received`, {
            hasFilename: !!data.filename,
            hasImageData: !!data.imageData,
            imageDataLength: data.imageData?.length,
        });
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                console.error(`[${MODULE_ID}] Upload denied - not GM`);
                return { error: 'Access denied', success: false };
            }
            if (!data.filename || typeof data.filename !== 'string') {
                console.error(`[${MODULE_ID}] Upload failed - invalid filename`);
                throw new Error('Filename is required and must be a string');
            }
            if (!data.imageData || typeof data.imageData !== 'string') {
                console.error(`[${MODULE_ID}] Upload failed - invalid image data`);
                throw new Error('Image data is required and must be a base64 string');
            }
            console.log(`[${MODULE_ID}] Validating filename...`);
            // Validate filename for security (prevent path traversal)
            const safeFilename = data.filename.replace(/[^a-zA-Z0-9_\-\.]/g, '_');
            if (!safeFilename.endsWith('.png') &&
                !safeFilename.endsWith('.jpg') &&
                !safeFilename.endsWith('.jpeg')) {
                throw new Error('Only PNG and JPEG images are supported');
            }
            console.log(`[${MODULE_ID}] Converting base64 to blob...`, {
                base64Length: data.imageData.length,
                estimatedSizeMB: (data.imageData.length / 1024 / 1024).toFixed(2),
            });
            // Convert base64 to Blob
            const byteCharacters = atob(data.imageData);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/png' });
            console.log(`[${MODULE_ID}] Creating file object...`, {
                filename: safeFilename,
                blobSize: blob.size,
            });
            // Create a File object from the Blob
            const file = new File([blob], safeFilename, { type: 'image/png' });
            console.log(`[${MODULE_ID}] Ensuring upload directory exists...`);
            // Upload to world-specific folder so maps persist even if module is deleted
            // This also keeps maps organized per world
            const worldId = game.world?.id || 'unknown-world';
            const uploadPath = `worlds/${worldId}/ai-generated-maps`;
            try {
                // Use the modern Foundry API (v13+) with fallback for older versions
                const FilePickerAPI = globalThis.foundry?.applications?.apps?.FilePicker?.implementation ||
                    globalThis.FilePicker;
                await FilePickerAPI.createDirectory('data', uploadPath, { bucket: null });
                console.log(`[${MODULE_ID}] Directory created/verified: ${uploadPath}`);
            }
            catch (dirError) {
                // Directory might already exist, that's okay
                if (!dirError.message?.includes('EEXIST') &&
                    !dirError.message?.includes('already exists')) {
                    console.warn(`[${MODULE_ID}] Directory creation warning:`, dirError.message);
                }
            }
            console.log(`[${MODULE_ID}] Uploading to FilePicker...`);
            // Upload using Foundry's FilePicker.upload method with modern API
            const FilePickerAPI = globalThis.foundry?.applications?.apps?.FilePicker?.implementation ||
                globalThis.FilePicker;
            const response = await FilePickerAPI.upload('data', uploadPath, file, {}, { notify: false });
            console.log(`[${MODULE_ID}] FilePicker.upload response:`, JSON.stringify(response, null, 2));
            console.log(`[${MODULE_ID}] Response keys:`, Object.keys(response || {}));
            console.log(`[${MODULE_ID}] Uploaded generated map to:`, response.path);
            return {
                success: true,
                path: response.path,
                filename: safeFilename,
                message: `Map uploaded successfully to ${response.path}`,
            };
        }
        catch (error) {
            console.error(`[${MODULE_ID}] Failed to upload generated map:`, error);
            return {
                error: error.message || 'Failed to upload generated map',
                success: false,
            };
        }
    }
    // ===== PHASE 7: TOKEN MANIPULATION HANDLERS =====
    /**
     * Handle move token request
     */
    async handleMoveToken(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data.tokenId) {
                throw new Error('tokenId is required');
            }
            if (typeof data.x !== 'number' || typeof data.y !== 'number') {
                throw new Error('x and y coordinates are required and must be numbers');
            }
            return await this.dataAccess.moveToken(data);
        }
        catch (error) {
            throw new Error(`Failed to move token: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle update token request
     */
    async handleUpdateToken(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data.tokenId) {
                throw new Error('tokenId is required');
            }
            if (!data.updates || typeof data.updates !== 'object') {
                throw new Error('updates object is required');
            }
            return await this.dataAccess.updateToken(data);
        }
        catch (error) {
            throw new Error(`Failed to update token: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle delete tokens request
     */
    async handleDeleteTokens(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data.tokenIds || !Array.isArray(data.tokenIds) || data.tokenIds.length === 0) {
                throw new Error('tokenIds array is required and must not be empty');
            }
            return await this.dataAccess.deleteTokens(data);
        }
        catch (error) {
            throw new Error(`Failed to delete tokens: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle get token details request
     */
    async handleGetTokenDetails(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data.tokenId) {
                throw new Error('tokenId is required');
            }
            return await this.dataAccess.getTokenDetails(data);
        }
        catch (error) {
            throw new Error(`Failed to get token details: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle toggle token condition request
     */
    async handleToggleTokenCondition(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data.tokenId) {
                throw new Error('tokenId is required');
            }
            if (!data.conditionId) {
                throw new Error('conditionId is required');
            }
            if (typeof data.active !== 'boolean') {
                throw new Error('active must be a boolean');
            }
            return await this.dataAccess.toggleTokenCondition(data);
        }
        catch (error) {
            throw new Error(`Failed to toggle token condition: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle get available conditions request
     */
    async handleGetAvailableConditions() {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            return await this.dataAccess.getAvailableConditions();
        }
        catch (error) {
            throw new Error(`Failed to get available conditions: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle use item request (cast spell, use ability, consume item, etc.)
     */
    async handleUseItem(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data.actorIdentifier) {
                throw new Error('actorIdentifier is required');
            }
            if (!data.itemIdentifier) {
                throw new Error('itemIdentifier is required');
            }
            return await this.dataAccess.useItem({
                actorIdentifier: data.actorIdentifier,
                itemIdentifier: data.itemIdentifier,
                targets: data.targets,
                options: data.options,
            });
        }
        catch (error) {
            throw new Error(`Failed to use item: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle search character items request
     */
    async handleSearchCharacterItems(data) {
        try {
            // SECURITY: Silent GM validation
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data.characterIdentifier) {
                throw new Error('characterIdentifier is required');
            }
            return await this.dataAccess.searchCharacterItems({
                characterIdentifier: data.characterIdentifier,
                query: data.query,
                type: data.type,
                category: data.category,
                limit: data.limit,
            });
        }
        catch (error) {
            throw new Error(`Failed to search character items: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    // ===== WORLD ITEM MANAGEMENT =====
    /**
     * Handle create world-level items request
     */
    async handleCreateWorldItems(data) {
        try {
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed)
                return { error: 'Access denied', success: false };
            this.dataAccess.validateFoundryState();
            if (!Array.isArray(data?.items) || data.items.length === 0) {
                throw new Error('items array is required and must not be empty');
            }
            const createParams = { items: data.items };
            if (data.folder)
                createParams.folder = data.folder;
            return await this.dataAccess.createWorldItems(createParams);
        }
        catch (error) {
            throw new Error(`Failed to create world items: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle list world-level items request
     */
    async handleListWorldItems(data) {
        try {
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed)
                return { error: 'Access denied', success: false };
            this.dataAccess.validateFoundryState();
            const listParams = {};
            if (data?.type)
                listParams.type = data.type;
            if (data?.folder)
                listParams.folder = data.folder;
            if (data?.nameFilter)
                listParams.nameFilter = data.nameFilter;
            return await this.dataAccess.listWorldItems(listParams);
        }
        catch (error) {
            throw new Error(`Failed to list world items: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle update world-level items request
     */
    async handleUpdateWorldItems(data) {
        try {
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed)
                return { error: 'Access denied', success: false };
            this.dataAccess.validateFoundryState();
            if (!Array.isArray(data?.updates) || data.updates.length === 0) {
                throw new Error('updates array is required and must not be empty');
            }
            return await this.dataAccess.updateWorldItems({ updates: data.updates });
        }
        catch (error) {
            throw new Error(`Failed to update world items: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async handleAddActorItems(data) {
        try {
            // SECURITY: Silent GM validation - writes to actor sheets are GM-only
            const gmCheck = this.validateGMAccess();
            if (!gmCheck.allowed) {
                return { error: 'Access denied', success: false };
            }
            this.dataAccess.validateFoundryState();
            if (!data?.actorIdentifier) {
                throw new Error('actorIdentifier is required');
            }
            if (!Array.isArray(data?.items) || data.items.length === 0) {
                throw new Error('items array is required and must contain at least one entry');
            }
            return await this.dataAccess.addActorItems({
                actorIdentifier: data.actorIdentifier,
                items: data.items,
            });
        }
        catch (error) {
            throw new Error(`Failed to add actor items: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Guard Management: Create Officer
     */
    async handleCreateGuardOfficer(params) {
        const gmCheck = this.validateGMAccess();
        if (!gmCheck.allowed)
            return { error: 'GM access required' };
        try {
            const gm = window.GuardManagement;
            if (!gm?.officerManager) {
                return { error: 'guard-management module not available or not initialized' };
            }
            const officer = await gm.officerManager.create({
                actorId: params.actorId,
                actorName: params.actorName,
                actorImg: params.actorImg,
                title: params.title || 'Oficial',
                skill: params.skill,
                pros: params.pros || [],
                cons: params.cons || [],
                organizationId: params.organizationId,
                isCivil: params.isCivil ?? false,
            });
            return { success: true, officer };
        }
        catch (error) {
            return { error: error?.message || String(error) };
        }
    }
    /**
     * Guard Management: List Officers
     */
    async handleListGuardOfficers(params) {
        try {
            const gm = window.GuardManagement;
            if (!gm?.officerManager) {
                return { error: 'guard-management module not available or not initialized' };
            }
            let officers = gm.officerManager.list();
            if (params?.organizationId) {
                officers = officers.filter((o) => o.organizationId === params.organizationId);
            }
            return { success: true, officers, total: officers.length };
        }
        catch (error) {
            return { error: error?.message || String(error) };
        }
    }
    /**
     * Guard Management: Delete Officer
     */
    async handleDeleteGuardOfficer(params) {
        const gmCheck = this.validateGMAccess();
        if (!gmCheck.allowed)
            return { error: 'GM access required' };
        try {
            const gm = window.GuardManagement;
            if (!gm?.officerManager) {
                return { error: 'guard-management module not available or not initialized' };
            }
            const deleted = gm.officerManager.delete(params.officerId);
            if (!deleted) {
                return { error: `Officer with id '${params.officerId}' not found` };
            }
            return { success: true, deletedId: params.officerId };
        }
        catch (error) {
            return { error: error?.message || String(error) };
        }
    }
    /**
     * Guard Management: Update Officer
     */
    async handleUpdateGuardOfficer(params) {
        const gmCheck = this.validateGMAccess();
        if (!gmCheck.allowed)
            return { error: 'GM access required' };
        try {
            const gm = window.GuardManagement;
            if (!gm?.officerManager) {
                return { error: 'guard-management module not available or not initialized' };
            }
            if (!params.officerId)
                return { error: 'officerId is required' };
            const updated = await gm.officerManager.update(params.officerId, params.data);
            if (!updated) {
                return { error: `Officer '${params.officerId}' not found or update failed` };
            }
            return { success: true, officer: updated };
        }
        catch (error) {
            return { error: error?.message || String(error) };
        }
    }
    /**
     * Actor Management: Update actor properties (img, name, biography, etc.)
     */
    /**
     * Folder management: Create a folder (and optional parent folder) for Actors
     */
    async handleCreateFolder(params) {
        const gmCheck = this.validateGMAccess();
        if (!gmCheck.allowed)
            return { error: 'GM access required' };
        try {
            this.dataAccess.validateFoundryState();
            if (!params.name)
                return { error: 'name is required' };
            const type = params.type || 'Actor';
            // If parentName is given, find or create it first
            let parentId = null;
            if (params.parentName) {
                let parent = game.folders?.find((f) => f.name === params.parentName && f.type === type && !f.folder);
                if (!parent) {
                    parent = await Folder.create({ name: params.parentName, type, folder: null });
                }
                parentId = parent.id;
            }
            // Find or create the target folder
            let folder = game.folders?.find((f) => f.name === params.name && f.type === type && (parentId ? f.folder?.id === parentId : !f.folder));
            if (!folder) {
                folder = await Folder.create({ name: params.name, type, folder: parentId });
            }
            return { success: true, folderId: folder.id, name: folder.name, parentId };
        }
        catch (error) {
            return { error: error?.message || String(error) };
        }
    }
    /**
     * Folder management: Move an actor into a folder by folder ID or name path
     */
    async handleMoveActorToFolder(params) {
        const gmCheck = this.validateGMAccess();
        if (!gmCheck.allowed)
            return { error: 'GM access required' };
        try {
            this.dataAccess.validateFoundryState();
            if (!params.actorId)
                return { error: 'actorId is required' };
            if (!params.folderId)
                return { error: 'folderId is required' };
            const actor = game.actors?.get(params.actorId);
            if (!actor)
                return { error: `Actor '${params.actorId}' not found` };
            await actor.update({ folder: params.folderId });
            return { success: true, actorId: params.actorId, folderId: params.folderId };
        }
        catch (error) {
            return { error: error?.message || String(error) };
        }
    }
    async handleCreateActor(params) {
        const gmCheck = this.validateGMAccess();
        if (!gmCheck.allowed)
            return { error: 'GM access required' };
        try {
            this.dataAccess.validateFoundryState();
            if (!params.name)
                return { error: 'name is required' };
            if (!params.type)
                return { error: 'type is required' };
            const actorData = {
                name: params.name,
                type: params.type,
            };
            if (params.img)
                actorData.img = params.img;
            if (params.system)
                actorData.system = params.system;
            const actor = await Actor.create(actorData);
            return {
                success: true,
                actorId: actor.id,
                name: actor.name,
                img: actor.img,
            };
        }
        catch (error) {
            return { error: error?.message || String(error) };
        }
    }
    /**
     * Actor Management: Update embedded items on an actor
     */
    async handleUpdateActorItems(params) {
        const gmCheck = this.validateGMAccess();
        if (!gmCheck.allowed)
            return { error: 'GM access required' };
        try {
            this.dataAccess.validateFoundryState();
            if (!params.actorId)
                return { error: 'actorId is required' };
            if (!Array.isArray(params.items) || params.items.length === 0) {
                return { error: 'items array is required' };
            }
            const actor = game.actors?.get(params.actorId);
            if (!actor)
                return { error: `Actor '${params.actorId}' not found` };
            const updated = await actor.updateEmbeddedDocuments('Item', params.items);
            return { success: true, updated: updated.length };
        }
        catch (error) {
            return { error: error?.message || String(error) };
        }
    }
    /**
     * Actor Management: Update an existing actor
     * Supports `folderPath` param: "Parent/Child" creates nested Actor folders and moves actor there.
     */
    async handleUpdateActor(params) {
        const gmCheck = this.validateGMAccess();
        if (!gmCheck.allowed)
            return { error: 'GM access required' };
        try {
            this.dataAccess.validateFoundryState();
            if (!params.actorId)
                return { error: 'actorId is required' };
            if (!params.updates || typeof params.updates !== 'object') {
                return { error: 'updates object is required' };
            }
            const actor = game.actors?.get(params.actorId);
            if (!actor)
                return { error: `Actor '${params.actorId}' not found` };
            // Resolve folderPath → folder ID (creates folders as needed)
            if (params.folderPath) {
                const parts = params.folderPath.split('/').map((s) => s.trim()).filter(Boolean);
                let parentId = null;
                for (const part of parts) {
                    let folder = game.folders?.find((f) => f.name === part && f.type === 'Actor' && (parentId ? f.folder?.id === parentId : !f.folder));
                    if (!folder) {
                        folder = await Folder.create({ name: part, type: 'Actor', folder: parentId });
                    }
                    parentId = folder.id;
                }
                params.updates.folder = parentId;
            }
            const updateData = { ...params.updates };
            await actor.update(updateData);
            // Re-fetch to get updated values
            const updated = game.actors?.get(params.actorId);
            return {
                success: true,
                actorId: params.actorId,
                name: updated?.name,
                img: updated?.img,
                folder: updated?.folder?.id ?? null,
            };
        }
        catch (error) {
            return { error: error?.message || String(error) };
        }
    }
    /**
     * Actor Management: Add actor to the active scene as a token
     */
    async handleAddActorToScene(params) {
        const gmCheck = this.validateGMAccess();
        if (!gmCheck.allowed)
            return { error: 'GM access required' };
        try {
            this.dataAccess.validateFoundryState();
            if (!params.actorId)
                return { error: 'actorId is required' };
            const scene = game.scenes?.active;
            if (!scene)
                return { error: 'No active scene found' };
            const actor = game.actors?.get(params.actorId);
            if (!actor)
                return { error: `Actor '${params.actorId}' not found` };
            // Determine placement position
            const x = params.x ?? Math.floor(scene.width / 2);
            const y = params.y ?? Math.floor(scene.height / 2);
            const tokenData = await actor.getTokenDocument({ x, y });
            const [token] = await scene.createEmbeddedDocuments('Token', [tokenData]);
            return {
                success: true,
                tokenId: token.id,
                actorId: params.actorId,
                x: token.x,
                y: token.y,
            };
        }
        catch (error) {
            return { error: error?.message || String(error) };
        }
    }
}
//# sourceMappingURL=queries.js.map