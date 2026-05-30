export declare class CampaignHooks {
    private isRegistered;
    constructor(_bridge: any);
    /**
     * Register campaign dashboard hooks
     */
    register(): void;
    /**
     * Unregister hooks (cleanup)
     */
    unregister(): void;
    /**
     * Handle journal sheet rendering to add interactive elements
     */
    private onRenderJournalSheet;
    /**
     * Process journal render after DOM is stable
     */
    private processJournalRender;
    /**
     * Handle status toggle clicks
     */
    private onStatusToggleClick;
    /**
     * Get current status from toggle element
     */
    private getCurrentStatus;
    /**
     * Get next status in cycle
     */
    private getNextStatus;
    /**
     * Update toggle visual appearance
     */
    private updateToggleVisual;
    /**
     * Get status icon
     */
    private getStatusIcon;
    /**
     * Format status for display
     */
    private formatStatus;
}
//# sourceMappingURL=campaign-hooks.d.ts.map