import { MODULE_ID } from './constants.js';
export class TransactionManager {
    moduleId = MODULE_ID;
    activeTransactions = new Map();
    transactionHistory = [];
    /**
     * Start a new transaction
     */
    startTransaction(description) {
        const transactionId = foundry.utils.randomID();
        const transaction = {
            id: transactionId,
            timestamp: new Date(),
            description,
            actions: [],
            completed: false,
            rolledBack: false,
        };
        this.activeTransactions.set(transactionId, transaction);
        return transactionId;
    }
    /**
     * Add an action to an active transaction
     */
    addAction(transactionId, action) {
        const transaction = this.activeTransactions.get(transactionId);
        if (!transaction) {
            throw new Error(`Transaction ${transactionId} not found or already completed`);
        }
        transaction.actions.push(action);
    }
    /**
     * Commit a transaction (mark as completed)
     */
    commitTransaction(transactionId) {
        const transaction = this.activeTransactions.get(transactionId);
        if (!transaction) {
            throw new Error(`Transaction ${transactionId} not found`);
        }
        transaction.completed = true;
        this.activeTransactions.delete(transactionId);
        // Add to history (keep last 50 transactions)
        this.transactionHistory.push(transaction);
        if (this.transactionHistory.length > 50) {
            this.transactionHistory.shift();
        }
    }
    /**
     * Rollback a transaction (undo all actions)
     */
    async rollbackTransaction(transactionId) {
        let transaction = this.activeTransactions.get(transactionId);
        // Also check completed transactions for rollback
        if (!transaction) {
            transaction = this.transactionHistory.find(t => t.id === transactionId);
        }
        if (!transaction) {
            throw new Error(`Transaction ${transactionId} not found`);
        }
        if (transaction.rolledBack) {
            throw new Error(`Transaction ${transactionId} has already been rolled back`);
        }
        const errors = [];
        // Rollback actions in reverse order
        for (let i = transaction.actions.length - 1; i >= 0; i--) {
            const action = transaction.actions[i];
            try {
                await this.rollbackAction(action);
            }
            catch (error) {
                const errorMsg = `Failed to rollback action ${i}: ${error instanceof Error ? error.message : 'Unknown error'}`;
                errors.push(errorMsg);
                console.error(`[${this.moduleId}]`, errorMsg);
            }
        }
        transaction.rolledBack = true;
        // Remove from active transactions if it was there
        this.activeTransactions.delete(transactionId);
        const success = errors.length === 0;
        return { success, errors };
    }
    /**
     * Rollback a specific action
     */
    async rollbackAction(action) {
        switch (action.type) {
            case 'create':
                await this.rollbackCreate(action);
                break;
            case 'update':
                await this.rollbackUpdate(action);
                break;
            case 'delete':
                await this.rollbackDelete(action);
                break;
            default:
                throw new Error(`Unknown action type: ${action.type}`);
        }
    }
    /**
     * Rollback a create action (delete the created entity)
     */
    async rollbackCreate(action) {
        if (!action.entityId) {
            throw new Error('Cannot rollback create action: missing entityId');
        }
        switch (action.entityType) {
            case 'Actor':
                const actor = game.actors.get(action.entityId);
                if (actor) {
                    await actor.delete();
                }
                break;
            case 'Token':
                // Find token in current scene
                const scene = game.scenes.current;
                if (scene) {
                    const token = scene.tokens.get(action.entityId);
                    if (token) {
                        await token.delete();
                    }
                }
                break;
            default:
                throw new Error(`Rollback not implemented for entity type: ${action.entityType}`);
        }
    }
    /**
     * Rollback an update action (restore original data)
     */
    async rollbackUpdate(action) {
        if (!action.entityId || !action.originalData) {
            throw new Error('Cannot rollback update action: missing entityId or originalData');
        }
        switch (action.entityType) {
            case 'Actor':
                const actor = game.actors.get(action.entityId);
                if (actor) {
                    await actor.update(action.originalData);
                }
                break;
            default:
                throw new Error(`Rollback not implemented for entity type: ${action.entityType}`);
        }
    }
    /**
     * Rollback a delete action (recreate the entity)
     */
    async rollbackDelete(action) {
        if (!action.originalData) {
            throw new Error('Cannot rollback delete action: missing originalData');
        }
        switch (action.entityType) {
            case 'Actor':
                await Actor.create(action.originalData);
                break;
            default:
                throw new Error(`Rollback not implemented for entity type: ${action.entityType}`);
        }
    }
    /**
     * Get active transactions
     */
    getActiveTransactions() {
        return Array.from(this.activeTransactions.values());
    }
    /**
     * Get transaction history
     */
    getTransactionHistory() {
        return [...this.transactionHistory];
    }
    /**
     * Clear old transactions from history
     */
    clearHistory() {
        this.transactionHistory = [];
    }
    /**
     * Cancel an active transaction without rollback (use for cleanup)
     */
    cancelTransaction(transactionId) {
        const transaction = this.activeTransactions.get(transactionId);
        if (transaction) {
            this.activeTransactions.delete(transactionId);
        }
    }
    /**
     * Create rollback action for actor creation
     */
    createActorCreationAction(actorId) {
        return {
            type: 'create',
            entityType: 'Actor',
            entityId: actorId,
        };
    }
    /**
     * Create rollback action for token creation
     */
    createTokenCreationAction(tokenId) {
        return {
            type: 'create',
            entityType: 'Token',
            entityId: tokenId,
        };
    }
}
// Export singleton instance
export const transactionManager = new TransactionManager();
//# sourceMappingURL=transaction-manager.js.map