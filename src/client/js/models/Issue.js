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
        
        // Optional params
        this.column = properties.column || 0;
        this.type = properties.type || 0;
        this.priority = properties.priority || 0;
        this.estimate = properties.estimate || 0;
        this.version = properties.version;
        this.milestone = properties.milestone;
        this.comments = properties.comments || [];
        this.assignee = properties.assignee;
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
            assignee: resources.collaborators[this.assignee]
        };

        if(baked.assignee) {
            baked.assignee = baked.assignee.name
        }

        if(baked.milestone) {
            baked.milestone = baked.milestone.title
        }

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
