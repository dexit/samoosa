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
