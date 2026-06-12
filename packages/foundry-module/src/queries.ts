import { MODULE_ID } from './constants.js';
import { FoundryDataAccess } from './data-access.js';
import { ComfyUIManager } from './comfyui-manager.js';

export class QueryHandlers {
  public dataAccess: FoundryDataAccess;
  private comfyuiManager: ComfyUIManager;

  constructor() {
    this.dataAccess = new FoundryDataAccess();
    this.comfyuiManager = new ComfyUIManager();
  }

  /**
   * SECURITY: Validate GM access - returns silent failure for non-GM users
   */
  private validateGMAccess(): { allowed: boolean; error?: any } {
    if (!game.user?.isGM) {
      // Silent failure - no error message for non-GM users
      return { allowed: false };
    }
    return { allowed: true };
  }

  /**
   * Register all query handlers in CONFIG.queries
   */
  registerHandlers(): void {
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
    CONFIG.queries[`${modulePrefix}.reloadFoundry`] = this.handleReloadFoundry.bind(this);
    CONFIG.queries[`${modulePrefix}.fixItemActions`] = this.handleFixItemActions.bind(this);

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
    CONFIG.queries[`${modulePrefix}.deleteActorItems`] = this.handleDeleteActorItems.bind(this);

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
    CONFIG.queries[`${modulePrefix}.createItemAction`] = this.handleCreateItemAction.bind(this);
    CONFIG.queries[`${modulePrefix}.deleteItemActions`] = this.handleDeleteItemActions.bind(this);
    CONFIG.queries[`${modulePrefix}.getItemActions`] = this.handleGetItemActions.bind(this);
    CONFIG.queries[`${modulePrefix}.repairItemActions`] = this.handleRepairItemActions.bind(this);
    CONFIG.queries[`${modulePrefix}.addActorToScene`] = this.handleAddActorToScene.bind(this);
    CONFIG.queries[`${modulePrefix}.createFolder`] = this.handleCreateFolder.bind(this);
    CONFIG.queries[`${modulePrefix}.moveActorToFolder`] = this.handleMoveActorToFolder.bind(this);
  }

  /**
   * Unregister all query handlers
   */
  unregisterHandlers(): void {
    const modulePrefix = MODULE_ID;
    const keysToRemove = Object.keys(CONFIG.queries).filter(key => key.startsWith(modulePrefix));

    for (const key of keysToRemove) {
      delete CONFIG.queries[key];
    }
  }

