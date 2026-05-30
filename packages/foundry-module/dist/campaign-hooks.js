// Campaign Dashboard Interactive Hooks
// Implements clickable status toggles using Foundry's native hook system
export class CampaignHooks {
    isRegistered = false;
    constructor(_bridge) {
        // Bridge not needed for direct Foundry flag approach
    }
    /**
     * Register campaign dashboard hooks
     */
    register() {
        if (this.isRegistered)
            return;
        // Try multiple potential hook names for different Foundry versions
        const hookNames = [
            'renderJournalTextPageSheet',
            'renderJournalPageSheet',
            'renderJournalSheet',
            'renderJournalEntryPageSheet',
            'renderApplication',
        ];
        hookNames.forEach(hookName => {
            Hooks.on(hookName, (app, html, data) => {
                this.onRenderJournalSheet(app, html, data);
            });
        });
        this.isRegistered = true;
    }
    /**
     * Unregister hooks (cleanup)
     */
    unregister() {
        if (!this.isRegistered)
            return;
        // Note: Foundry VTT doesn't have Hooks.off, so we just mark as unregistered
        // The hooks will be cleaned up when the module is disabled
        this.isRegistered = false;
    }
    /**
     * Handle journal sheet rendering to add interactive elements
     */
    onRenderJournalSheet(app, html, _data) {
        try {
            // Extra defensive checks before processing
            if (!app || !html || app._state === -1) {
                return;
            }
            // Small delay to avoid race condition with Foundry's internal DOM manipulation
            setTimeout(() => {
                // Double-check the app is still valid after delay
                if (!app || app._state === -1 || app.closing) {
                    return;
                }
                this.processJournalRender(app, html, _data);
            }, 50);
        }
        catch (error) {
            console.error('Error in journal sheet render handler:', error);
        }
    }
    /**
     * Process journal render after DOM is stable
     */
    processJournalRender(app, html, _data) {
        try {
            // Defensive checks to prevent null errors during journal close/destruction
            if (!app || !html)
                return;
            // Check if app is being closed or destroyed
            if (app._state === -1 || app.closing) {
                return;
            }
            // Convert html to jQuery if it isn't already
            const $html = html.jquery ? html : $(html);
            // Additional DOM validation - ensure the HTML element exists and is connected
            if (!$html[0] || !$html[0].isConnected) {
                return;
            }
            // Only process if this looks like a campaign dashboard
            const isCampaignDashboard = (app.object?.name || app.object?.parent?.name || '')?.includes('Campaign Dashboard') ||
                $html.find('.campaign-status-toggle').length > 0;
            if (!isCampaignDashboard) {
                return;
            }
            // Try different ways to get the journal entry
            let entry = app.object;
            if (!entry && app.document) {
                entry = app.document.parent || app.document;
            }
            if (entry?.parent) {
                entry = entry.parent; // JournalEntryPage -> JournalEntry
            }
            if (!entry && app.document?.parent) {
                entry = app.document.parent;
            }
            // Early return if we can't get a valid entry to save flags to
            if (!entry || typeof entry.getFlag !== 'function') {
                return;
            }
            // Load previously saved status flags (if any) for this entry
            const statusFlags = entry.getFlag('world', 'campaignStatus') || {};
            // Find all campaign status toggle elements with defensive error handling
            let statusToggles;
            try {
                statusToggles = $html.find('.campaign-status-toggle');
            }
            catch (error) {
                // If DOM query fails, journal is likely being destroyed
                return;
            }
            if (!statusToggles || statusToggles.length === 0) {
                return;
            }
            // Set initial state of each status toggle element based on saved flags
            statusToggles.each((_index, element) => {
                const $element = $(element);
                const campaignId = $element.data('campaign-id');
                const partId = $element.data('part-id');
                if (!campaignId || !partId) {
                    console.warn('[Campaign Status] Toggle missing data attributes:', element);
                    return;
                }
                const flagKey = `${campaignId}-${partId}`;
                const savedStatus = statusFlags[flagKey];
                if (savedStatus) {
                    // Update element to match saved status
                    this.updateToggleVisual($element, savedStatus);
                }
            });
            // Attach click handlers to each toggle
            statusToggles.on('click', (event) => {
                this.onStatusToggleClick(event, entry, statusFlags);
            });
        }
        catch (error) {
            console.error('Error setting up campaign dashboard interactivity:', error);
        }
    }
    /**
     * Handle status toggle clicks
     */
    async onStatusToggleClick(event, entry, statusFlags) {
        try {
            event.preventDefault();
            event.stopPropagation();
            const target = $(event.currentTarget);
            const campaignId = target.data('campaign-id');
            const partId = target.data('part-id');
            if (!campaignId || !partId) {
                console.warn('[Campaign Status] Click on toggle missing data attributes');
                return;
            }
            // Only allow GM to modify campaign progress
            if (!game.user?.isGM) {
                ui.notifications?.warn('Only GMs can modify campaign progress');
                return;
            }
            const flagKey = `${campaignId}-${partId}`;
            const currentStatus = this.getCurrentStatus(target);
            const nextStatus = this.getNextStatus(currentStatus);
            // Update visual immediately for responsiveness
            this.updateToggleVisual(target, nextStatus);
            // Update the flags object
            statusFlags[flagKey] = nextStatus;
            try {
                // Persist the new state in the journal entry's flags
                await entry.setFlag('world', 'campaignStatus', statusFlags);
                // Success - no notification banner needed (visual feedback already provided by toggle)
            }
            catch (error) {
                console.error('[Campaign Status] Failed to save status:', error);
                ui.notifications?.error('Failed to save campaign progress');
                // Revert visual change on error
                this.updateToggleVisual(target, currentStatus);
            }
        }
        catch (error) {
            console.error('Error handling status toggle click:', error);
            ui.notifications?.error('Failed to update campaign progress');
        }
    }
    /**
     * Get current status from toggle element
     */
    getCurrentStatus(toggle) {
        if (toggle.hasClass('not-started'))
            return 'not_started';
        if (toggle.hasClass('in-progress'))
            return 'in_progress';
        if (toggle.hasClass('completed'))
            return 'completed';
        if (toggle.hasClass('skipped'))
            return 'skipped';
        return 'not_started'; // default
    }
    /**
     * Get next status in cycle
     */
    getNextStatus(current) {
        const cycle = ['not_started', 'in_progress', 'completed', 'skipped'];
        const currentIndex = cycle.indexOf(current);
        const nextIndex = (currentIndex + 1) % cycle.length;
        return cycle[nextIndex];
    }
    /**
     * Update toggle visual appearance
     */
    updateToggleVisual(toggle, newStatus) {
        // Remove all status classes
        toggle.removeClass('not-started in-progress completed skipped');
        // Add new status class
        const cssClass = newStatus.replace('_', '-');
        toggle.addClass(cssClass);
        // Update icon and text
        const statusIcon = this.getStatusIcon(newStatus);
        const statusDisplay = this.formatStatus(newStatus);
        toggle.html(`${statusIcon} ${statusDisplay}`);
        toggle.attr('title', `Click to change status: ${statusDisplay}`);
    }
    /**
     * Get status icon
     */
    getStatusIcon(status) {
        const icons = {
            not_started: '⚪',
            in_progress: '🔄',
            completed: '✅',
            skipped: '⏭️',
        };
        return icons[status] || '❓';
    }
    /**
     * Format status for display
     */
    formatStatus(status) {
        return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
}
//# sourceMappingURL=campaign-hooks.js.map