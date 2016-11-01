'use strict';

/**
 * The data model for issues
 */
class Issue {
    /**
     * Create a new issue and push it to the remote source
     */
    static create(properties) {
        return new Promise((callback) => {
            let issue = new Issue(properties);

            ResourceHelper.addResource('issues', issue)
            .then(() => {
                callback(issue);
            });
        });
    }

    constructor(properties) {
        properties = properties || {};
        
        // Essential properties
        this.title = properties.title || 'New issue';
        this.description = properties.description || '';
        this.id = properties.id;
        
        // Optional properties
        this.column = properties.column || 0;
        this.type = properties.type || 0;
        this.priority = properties.priority || 0;
        this.estimate = properties.estimate || 0;
        this.version = properties.version;
        this.milestone = properties.milestone;
        this.comments = properties.comments || [];
        this.assignee = properties.assignee;
        this.deleted = false;
        
        if(properties.createdAt) {
            this.createdAt = new Date(properties.createdAt).getUnixTime();
        }

        if(properties.closedAt) {
            this.closedAt = new Date(properties.closedAt).getUnixTime();
        }

    }

    /**
     * Gets an object with all the baked values
     */
    getBakedValues() {
        let baked = {
            column: resources.issueColumns[this.column],
            type: resources.issueTypes[this.type],
            priority: resources.issuePriorities[this.priority],
            version: resources.versions[this.version],
            milestone: resources.milestones[this.milestone],
            assignee: resources.collaborators[this.assignee],
            estimate: resources.issueEstimates[this.estimate],
            createdAt: new Date(this.createdAt),
            closedAt: new Date(this.closedAt)
        };
        
        return baked;
    }

    /**
     * Check if issue is closed
     *
     * @returns {Boolean} closed
     */
    isClosed() {
        return this.column == window.resources.issueColumns.length - 1;
    }

    /**
     * Get estimated hours
     *
     * @returns {Number} hours
     */
    getEstimatedHours() {
        let estimate = window.resources.issueEstimates[this.estimate];

        if(estimate) {
            return parseFloat(estimate);
        } else {
            return 0;
        }
    }
}

module.exports = Issue;