  /**
   * Handle query requests from other parts of the module
   */
  async handleQuery(queryName: string, data: any): Promise<any> {
    try {
      const handler = CONFIG.queries[queryName];
      if (!handler || typeof handler !== 'function') {
        throw new Error(`Query handler not found: ${queryName}`);
      }

      return await handler(data);
    } catch (error) {
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
  private async handleGetCharacterInfo(data: {
    characterName?: string;
    characterId?: string;
  }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to get character info: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle list actors request
   */
  private async handleListActors(data: { type?: string }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to list actors: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle compendium search request
   */
  private async handleSearchCompendium(data: {
    query: string;
    packType?: string;
    filters?: {
      challengeRating?: number | { min?: number; max?: number };
      creatureType?: string;
      size?: string;
      alignment?: string;
      hasLegendaryActions?: boolean;
      spellcaster?: boolean;
    };
  }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to search compendium: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle list creatures by criteria request
   */
  private async handleListCreaturesByCriteria(data: {
    challengeRating?: number | { min?: number; max?: number };
    creatureType?: string;
    size?: string;
    hasSpells?: boolean;
    hasLegendaryActions?: boolean;
    limit?: number;
  }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to list creatures by criteria: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle get available packs request
   */
  private async handleGetAvailablePacks(): Promise<any> {
    try {
      // SECURITY: Silent GM validation
      const gmCheck = this.validateGMAccess();
      if (!gmCheck.allowed) {
        return { error: 'Access denied', success: false };
      }

      this.dataAccess.validateFoundryState();
      return await this.dataAccess.getAvailablePacks();
    } catch (error) {
      throw new Error(
        `Failed to get available packs: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle get active scene request
   */
  private async handleGetActiveScene(): Promise<any> {
    try {
      // SECURITY: Silent GM validation
      const gmCheck = this.validateGMAccess();
      if (!gmCheck.allowed) {
        return { error: 'Access denied', success: false };
      }

      this.dataAccess.validateFoundryState();
      return await this.dataAccess.getActiveScene();
    } catch (error) {
      throw new Error(
        `Failed to get active scene: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle get world info request
   */
  private async handleGetWorldInfo(): Promise<any> {
    try {
      // SECURITY: Silent GM validation
      const gmCheck = this.validateGMAccess();
      if (!gmCheck.allowed) {
        return { error: 'Access denied', success: false };
      }

      this.dataAccess.validateFoundryState();
      return await this.dataAccess.getWorldInfo();
    } catch (error) {
      throw new Error(
        `Failed to get world info: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle ping request
   */
  private async handlePing(): Promise<any> {
    return {
      status: 'ok',
      timestamp: Date.now(),
      module: MODULE_ID,
      foundryVersion: game.version,
      worldId: game.world?.id,
      userId: game.user?.id,
    };
  }

  private async handleFixItemActions(params: any): Promise<any> {
    const gmCheck = this.validateGMAccess();
    if (!gmCheck.allowed) return { error: 'GM access required' };

    try {
      const { actorId, itemId } = params;
      if (!actorId || !itemId) return { error: 'actorId and itemId are required' };

      const actor = (game as any).actors?.get(actorId);
      if (!actor) return { error: `Actor '${actorId}' not found` };

      if (!actor.items.get(itemId)) return { error: `Item '${itemId}' not found on actor` };

      // Use actor.updateEmbeddedDocuments to update the Item at the Actor level.
      // diff:false forces a direct replacement instead of deep-merge, bypassing the
      // EmbeddedCollectionField validation on system.actions that rejects deletion keys.
      // noHooks:true skips Daggerheart's _onUpdate hook that crashes on 'triggers'.
      await (actor as any).updateEmbeddedDocuments(
        'Item',
        [{ _id: itemId, 'system.actions': {} }],
        { diff: false, noHooks: true }
      );

      // Also fix token actors on the active scene (unlinked tokens have their own ActorDelta)
      for (const tokenActor of this.getSceneTokenActors(actorId)) {
        try {
          if (tokenActor.items.get(itemId)) {
            await (tokenActor as any).updateEmbeddedDocuments(
              'Item',
              [{ _id: itemId, 'system.actions': {} }],
              { diff: false, noHooks: true }
            );
          }
        } catch { /* ignore individual token failures */ }
      }

      const baseItem = actor.items.get(itemId);
      const remaining = baseItem
        ? Object.keys((baseItem.system as any).actions?.toObject?.() ?? {}).length
        : -1;

      return { success: true, itemId, remaining, message: `actions cleared (remaining: ${remaining})` };
    } catch (error: any) {
      return { error: error?.message || String(error) };
    }
  }

  private async handleReloadFoundry(_params: any): Promise<any> {
    const gmCheck = this.validateGMAccess();
    if (!gmCheck.allowed) return { error: 'GM access required' };

    try {
      // Schedule the reload slightly deferred so the socket response goes out first
      setTimeout(() => (foundry as any).utils.debouncedReload(), 500);
      return { success: true, message: 'Foundry reload initiated' };
    } catch (error: any) {
      return { error: error?.message || String(error) };
    }
  }

  /**
   * Get list of all registered query methods
   */
  getRegisteredMethods(): string[] {
    const modulePrefix = MODULE_ID;
    return Object.keys(CONFIG.queries)
      .filter(key => key.startsWith(modulePrefix))
      .map(key => key.replace(`${modulePrefix}.`, ''));
  }

  /**
   * Test if a specific query handler is registered
   */
  isMethodRegistered(method: string): boolean {
    const queryKey = `${MODULE_ID}.${method}`;
    return queryKey in CONFIG.queries && typeof CONFIG.queries[queryKey] === 'function';
  }

  // ===== PHASE 2: WRITE OPERATION HANDLERS =====

  /**
   * Handle actor creation from specific compendium entry
   */
  private async handleCreateActorFromCompendium(data: {
    packId: string;
    itemId: string;
    customNames?: string[] | undefined;
    quantity?: number | undefined;
    addToScene?: boolean | undefined;
    placement?:
      | {
          type: 'random' | 'grid' | 'center' | 'coordinates';
          coordinates?: { x: number; y: number }[];
        }
      | undefined;
  }): Promise<any> {
    try {
      // SECURITY: Silent GM validation
      const gmCheck = this.validateGMAccess();
      if (!gmCheck.allowed) {
        return { error: 'Access denied', success: false };
      }

      this.dataAccess.validateFoundryState();

      // Clean interface - direct pack/item reference only
      const requestData: any = {
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
    } catch (error) {
      throw new Error(
        `Failed to create actor from compendium: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle get compendium document full request
   */
  private async handleGetCompendiumDocumentFull(data: {
    packId: string;
    documentId: string;
  }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to get compendium document: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle add actors to scene request
   */
  private async handleAddActorsToScene(data: {
    actorIds: string[];
    placement?: 'random' | 'grid' | 'center';
    hidden?: boolean;
  }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to add actors to scene: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle validate write permissions request
   */
  private async handleValidateWritePermissions(data: {
    operation: 'createActor' | 'modifyScene';
  }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to validate write permissions: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle journal entry creation
   */
  async handleCreateJournalEntry(data: any): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to create journal entry: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle list journals request
   */
  async handleListJournals(): Promise<any> {
    try {
      // SECURITY: Silent GM validation
      const gmCheck = this.validateGMAccess();
      if (!gmCheck.allowed) {
        return { error: 'Access denied', success: false };
      }

      this.dataAccess.validateFoundryState();
      return await this.dataAccess.listJournals();
    } catch (error) {
      throw new Error(
        `Failed to list journals: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle get journal content request
   */
  async handleGetJournalContent(data: { journalId: string }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to get journal content: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle get specific journal page content request
   */
  async handleGetJournalPageContent(data: { journalId: string; pageId: string }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to get journal page content: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle update journal content request
   */
  async handleUpdateJournalContent(data: {
    journalId: string;
    content: string;
    pageId?: string;
    newPageName?: string;
  }): Promise<any> {
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

      const updateRequest: {
        journalId: string;
        content: string;
        pageId?: string | undefined;
        newPageName?: string | undefined;
      } = {
        journalId: data.journalId,
        content: data.content,
      };
      if (data.pageId) updateRequest.pageId = data.pageId;
      if (data.newPageName) updateRequest.newPageName = data.newPageName;

      return await this.dataAccess.updateJournalContent(updateRequest);
    } catch (error) {
      throw new Error(
        `Failed to update journal content: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle request player rolls - creates interactive roll buttons in chat
   */
  async handleRequestPlayerRolls(data: {
    rollType: string;
    rollTarget: string;
    targetPlayer: string;
    isPublic: boolean;
    rollModifier: string;
    flavor: string;
  }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to request player rolls: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle get enhanced creature index request
   */
  async handleGetEnhancedCreatureIndex(): Promise<any> {
    try {
      // SECURITY: Silent GM validation
      const gmCheck = this.validateGMAccess();
      if (!gmCheck.allowed) {
        return { error: 'Access denied', success: false };
      }

      this.dataAccess.validateFoundryState();

      return await this.dataAccess.getEnhancedCreatureIndex();
    } catch (error) {
      throw new Error(
        `Failed to get enhanced creature index: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle campaign progress update request
   */
  async handleUpdateCampaignProgress(data: {
    campaignId: string;
    partId: string;
    newStatus: string;
  }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to update campaign progress: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle set actor ownership request
   */
  async handleSetActorOwnership(data: any): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to set actor ownership: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle get actor ownership request
   */
  async handleGetActorOwnership(data: any): Promise<any> {
    try {
      // SECURITY: Silent GM validation
      const gmCheck = this.validateGMAccess();
      if (!gmCheck.allowed) {
        return { error: 'Access denied', success: false };
      }

      this.dataAccess.validateFoundryState();

      return await this.dataAccess.getActorOwnership(data);
    } catch (error) {
      throw new Error(
        `Failed to get actor ownership: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle get friendly NPCs request
   */
  async handleGetFriendlyNPCs(): Promise<any> {
    try {
      // SECURITY: Silent GM validation
      const gmCheck = this.validateGMAccess();
      if (!gmCheck.allowed) {
        return { error: 'Access denied', success: false };
      }

      this.dataAccess.validateFoundryState();

      return await this.dataAccess.getFriendlyNPCs();
    } catch (error) {
      throw new Error(
        `Failed to get friendly NPCs: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle get party characters request
   */
  async handleGetPartyCharacters(): Promise<any> {
    try {
      // SECURITY: Silent GM validation
      const gmCheck = this.validateGMAccess();
      if (!gmCheck.allowed) {
        return { error: 'Access denied', success: false };
      }

      this.dataAccess.validateFoundryState();

      return await this.dataAccess.getPartyCharacters();
    } catch (error) {
      throw new Error(
        `Failed to get party characters: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle get connected players request
   */
  async handleGetConnectedPlayers(): Promise<any> {
    try {
      // SECURITY: Silent GM validation
      const gmCheck = this.validateGMAccess();
      if (!gmCheck.allowed) {
        return { error: 'Access denied', success: false };
      }

      this.dataAccess.validateFoundryState();

      return await this.dataAccess.getConnectedPlayers();
    } catch (error) {
      throw new Error(
        `Failed to get connected players: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle find players request
   */
  async handleFindPlayers(data: any): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to find players: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle find actor request
   */
  async handleFindActor(data: any): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to find actor: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle list scenes request
   */
  private async handleListScenes(data: any): Promise<any> {
    try {
      // SECURITY: Silent GM validation
      const gmCheck = this.validateGMAccess();
      if (!gmCheck.allowed) {
        return { error: 'Access denied', success: false };
      }

      this.dataAccess.validateFoundryState();
      return await this.dataAccess.listScenes(data);
    } catch (error) {
      throw new Error(
        `Failed to list scenes: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle switch scene request
   */
  private async handleSwitchScene(data: any): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to switch scene: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle map generation request - uses hybrid architecture
   */
  private async handleGenerateMap(data: any): Promise<any> {
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
      const isSuccess =
        typeof response?.success === 'boolean' ? response.success : response?.status === 'success';

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
    } catch (error: any) {
      return {
        error: error.message,
        success: false,
      };
    }
  }

  /**
   * Handle map status check request - uses hybrid architecture
   */
  private async handleCheckMapStatus(data: any): Promise<any> {
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
      const isSuccess =
        typeof response?.success === 'boolean' ? response.success : response?.status === 'success';

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
    } catch (error: any) {
      return {
        error: error.message,
        success: false,
      };
    }
  }

  /**
   * Handle map job cancellation request - uses hybrid architecture
   */
  private async handleCancelMapJob(data: any): Promise<any> {
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
      const isSuccess =
        typeof response?.success === 'boolean' ? response.success : response?.status === 'success';

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
    } catch (error: any) {
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
  private async handleUploadGeneratedMap(data: any): Promise<any> {
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
      if (
        !safeFilename.endsWith('.png') &&
        !safeFilename.endsWith('.jpg') &&
        !safeFilename.endsWith('.jpeg')
      ) {
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
      const worldId = (game as any).world?.id || 'unknown-world';
      const uploadPath = `worlds/${worldId}/ai-generated-maps`;
      try {
        // Use the modern Foundry API (v13+) with fallback for older versions
        const FilePickerAPI =
          (globalThis as any).foundry?.applications?.apps?.FilePicker?.implementation ||
          (globalThis as any).FilePicker;

        await FilePickerAPI.createDirectory('data', uploadPath, { bucket: null });
        console.log(`[${MODULE_ID}] Directory created/verified: ${uploadPath}`);
      } catch (dirError: any) {
        // Directory might already exist, that's okay
        if (
          !dirError.message?.includes('EEXIST') &&
          !dirError.message?.includes('already exists')
        ) {
          console.warn(`[${MODULE_ID}] Directory creation warning:`, dirError.message);
        }
      }

      console.log(`[${MODULE_ID}] Uploading to FilePicker...`);
      // Upload using Foundry's FilePicker.upload method with modern API
      const FilePickerAPI =
        (globalThis as any).foundry?.applications?.apps?.FilePicker?.implementation ||
        (globalThis as any).FilePicker;
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
    } catch (error: any) {
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
  private async handleMoveToken(data: {
    tokenId: string;
    x: number;
    y: number;
    animate?: boolean;
  }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to move token: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle update token request
   */
  private async handleUpdateToken(data: {
    tokenId: string;
    updates: Record<string, any>;
  }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to update token: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle delete tokens request
   */
  private async handleDeleteTokens(data: { tokenIds: string[] }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to delete tokens: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle get token details request
   */
  private async handleGetTokenDetails(data: { tokenId: string }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to get token details: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle toggle token condition request
   */
  private async handleToggleTokenCondition(data: {
    tokenId: string;
    conditionId: string;
    active: boolean;
  }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to toggle token condition: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle get available conditions request
   */
  private async handleGetAvailableConditions(): Promise<any> {
    try {
      // SECURITY: Silent GM validation
      const gmCheck = this.validateGMAccess();
      if (!gmCheck.allowed) {
        return { error: 'Access denied', success: false };
      }

      this.dataAccess.validateFoundryState();

      return await this.dataAccess.getAvailableConditions();
    } catch (error) {
      throw new Error(
        `Failed to get available conditions: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle use item request (cast spell, use ability, consume item, etc.)
   */
  private async handleUseItem(data: {
    actorIdentifier: string;
    itemIdentifier: string;
    targets?: string[];
    options?: {
      consume?: boolean;
      configureDialog?: boolean;
      spellLevel?: number;
      versatile?: boolean;
    };
  }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to use item: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle search character items request
   */
  private async handleSearchCharacterItems(data: {
    characterIdentifier: string;
    query?: string;
    type?: string;
    category?: string;
    limit?: number;
  }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to search character items: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  // ===== WORLD ITEM MANAGEMENT =====

  /**
   * Handle create world-level items request
   */
  private async handleCreateWorldItems(data: {
    items: Array<{
      name: string;
      type: string;
      img?: string;
      system?: Record<string, any>;
    }>;
    folder?: string;
  }): Promise<any> {
    try {
      const gmCheck = this.validateGMAccess();
      if (!gmCheck.allowed) return { error: 'Access denied', success: false };

      this.dataAccess.validateFoundryState();

      if (!Array.isArray(data?.items) || data.items.length === 0) {
        throw new Error('items array is required and must not be empty');
      }

      const createParams: { items: typeof data.items; folder?: string } = { items: data.items };
      if (data.folder) createParams.folder = data.folder;
      return await this.dataAccess.createWorldItems(createParams);
    } catch (error) {
      throw new Error(
        `Failed to create world items: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle list world-level items request
   */
  private async handleListWorldItems(data: {
    type?: string;
    folder?: string;
    nameFilter?: string;
  }): Promise<any> {
    try {
      const gmCheck = this.validateGMAccess();
      if (!gmCheck.allowed) return { error: 'Access denied', success: false };

      this.dataAccess.validateFoundryState();

      const listParams: { type?: string; folder?: string; nameFilter?: string } = {};
      if (data?.type) listParams.type = data.type;
      if (data?.folder) listParams.folder = data.folder;
      if (data?.nameFilter) listParams.nameFilter = data.nameFilter;
      return await this.dataAccess.listWorldItems(listParams);
    } catch (error) {
      throw new Error(
        `Failed to list world items: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Handle update world-level items request
   */
  private async handleUpdateWorldItems(data: {
    updates: Array<{ id: string; name?: string; img?: string; system?: Record<string, any>; folder?: string }>;
  }): Promise<any> {
    try {
      const gmCheck = this.validateGMAccess();
      if (!gmCheck.allowed) return { error: 'Access denied', success: false };
      this.dataAccess.validateFoundryState();
      if (!Array.isArray(data?.updates) || data.updates.length === 0) {
        throw new Error('updates array is required and must not be empty');
      }
      return await this.dataAccess.updateWorldItems({ updates: data.updates });
    } catch (error) {
      throw new Error(
        `Failed to update world items: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private async handleAddActorItems(data: {
    actorIdentifier: string;
    items: Array<{
      name: string;
      type: string;
      img?: string;
      system?: Record<string, any>;
    }>;
  }): Promise<any> {
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
    } catch (error) {
      throw new Error(
        `Failed to add actor items: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private async handleDeleteActorItems(data: {
    actorIdentifier: string;
    itemIds: string[];
  }): Promise<any> {
    try {
      const gmCheck = this.validateGMAccess();
      if (!gmCheck.allowed) {
        return { error: 'Access denied', success: false };
      }

      this.dataAccess.validateFoundryState();

      if (!data?.actorIdentifier) {
        throw new Error('actorIdentifier is required');
      }
      if (!Array.isArray(data?.itemIds) || data.itemIds.length === 0) {
        throw new Error('itemIds array is required and must contain at least one entry');
      }

      return await this.dataAccess.deleteActorItems({
        actorIdentifier: data.actorIdentifier,
        itemIds: data.itemIds,
      });
    } catch (error) {
      throw new Error(
        `Failed to delete actor items: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Guard Management: Create Officer
   */
  private async handleCreateGuardOfficer(params: any): Promise<any> {
    const gmCheck = this.validateGMAccess();
    if (!gmCheck.allowed) return { error: 'GM access required' };

    try {
      const gm = (window as any).GuardManagement;
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
    } catch (error: any) {
      return { error: error?.message || String(error) };
    }
  }

  /**
   * Guard Management: List Officers
   */
  private async handleListGuardOfficers(params: any): Promise<any> {
    try {
      const gm = (window as any).GuardManagement;
      if (!gm?.officerManager) {
        return { error: 'guard-management module not available or not initialized' };
      }

      let officers = gm.officerManager.list();

      if (params?.organizationId) {
        officers = officers.filter((o: any) => o.organizationId === params.organizationId);
      }

      return { success: true, officers, total: officers.length };
    } catch (error: any) {
      return { error: error?.message || String(error) };
    }
  }

  /**
   * Guard Management: Delete Officer
   */
  private async handleDeleteGuardOfficer(params: any): Promise<any> {
    const gmCheck = this.validateGMAccess();
    if (!gmCheck.allowed) return { error: 'GM access required' };

    try {
      const gm = (window as any).GuardManagement;
      if (!gm?.officerManager) {
        return { error: 'guard-management module not available or not initialized' };
      }

      const deleted = gm.officerManager.delete(params.officerId);
      if (!deleted) {
        return { error: `Officer with id '${params.officerId}' not found` };
      }

      return { success: true, deletedId: params.officerId };
    } catch (error: any) {
      return { error: error?.message || String(error) };
    }
  }

  /**
   * Guard Management: Update Officer
   */
  private async handleUpdateGuardOfficer(params: any): Promise<any> {
    const gmCheck = this.validateGMAccess();
    if (!gmCheck.allowed) return { error: 'GM access required' };

    try {
      const gm = (window as any).GuardManagement;
      if (!gm?.officerManager) {
        return { error: 'guard-management module not available or not initialized' };
      }

      if (!params.officerId) return { error: 'officerId is required' };

      const updated = await gm.officerManager.update(params.officerId, params.data);
      if (!updated) {
        return { error: `Officer '${params.officerId}' not found or update failed` };
      }

      return { success: true, officer: updated };
    } catch (error: any) {
      return { error: error?.message || String(error) };
    }
  }

  /**
   * Actor Management: Update actor properties (img, name, biography, etc.)
   */
  /**
   * Folder management: Create a folder (and optional parent folder) for Actors
   */
  private async handleCreateFolder(params: any): Promise<any> {
    const gmCheck = this.validateGMAccess();
    if (!gmCheck.allowed) return { error: 'GM access required' };

    try {
      this.dataAccess.validateFoundryState();
      if (!params.name) return { error: 'name is required' };

      const type = params.type || 'Actor';

      // If parentName is given, find or create it first
      let parentId: string | null = null;
      if (params.parentName) {
        let parent = (game.folders as any)?.find(
          (f: any) => f.name === params.parentName && f.type === type && !f.folder
        );
        if (!parent) {
          parent = await (Folder as any).create({ name: params.parentName, type, folder: null });
        }
        parentId = parent.id;
      }

      // Find or create the target folder
      let folder = (game.folders as any)?.find(
        (f: any) => f.name === params.name && f.type === type && (parentId ? f.folder?.id === parentId : !f.folder)
      );
      if (!folder) {
        folder = await (Folder as any).create({ name: params.name, type, folder: parentId });
      }

      return { success: true, folderId: folder.id, name: folder.name, parentId };
    } catch (error: any) {
      return { error: error?.message || String(error) };
    }
  }

  /**
   * Folder management: Move an actor into a folder by folder ID or name path
   */
  private async handleMoveActorToFolder(params: any): Promise<any> {
    const gmCheck = this.validateGMAccess();
    if (!gmCheck.allowed) return { error: 'GM access required' };

    try {
      this.dataAccess.validateFoundryState();
      if (!params.actorId) return { error: 'actorId is required' };
      if (!params.folderId) return { error: 'folderId is required' };

      const actor = game.actors?.get(params.actorId);
      if (!actor) return { error: `Actor '${params.actorId}' not found` };

      await (actor as any).update({ folder: params.folderId });
      return { success: true, actorId: params.actorId, folderId: params.folderId };
    } catch (error: any) {
      return { error: error?.message || String(error) };
    }
  }

  private async handleCreateActor(params: any): Promise<any> {
    const gmCheck = this.validateGMAccess();
    if (!gmCheck.allowed) return { error: 'GM access required' };

    try {
      this.dataAccess.validateFoundryState();

      if (!params.name) return { error: 'name is required' };
      if (!params.type) return { error: 'type is required' };

      const actorData: any = {
        name: params.name,
        type: params.type,
      };
      if (params.img) actorData.img = params.img;
      if (params.system) actorData.system = params.system;

      const actor = await (Actor as any).create(actorData);
      return {
        success: true,
        actorId: actor.id,
        name: actor.name,
        img: actor.img,
      };
    } catch (error: any) {
      return { error: error?.message || String(error) };
    }
  }

  /**
   * Actor Management: Update embedded items on an actor
   */
  private async handleUpdateActorItems(params: any): Promise<any> {
    const gmCheck = this.validateGMAccess();
    if (!gmCheck.allowed) return { error: 'GM access required' };

    try {
      this.dataAccess.validateFoundryState();

      if (!params.actorId) return { error: 'actorId is required' };
      if (!Array.isArray(params.items) || params.items.length === 0) {
        return { error: 'items array is required' };
      }

      const actor = game.actors?.get(params.actorId);
      if (!actor) return { error: `Actor '${params.actorId}' not found` };

      const updated = await (actor as any).updateEmbeddedDocuments('Item', params.items);
      return { success: true, updated: updated.length };
    } catch (error: any) {
      return { error: error?.message || String(error) };
    }
  }

  /**
   * Returns all synthetic token actors on the active scene that share the given base actorId.
   * Covers both linked tokens (which proxy the base actor) and unlinked tokens (ActorDelta).
   */
  private getSceneTokenActors(actorId: string): any[] {
    const scene = (game as any).scenes?.active;
    if (!scene) return [];
    const actors: any[] = [];
    for (const token of scene.tokens) {
      if (token.actorId === actorId && token.actor) {
        actors.push(token.actor);
      }
    }
    return actors;
  }

  /**
   * Daggerheart: Create a new action inside a feature item's system.actions field.
   * Updates the base actor AND all token actors on the active scene (handles unlinked tokens).
   */
  private async handleCreateItemAction(params: any): Promise<any> {
    const gmCheck = this.validateGMAccess();
    if (!gmCheck.allowed) return { error: 'GM access required' };

    try {
      this.dataAccess.validateFoundryState();

      if (!params.actorId) return { error: 'actorId is required' };
      if (!params.itemId) return { error: 'itemId is required' };
      if (!params.actionData) return { error: 'actionData is required' };
      if (!params.actionData.type) return { error: 'actionData.type is required (e.g. "attack")' };

      const actionsTypes = (game as any).system?.api?.models?.actions?.actionsTypes;
      if (!actionsTypes) return { error: 'Daggerheart actionsTypes API not available' };

      const cls = actionsTypes[params.actionData.type];
      if (!cls) return { error: `Unknown action type '${params.actionData.type}'. Valid types: ${Object.keys(actionsTypes).join(', ')}` };

      // Anti-duplicate guard: refuse if the feature already has ≥1 action.
      // Deletion is broken in Daggerheart V14 — every create ADDS to existing actions.
      // If duplicates exist, use repair-item-actions first, then create-item-action.
      const guardActor = (game as any).actors?.get(params.actorId);
      if (guardActor) {
        const guardItem = guardActor.items.get(params.itemId);
        if (guardItem) {
          const existingCount = Object.keys((guardItem.system as any).actions?.toObject?.() ?? {}).length;
          if (existingCount >= 1) {
            return {
              error: `Feature '${guardItem.name}' already has ${existingCount} action(s). ` +
                     `Use repair-item-actions to clean it first, then create-item-action. ` +
                     `Creating on top of existing actions causes duplicates (Daggerheart V14 deletion is broken).`
            };
          }
        }
      }

      const actionId = (foundry as any).utils.randomID();
      const actionData = { ...params.actionData, _id: actionId, systemPath: params.actionData.systemPath ?? 'actions' };

      // Helper: apply action to a single actor instance
      const applyToActor = async (actor: any) => {
        const item = actor.items.get(params.itemId);
        if (!item) return;
        const actionInstance = new cls(actionData, { parent: item });
        // Insert the action. TypedObjectField always assigns sequential keys ("0", "1", ...)
        // regardless of the dot-notation key we use. The key in the ActionCollection will be
        // "0" (or the next available). We include _id: actionId as a placeholder.
        await item.update({ [`system.actions.${actionId}`]: { ...actionInstance.toObject(), _id: actionId } });

        // Post-fix: align _id to match the actual Collection key assigned by TypedObjectField.
        // Daggerheart builds the UUID as "...Action.{action._id}" and resolves it via
        // collection.get(action._id). If _id ≠ Collection key, fromUuid returns null → crash.
        // The Collection key is always a sequential integer ("0", "1", ...) set from _source keys.
        // We update _id in _source to match that key so the UUID resolves correctly.
        const freshItem = actor.items.get(params.itemId);
        const collection = freshItem?.system?.actions;
        if (collection) {
          // Find the entry whose current _id is still actionId (we just set it)
          for (const [mapKey, entry] of (collection as any).entries()) {
            const storedId = (entry as any)?._id ?? (entry as any)?._source?._id;
            if (storedId === actionId && mapKey !== actionId) {
              const rawSrc = (freshItem.toObject() as any).system?.actions?.[mapKey] ?? {};
              await freshItem.update({ [`system.actions.${mapKey}`]: { ...rawSrc, _id: mapKey } });
              break;
            }
          }
        }
      };

      // Update base actor
      const baseActor = (game as any).actors?.get(params.actorId);
      if (!baseActor) return { error: `Actor '${params.actorId}' not found` };
      if (!baseActor.items.get(params.itemId)) return { error: `Item '${params.itemId}' not found on actor '${params.actorId}'` };
      await applyToActor(baseActor);

      // Update all scene token actors (handles unlinked tokens with their own ActorDelta)
      for (const tokenActor of this.getSceneTokenActors(params.actorId)) {
        try { await applyToActor(tokenActor); } catch { /* token may not have this item */ }
      }

      return { success: true, actionId };
    } catch (error: any) {
      return { error: error?.message || String(error) };
    }
  }

  private async handleDeleteItemActions(params: any): Promise<any> {
    const gmCheck = this.validateGMAccess();
    if (!gmCheck.allowed) return { error: 'GM access required' };

    try {
      this.dataAccess.validateFoundryState();

      if (!params.actorId) return { error: 'actorId is required' };
      if (!params.itemId) return { error: 'itemId is required' };

      if (!params.clearAll && !(Array.isArray(params.actionIds) && params.actionIds.length > 0)) {
        return { error: 'Provide actionIds array or clearAll: true' };
      }

      // Helper: delete actions from a single actor instance.
      // Bypasses Daggerheart hooks (which throw on 'triggers') by building the remaining
      // actions object and writing it directly with diff:false + recursive:false.
      const clearFromActor = async (actor: any): Promise<number> => {
        const item = actor.items.get(params.itemId);
        if (!item) return 0;
        const existingActions = (item.system as any).actions?.toObject?.() ?? {};
        const idsToDelete = params.clearAll
          ? Object.keys(existingActions)
          : (params.actionIds as string[]).filter((id: string) => id in existingActions);
        if (idsToDelete.length === 0) return 0;

        if (params.clearAll) {
          // Use actor.updateEmbeddedDocuments with diff:false + noHooks:true.
          // diff:false prevents Foundry from computing a diff (which would generate
          // "-=id" deletion keys that crash Daggerheart's _onUpdate hook).
          // noHooks:true bypasses external hook callbacks.
          // This is the same approach used in handleFixItemActions which clears
          // system.actions reliably on both corrupt and live items.
          await (actor as any).updateEmbeddedDocuments(
            'Item',
            [{ _id: params.itemId, 'system.actions': {} }],
            { diff: false, noHooks: true }
          );
          return idsToDelete.length;
        }

        // Selective delete: deletion-key syntax.
        // Daggerheart's _preUpdate crashes when deletion keys are present:
        // it does this.actions.get(key).triggers where key is already removed from
        // the TypedObjectField Map → get() returns undefined → undefined.triggers → crash.
        // Fix: patch _preUpdate on the INSTANCE (shadows prototype) to swallow the crash
        // and return undefined (= "proceed"). The LevelDB write happens after _preUpdate,
        // so swallowing the crash here still persists the deletion to the database.
        const deleteUpdate: Record<string, null> = {};
        for (const id of idsToDelete) deleteUpdate[`system.actions.-=${id}`] = null;

        // Patch _preUpdate on the ITEM instance (DHFeature is an Item Document subclass).
        // DHFeature._preUpdate accesses changed.system.actions and calls
        // this.system.actions.get(key) which returns undefined for already-deleted keys → crash.
        // Wrapping in try/catch and returning undefined lets the update proceed.
        const origPreUpdate = (item as any)._preUpdate;
        (item as any)._preUpdate = async (...args: any[]) => {
          try { if (origPreUpdate) return await origPreUpdate.apply(item, args); }
          catch { return undefined; /* let update proceed despite Daggerheart trigger crash */ }
        };
        try {
          await item.update(deleteUpdate, { noHooks: true } as any);
        } finally {
          if (origPreUpdate !== undefined) (item as any)._preUpdate = origPreUpdate;
          else delete (item as any)._preUpdate;
        }
        return idsToDelete.length;
      };

      const baseActor = (game as any).actors?.get(params.actorId);
      if (!baseActor) return { error: `Actor '${params.actorId}' not found` };

      const removedBase = await clearFromActor(baseActor);

      // Also clear from all scene token actors (handles unlinked tokens with their own ActorDelta)
      for (const tokenActor of this.getSceneTokenActors(params.actorId)) {
        try { await clearFromActor(tokenActor); } catch { /* ignore */ }
      }

      const baseItem = baseActor.items.get(params.itemId);
      const remaining = baseItem ? Object.keys((baseItem.system as any).actions?.toObject?.() ?? {}).length : 0;
      return { success: true, removed: removedBase, remaining };
    } catch (error: any) {
      return { error: error?.message || String(error) };
    }
  }

  /**
   * Daggerheart: Fix duplicate actions by deleting the item and recreating it with one action.
   * Deletion via update API is broken in Daggerheart V14 (the devs even have a comment:
   * "Does not work. Unsure why. It worked in v13"). The only reliable approach is:
   * 1. Read the full item data (toObject)
   * 2. Keep only the first action in system.actions
   * 3. Delete the item (deleteEmbeddedDocuments)
   * 4. Recreate with the same _id and cleaned data (createEmbeddedDocuments)
   * Preserving _id ensures any existing scene tokens keep their reference to the item.
   */
  private async handleRepairItemActions(params: any): Promise<any> {
    const gmCheck = this.validateGMAccess();
    if (!gmCheck.allowed) return { error: 'GM access required' };

    try {
      this.dataAccess.validateFoundryState();
      if (!params.actorId) return { error: 'actorId is required' };
      if (!params.itemId)  return { error: 'itemId is required' };

      const repairOnActor = async (actor: any) => {
        const item = actor.items.get(params.itemId);
        if (!item) return null;

        // item.system.actions is an ActionCollection (extends Foundry Collection / Map-like).
        // Collection keys are sequential ints assigned by TypedObjectField ("0", "1", ...).
        // action._id is stored separately in _source._id and may differ from the Collection key.
        // Daggerheart builds UUID as "...Action.{action._id}" → fromUuid → collection.get(_id).
        // If _id ≠ key, the get() returns null → ".sheet" crash on right-click.
        // Fix: update _id in _source to match the Collection key (not the other way around —
        // the Collection key cannot be changed via item.update()).
        const collection = item.system?.actions;
        const collectionSize = (collection as any)?.size ?? 0;
        if (collectionSize === 0) return { alreadyClean: true };

        const entries: [string, any][] = [...(collection as any).entries()];
        const [firstKey, firstAction] = entries[0];
        const storedId = (firstAction as any)?._id ?? (firstAction as any)?._source?._id;
        const hasMismatch = storedId !== firstKey;

        // Skip if already clean: exactly 1 action AND no key mismatch AND no force override
        if (entries.length <= 1 && !hasMismatch && !params.force) return { alreadyClean: true };

        // item.toObject() returns deepClone(_source), so system.actions is the raw { "0": {...} } object
        const rawSourceActions = (item.toObject() as any).system?.actions ?? {};

        if (entries.length > 1) {
          // Multiple actions (duplicates): clear all and re-add only the first with _id = key
          const firstRaw = rawSourceActions[firstKey] ?? {};
          await actor.updateEmbeddedDocuments('Item', [{ _id: params.itemId, 'system.actions': {} }], { diff: false, noHooks: true });
          const freshItem = actor.items.get(params.itemId);
          await freshItem.update({ [`system.actions.${firstKey}`]: { ...firstRaw, _id: firstKey } });
        } else {
          // Single action with _id ≠ key: just update _id to match the key
          const firstRaw = rawSourceActions[firstKey] ?? {};
          await item.update({ [`system.actions.${firstKey}`]: { ...firstRaw, _id: firstKey } });
        }

        return { newId: params.itemId, removed: entries.length - 1, fixedKey: firstKey, originalId: storedId };
      };

      const baseActor = (game as any).actors?.get(params.actorId);
      if (!baseActor) return { error: `Actor '${params.actorId}' not found` };
      if (!baseActor.items.get(params.itemId)) return { error: `Item '${params.itemId}' not found` };

      const result = await repairOnActor(baseActor);

      for (const tokenActor of this.getSceneTokenActors(params.actorId)) {
        try { await repairOnActor(tokenActor); } catch { /* ignore token failures */ }
      }

      return { success: true, itemId: params.itemId, ...result };
    } catch (error: any) {
      return { error: error?.message || String(error) };
    }
  }

  /**
   * Daggerheart: Read all current actions on a feature item directly from Foundry memory.
   * Returns the real action IDs and names — reliable unlike get-character-entity which
   * always serializes system.actions as {}.
   * Use this before delete-item-actions to discover which IDs to remove.
   */
  private async handleGetItemActions(params: any): Promise<any> {
    const gmCheck = this.validateGMAccess();
    if (!gmCheck.allowed) return { error: 'GM access required' };

    try {
      this.dataAccess.validateFoundryState();
      if (!params.actorId) return { error: 'actorId is required' };
      if (!params.itemId)  return { error: 'itemId is required' };

      const actor = (game as any).actors?.get(params.actorId);
      if (!actor) return { error: `Actor '${params.actorId}' not found` };
      const item = actor.items.get(params.itemId);
      if (!item) return { error: `Item '${params.itemId}' not found` };

      // item.system.actions is an ActionCollection (extends Foundry Collection / Map-like).
      // IMPORTANT: do NOT call .toObject() on ActionCollection — it returns an array (losing keys).
      // Use .entries() to get [mapKey, actionInstance] pairs directly from the Collection.
      // The mapKey is the real storage key (set by TypedObjectField from _source keys).
      // action._id is stored in action._source._id.
      const rawActions = (item.system as any)?.actions;
      const entries: [string, any][] = [];

      if (rawActions && typeof (rawActions as any).entries === 'function') {
        for (const [k, v] of (rawActions as any).entries()) entries.push([k, v]);
      } else if (rawActions && typeof rawActions === 'object') {
        for (const [k, v] of Object.entries(rawActions as object)) entries.push([k, v]);
      }

      // GROUND TRUTH CHECK: replicate exactly what Daggerheart does when a user clicks/right-clicks
      // an action button. It builds the UUID "{item.uuid}.Action.{action.id}" and resolves it via
      // fromUuid(). If that returns null, the right-click handler crashes on ".sheet" of null.
      // This is the only check that cannot lie — it runs the same code path as the bug itself.
      // Do NOT trust mapKey/internalId comparison alone; this fromUuid result is authoritative.
      const actions: Record<string, any> = {};
      for (const [k, v] of entries) {
        const internalId = (v as any)?._id ?? (v as any)?._source?._id ?? k;
        const actionUuid = (v as any)?.uuid ?? `${item.uuid}.Action.${internalId}`;
        let clickable = false;
        try {
          const resolved = await (foundry as any).utils.fromUuid(actionUuid);
          clickable = resolved != null;
        } catch { clickable = false; }
        actions[k] = {
          name: (v as any)?.name,
          type: (v as any)?.type,
          internalId,
          keyMatchesId: k === internalId,
          uuid: actionUuid,
          clickable, // ← authoritative: true means right-click will NOT crash
        };
      }

      const broken = Object.values(actions).filter((a: any) => !a.clickable).length;

      return {
        itemId: params.itemId,
        itemName: item.name,
        count: Object.keys(actions).length,
        actionIds: Object.keys(actions),
        broken, // number of actions whose fromUuid resolves null → would crash on right-click
        actions,
      };
    } catch (error: any) {
      return { error: error?.message || String(error) };
    }
  }

  /**
   * Actor Management: Update an existing actor
   * Supports `folderPath` param: "Parent/Child" creates nested Actor folders and moves actor there.
   */
  private async handleUpdateActor(params: any): Promise<any> {
    const gmCheck = this.validateGMAccess();
    if (!gmCheck.allowed) return { error: 'GM access required' };

    try {
      this.dataAccess.validateFoundryState();

      if (!params.actorId) return { error: 'actorId is required' };
      if (!params.updates || typeof params.updates !== 'object') {
        return { error: 'updates object is required' };
      }

      const actor = game.actors?.get(params.actorId);
      if (!actor) return { error: `Actor '${params.actorId}' not found` };

      // Resolve folderPath → folder ID (creates folders as needed)
      if (params.folderPath) {
        const parts: string[] = (params.folderPath as string).split('/').map((s: string) => s.trim()).filter(Boolean);
        let parentId: string | null = null;
        for (const part of parts) {
          let folder = (game.folders as any)?.find(
            (f: any) => f.name === part && f.type === 'Actor' && (parentId ? f.folder?.id === parentId : !f.folder)
          );
          if (!folder) {
            folder = await (Folder as any).create({ name: part, type: 'Actor', folder: parentId });
          }
          parentId = folder.id;
        }
        params.updates.folder = parentId;
      }

      const updateData: any = { ...params.updates };
      await (actor as any).update(updateData);

      // Re-fetch to get updated values
      const updated = game.actors?.get(params.actorId);
      return {
        success: true,
        actorId: params.actorId,
        name: (updated as any)?.name,
        img: (updated as any)?.img,
        folder: (updated as any)?.folder?.id ?? null,
      };
    } catch (error: any) {
      return { error: error?.message || String(error) };
    }
  }

  /**
   * Actor Management: Add actor to the active scene as a token
   */
  private async handleAddActorToScene(params: any): Promise<any> {
    const gmCheck = this.validateGMAccess();
    if (!gmCheck.allowed) return { error: 'GM access required' };

    try {
      this.dataAccess.validateFoundryState();

      if (!params.actorId) return { error: 'actorId is required' };

      const scene = (game.scenes as any)?.active;
      if (!scene) return { error: 'No active scene found' };

      const actor = game.actors?.get(params.actorId);
      if (!actor) return { error: `Actor '${params.actorId}' not found` };

      // Determine placement position
      const x = params.x ?? Math.floor(scene.width / 2);
      const y = params.y ?? Math.floor(scene.height / 2);

      const tokenData = await (actor as any).getTokenDocument({ x, y });
      const [token] = await (scene as any).createEmbeddedDocuments('Token', [tokenData]);

      return {
        success: true,
        tokenId: token.id,
        actorId: params.actorId,
        x: token.x,
        y: token.y,
      };
    } catch (error: any) {
      return { error: error?.message || String(error) };
    }
  }
}
