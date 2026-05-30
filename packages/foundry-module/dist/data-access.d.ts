interface CharacterInfo {
    id: string;
    name: string;
    type: string;
    img?: string;
    system: Record<string, unknown>;
    items: CharacterItem[];
    effects: CharacterEffect[];
    actions?: any[];
    itemVariants?: any[];
    itemToggles?: any[];
    spellcasting?: SpellcastingEntry[];
}
interface SpellcastingEntry {
    id: string;
    name: string;
    tradition?: string | undefined;
    type: string;
    ability?: string | undefined;
    dc?: number | undefined;
    attack?: number | undefined;
    slots?: Record<string, {
        value: number;
        max: number;
    }> | undefined;
    spells: SpellInfo[];
}
interface SpellInfo {
    id: string;
    name: string;
    level: number;
    prepared?: boolean | undefined;
    expended?: boolean | undefined;
    traits?: string[] | undefined;
    actionCost?: string | undefined;
    range?: string | undefined;
    target?: string | undefined;
    area?: string | undefined;
}
interface CharacterItem {
    id: string;
    name: string;
    type: string;
    img?: string;
    system: Record<string, unknown>;
}
interface CharacterEffect {
    id: string;
    name: string;
    icon?: string;
    disabled: boolean;
    duration?: {
        type: string;
        duration?: number;
        remaining?: number;
    };
}
interface CompendiumSearchResult {
    id: string;
    name: string;
    type: string;
    img?: string;
    pack: string;
    packLabel: string;
    system?: Record<string, unknown>;
    summary?: string;
    hasImage?: boolean;
    description?: string;
}
interface SceneInfo {
    id: string;
    name: string;
    img?: string;
    background?: string;
    width: number;
    height: number;
    padding: number;
    active: boolean;
    navigation: boolean;
    tokens: SceneToken[];
    walls: number;
    lights: number;
    sounds: number;
    notes: SceneNote[];
}
interface SceneToken {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    actorId?: string;
    img: string;
    hidden: boolean;
    disposition: number;
}
interface SceneNote {
    id: string;
    text: string;
    x: number;
    y: number;
}
interface WorldInfo {
    id: string;
    title: string;
    system: string;
    systemVersion: string;
    foundryVersion: string;
    users: WorldUser[];
}
interface WorldUser {
    id: string;
    name: string;
    active: boolean;
    isGM: boolean;
}
interface ActorCreationRequest {
    creatureType: string;
    customNames?: string[] | undefined;
    packPreference?: string | undefined;
    quantity?: number | undefined;
    addToScene?: boolean | undefined;
}
interface ActorCreationResult {
    success: boolean;
    actors: CreatedActorInfo[];
    errors?: string[] | undefined;
    tokensPlaced?: number;
    totalRequested: number;
    totalCreated: number;
}
interface CreatedActorInfo {
    id: string;
    name: string;
    originalName: string;
    type: string;
    sourcePackId: string;
    sourcePackLabel: string;
    img?: string;
}
interface CompendiumEntryFull {
    id: string;
    name: string;
    type: string;
    img?: string;
    pack: string;
    packLabel: string;
    system: Record<string, unknown>;
    items?: CompendiumItem[];
    effects?: CompendiumEffect[];
    fullData: Record<string, unknown>;
}
interface CompendiumItem {
    id: string;
    name: string;
    type: string;
    img?: string;
    system: Record<string, unknown>;
}
interface CompendiumEffect {
    id: string;
    name: string;
    icon?: string;
    disabled: boolean;
    duration?: Record<string, unknown>;
}
interface SceneTokenPlacement {
    actorIds: string[];
    placement: 'random' | 'grid' | 'center' | 'coordinates';
    hidden: boolean;
    coordinates?: {
        x: number;
        y: number;
    }[];
}
interface TokenPlacementResult {
    success: boolean;
    tokensCreated: number;
    tokenIds: string[];
    errors?: string[] | undefined;
}
export declare class FoundryDataAccess {
    private moduleId;
    private persistentIndex;
    constructor();
    /**
     * Force rebuild of enhanced creature index
     */
    rebuildEnhancedCreatureIndex(): Promise<{
        success: boolean;
        totalCreatures: number;
        message: string;
    }>;
    /**
     * Get character/actor information by name or ID
     */
    getCharacterInfo(identifier: string): Promise<CharacterInfo>;
    /**
     * Search within a character's items, spells, actions, and effects
     * More token-efficient than getCharacterInfo when you need specific items
     */
    searchCharacterItems(params: {
        characterIdentifier: string;
        query?: string | undefined;
        type?: string | undefined;
        category?: string | undefined;
        limit?: number | undefined;
    }): Promise<{
        characterId: string;
        characterName: string;
        query?: string;
        type?: string;
        category?: string;
        matches: Array<{
            id: string;
            name: string;
            type: string;
            description?: string;
            level?: number;
            prepared?: boolean;
            expended?: boolean;
            range?: string;
            target?: string;
            area?: string;
            actionCost?: string;
            traits?: string[];
            quantity?: number;
            equipped?: boolean;
            invested?: boolean;
            actionType?: string;
        }>;
        totalMatches: number;
    }>;
    /**
     * Extract spellcasting data from an actor (supports PF2e and D&D 5e)
     */
    private extractSpellcastingData;
    /**
     * Format PF2e action cost to human-readable string
     */
    private formatPF2eActionCost;
    /**
     * Extract PF2e spell slots from spellcasting entry data
     */
    private extractPF2eSpellSlots;
    /**
     * Extract D&D 5e spell slots from actor system data
     */
    private extractDnD5eSpellSlots;
    /**
     * Extract spell targeting info for D&D 5e
     * D&D 5e spells have: target.type ("self", "creature", "point", etc.), range.value, range.units
     */
    private extractDnD5eSpellTargeting;
    /**
     * Extract spell targeting info for PF2e
     * PF2e spells have: target (string), range.value, area.type, area.value
     */
    private extractPF2eSpellTargeting;
    /**
     * Extract spell targeting info for DSA5
     * DSA5 spells have: targetCategory, range, etc.
     */
    private extractDSA5SpellTargeting;
    /**
     * Search compendium packs for items matching query with optional filters
     */
    searchCompendium(query: string, packType?: string, filters?: {
        challengeRating?: number | {
            min?: number;
            max?: number;
        };
        creatureType?: string;
        size?: string;
        alignment?: string;
        hasLegendaryActions?: boolean;
        spellcaster?: boolean;
    }): Promise<CompendiumSearchResult[]>;
    /**
     * Check if filters should be applied to this entry
     */
    private shouldApplyFilters;
    /**
     * Check if entry passes all specified filters
     * @unused - Replaced with simple index-only approach
     */
    private passesFilters;
    /**
     * Calculate relevance score for search result ranking
     */
    private calculateRelevanceScore;
    /**
     * List creatures by criteria using enhanced persistent index - optimized for instant filtering
     */
    listCreaturesByCriteria(criteria: {
        challengeRating?: number | {
            min?: number;
            max?: number;
        };
        creatureType?: string;
        size?: string;
        hasSpells?: boolean;
        hasLegendaryActions?: boolean;
        limit?: number;
    }): Promise<{
        creatures: any[];
        searchSummary: any;
    }>;
    /**
     * Check if enhanced creature passes all specified criteria (system-aware routing).
     *
     * Discriminator order matters: cosmere-rpg has a `tier` field, pf2e has
     * `level`, dnd5e has `challengeRating`. Check cosmere first (tier is the
     * narrowest signal), then pf2e, then fall through to dnd5e.
     */
    private passesEnhancedCriteria;
    /**
     * Cosmere RPG criteria filter — tier, role, creatureType, size,
     * hasInvestiture, hitPoints range, defenses minimums, deflect minimum.
     */
    private passesCosmereRpgCriteria;
    /**
     * Check if D&D 5e creature passes all specified criteria
     */
    private passesDnD5eCriteria;
    /**
     * Check if PF2e creature passes all specified criteria
     */
    private passesPF2eCriteria;
    /**
     * Fallback to basic creature search if enhanced index fails
     */
    private fallbackBasicCreatureSearch;
    /**
     * Prioritize compendium packs by likelihood of containing relevant creatures
     * @unused - Replaced by enhanced persistent index system
     */
    private prioritizePacksForCreatures;
    /**
     * Get priority score for a pack based on ID and label
     */
    private getPackPriority;
    /**
     * Check if creature entry passes the given criteria
     * @unused - Legacy method replaced by passesEnhancedCriteria
     */
    private passesCriteria;
    /**
     * Simple name/description-based matching for creatures using index data only
     */
    private matchesSearchCriteria;
    /**
     * List all actors with basic information
     */
    listActors(): Promise<Array<{
        id: string;
        name: string;
        type: string;
        img?: string;
    }>>;
    /**
     * Get active scene information
     */
    getActiveScene(): Promise<SceneInfo>;
    /**
     * Get world information
     */
    getWorldInfo(): Promise<WorldInfo>;
    /**
     * Get available compendium packs
     */
    getAvailablePacks(): Promise<{
        id: any;
        label: any;
        type: any;
        system: any;
        private: any;
    }[]>;
    /**
     * Sanitize data to remove sensitive information and make it JSON-safe
     */
    private sanitizeData;
    /**
     * Remove sensitive fields from data object with circular reference protection
     * Returns a sanitized copy instead of modifying the original
     */
    private removeSensitiveFields;
    /**
     * Check if a field should be excluded from sanitized output
     */
    private isSensitiveOrProblematicField;
    /**
     * Custom JSON serializer that handles Foundry objects safely
     */
    private safeJSONStringify;
    /**
     * Get token disposition as number
     */
    private getTokenDisposition;
    /**
     * Validate that Foundry is ready and world is active
     */
    validateFoundryState(): void;
    /**
     * Audit log for write operations
     */
    private auditLog;
    /**
     * Create journal entry for quests, with optional additional pages
     */
    createJournalEntry(request: {
        name: string;
        content: string;
        folderName?: string;
        additionalPages?: Array<{
            name: string;
            content: string;
        }>;
    }): Promise<{
        id: string;
        name: string;
        pageCount: number;
    }>;
    /**
     * List all journal entries with page metadata
     */
    listJournals(): Promise<Array<{
        id: string;
        name: string;
        type: string;
        pageCount: number;
        pages: Array<{
            id: string;
            name: string;
            type: string;
        }>;
    }>>;
    /**
     * Get journal entry content (first text page + page manifest)
     */
    getJournalContent(journalId: string): Promise<{
        content: string;
        currentPage?: {
            id: string;
            name: string;
        } | undefined;
        allPages: Array<{
            id: string;
            name: string;
            type: string;
        }>;
        pageCount: number;
        note?: string | undefined;
    } | null>;
    /**
     * Get a specific journal page's content by ID
     */
    getJournalPageContent(journalId: string, pageId: string): Promise<{
        id: string;
        name: string;
        type: string;
        content: string;
    } | null>;
    /**
     * Update journal entry content
     * - No pageId/newPageName: update first text page (backward compat)
     * - With pageId: update that specific page
     * - With newPageName (no pageId): create a new page
     */
    updateJournalContent(request: {
        journalId: string;
        content: string;
        pageId?: string | undefined;
        newPageName?: string | undefined;
    }): Promise<{
        success: boolean;
        pageId?: string | undefined;
        pageName?: string | undefined;
    }>;
    /**
     * Create actors from compendium entries with custom names
     */
    createActorFromCompendium(request: ActorCreationRequest): Promise<ActorCreationResult>;
    /**
     * Create actor from specific compendium entry using pack/item IDs
     */
    createActorFromCompendiumEntry(request: {
        packId: string;
        itemId: string;
        customNames: string[];
        quantity?: number;
        addToScene?: boolean;
        placement?: {
            type: 'random' | 'grid' | 'center' | 'coordinates';
            coordinates?: {
                x: number;
                y: number;
            }[];
        };
    }): Promise<ActorCreationResult>;
    /**
     * Add one or more freshly-authored Item documents to an existing Actor.
     *
     * Unlike `createActorFromCompendium*`, the items here are constructed from
     * caller-supplied data — no compendium lookup. This is the path used to
     * push planner-authored content (talents, actions, powers, custom gear)
     * onto a PC or NPC sheet.
     *
     * Validation is intentionally light: name + type are required, and the
     * type is checked against the active system's declared Item document
     * types when available. Everything else (system schema validation,
     * required sub-fields) is delegated to Foundry's DataModel layer, which
     * will fill defaults or throw a meaningful error.
     */
    addActorItems(params: {
        actorIdentifier: string;
        items: Array<{
            name: string;
            type: string;
            img?: string;
            system?: Record<string, any>;
        }>;
    }): Promise<{
        actorId: string;
        actorName: string;
        created: Array<{
            id: string;
            name: string;
            type: string;
        }>;
    }>;
    /**
     * Get full compendium document with all embedded data
     */
    getCompendiumDocumentFull(packId: string, documentId: string): Promise<CompendiumEntryFull>;
    /**
     * Add actors to the current scene as tokens
     */
    addActorsToScene(placement: SceneTokenPlacement, transactionId?: string): Promise<TokenPlacementResult>;
    /**
     * Find best matching compendium entry for creature type
     */
    private findBestCompendiumMatch;
    /**
     * Create actor from source document with custom name
     */
    private createActorFromSource;
    /**
     * Calculate token position based on placement strategy
     */
    private calculateTokenPosition;
    /**
     * Validate write operation permissions
     */
    validateWritePermissions(operation: 'createActor' | 'modifyScene'): Promise<{
        allowed: boolean;
        reason?: string;
        requiresConfirmation?: boolean;
        warnings?: string[];
    }>;
    /**
     * Request player rolls - creates interactive roll buttons in chat
     */
    requestPlayerRolls(data: {
        rollType: string;
        rollTarget: string;
        targetPlayer: string;
        isPublic: boolean;
        rollModifier: string;
        flavor: string;
    }): Promise<{
        success: boolean;
        message: string;
        error?: string;
    }>;
    /**
     * Enhanced player resolution with offline/non-existent player detection
     * Supports partial matching and provides structured error messages for MCP
     */
    private resolveTargetPlayer;
    /**
     * Build roll formula based on roll type and target using Foundry's roll data system
     */
    private buildRollFormula;
    /**
     * Map skill names to D&D 5e skill codes
     */
    private getSkillCode;
    /**
     * Build roll button label
     */
    private buildRollButtonLabel;
    /**
     * Restore roll button states from persistent storage
     * Called when chat messages are rendered to maintain state across sessions
     */
    /**
     * Attach click handlers to roll buttons and handle visibility
     * Called by global renderChatMessageHTML hook in main.ts
     */
    attachRollButtonHandlers(html: JQuery): void;
    /**
     * Get enhanced creature index for campaign analysis
     */
    getEnhancedCreatureIndex(): Promise<any[]>;
    /**
     * Save roll button state to persistent storage
     */
    saveRollState(buttonId: string, userId: string): Promise<void>;
    /**
     * Get roll button state from persistent storage
     */
    getRollState(buttonId: string): {
        rolled: boolean;
        rolledBy?: string;
        rolledByName?: string;
        timestamp?: number;
    } | null;
    /**
     * Save button ID to message ID mapping for ChatMessage updates
     */
    saveRollButtonMessageId(buttonId: string, messageId: string): void;
    /**
     * Get message ID for a roll button
     */
    getRollButtonMessageId(buttonId: string): string | null;
    /**
     * Get roll button state from ChatMessage flags
     */
    getRollStateFromMessage(chatMessage: any, buttonId: string): any;
    /**
     * Update the ChatMessage to replace button with rolled state
     */
    updateRollButtonMessage(buttonId: string, userId: string, rollLabel: string): Promise<void>;
    /**
     * Request GM to save roll state (for non-GM users who can't write to world settings)
     */
    requestRollStateSave(buttonId: string, userId: string): void;
    /**
     * Broadcast roll state change to all connected users for real-time sync
     */
    broadcastRollState(_buttonId: string, _rollState: any): void;
    /**
     * Clean up old roll states (optional maintenance)
     * Removes roll states older than 30 days to prevent storage bloat
     */
    cleanOldRollStates(): Promise<number>;
    /**
     * Set actor ownership permission for a user
     */
    setActorOwnership(data: {
        actorId: string;
        userId: string;
        permission: number;
    }): Promise<{
        success: boolean;
        message: string;
        error?: string;
    }>;
    /**
     * Get actor ownership information
     */
    getActorOwnership(data: {
        actorIdentifier?: string;
        playerIdentifier?: string;
    }): Promise<any>;
    /**
     * Find actor by name or ID
     */
    private findActorByIdentifier;
    /**
     * Get friendly NPCs from current scene
     */
    getFriendlyNPCs(): Promise<Array<{
        id: string;
        name: string;
    }>>;
    /**
     * Get party characters (player-owned actors)
     */
    getPartyCharacters(): Promise<Array<{
        id: string;
        name: string;
    }>>;
    /**
     * Get connected players (excluding GM)
     */
    getConnectedPlayers(): Promise<Array<{
        id: string;
        name: string;
    }>>;
    /**
     * Find players by identifier with partial matching
     */
    findPlayers(data: {
        identifier: string;
        allowPartialMatch?: boolean;
        includeCharacterOwners?: boolean;
    }): Promise<Array<{
        id: string;
        name: string;
    }>>;
    /**
     * Find single actor by identifier
     */
    findActor(data: {
        identifier: string;
    }): Promise<{
        id: string;
        name: string;
    } | null>;
    private rollButtonProcessingStates;
    /**
     * Check if a roll button is currently being processed
     */
    private isRollButtonProcessing;
    /**
     * Set roll button processing state
     */
    private setRollButtonProcessing;
    /**
     * Get or create a folder for organizing MCP-generated content
     */
    private getOrCreateFolder;
    /**
     * Get or create a nested folder path for Items (e.g. "Parent/Child").
     * Returns the ID of the deepest folder in the path.
     */
    private getOrCreateNestedItemFolder;
    /**
     * Update existing world-level Item documents by ID.
     */
    updateWorldItems(params: {
        updates: Array<{
            id: string;
            name?: string;
            img?: string;
            system?: Record<string, any>;
            folder?: string;
        }>;
    }): Promise<{
        updated: Array<{
            id: string;
            name: string;
        }>;
        errors: string[];
    }>;
    /**
     * Create world-level Item documents, optionally organised into nested folders.
     * Folder path uses "/" as separator, e.g. "Recursos del Bosque/Hongos".
     */
    createWorldItems(params: {
        items: Array<{
            name: string;
            type: string;
            img?: string;
            system?: Record<string, any>;
        }>;
        folder?: string;
    }): Promise<{
        created: Array<{
            id: string;
            name: string;
            type: string;
        }>;
        errors: string[];
    }>;
    /**
     * List world-level Item documents with optional filters.
     */
    listWorldItems(params: {
        type?: string;
        folder?: string;
        nameFilter?: string;
    }): Promise<Array<{
        id: string;
        name: string;
        type: string;
        folder: string | null;
    }>>;
    /**
     * List all scenes with filtering options
     */
    listScenes(options?: {
        filter?: string;
        include_active_only?: boolean;
    }): Promise<any[]>;
    /**
     * Switch to a different scene
     */
    switchScene(options: {
        scene_identifier: string;
        optimize_view?: boolean;
    }): Promise<any>;
    /**
     * Get detailed information about a specific entity within a character (item, action, or effect)
     */
    getCharacterEntity(data: {
        characterIdentifier: string;
        entityIdentifier: string;
    }): Promise<any>;
    /**
     * Move a token to a new position on the scene
     */
    moveToken(data: {
        tokenId: string;
        x: number;
        y: number;
        animate?: boolean;
    }): Promise<any>;
    /**
     * Update token properties
     */
    updateToken(data: {
        tokenId: string;
        updates: Record<string, any>;
    }): Promise<any>;
    /**
     * Delete one or more tokens from the scene
     */
    deleteTokens(data: {
        tokenIds: string[];
    }): Promise<any>;
    /**
     * Get detailed information about a token
     */
    getTokenDetails(data: {
        tokenId: string;
    }): Promise<any>;
    /**
     * Toggle a status condition on a token
     */
    toggleTokenCondition(data: {
        tokenId: string;
        conditionId: string;
        active: boolean;
    }): Promise<any>;
    /**
     * Get all available conditions for the current game system
     */
    getAvailableConditions(): Promise<any>;
    /**
     * Move a token to a new position
     */
    /**
     * Use an item on a character (cast spell, use ability, consume item, etc.)
     * This triggers the item's default use behavior in Foundry VTT
     */
    useItem(params: {
        actorIdentifier: string;
        itemIdentifier: string;
        targets?: string[] | undefined;
        options?: {
            consume?: boolean | undefined;
            configureDialog?: boolean | undefined;
            skipDialog?: boolean | undefined;
            spellLevel?: number | undefined;
            versatile?: boolean | undefined;
        } | undefined;
    }): Promise<{
        success: boolean;
        status?: string;
        message: string;
        itemName?: string;
        actorName?: string;
        targets?: string[];
        requiresGMInteraction?: boolean;
    }>;
}
export {};
//# sourceMappingURL=data-access.d.ts.map