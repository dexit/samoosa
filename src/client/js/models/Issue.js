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
            let issue = new Issue();

            issue.index = window.resources.issues.length;
            window.resources.issues[issue.index] = issue;

            if(properties) {
                for(let k in properties) {
                    issue[k] = properties[k];
                }
            }

            ResourceHelper.addResource('issues', issue)
            .then(() => {
                callback(issue);
            });
        });
    }

    constructor(properties) {
        if(properties) {
            this.adopt(properties);
        } else {
            this.useStandard();
        }
    }

    /**
     * Apply standard values
     */
    useStandard() {
        this.title = 'New issue';
        this.description = '';
        this.reporter;
        this.column = 0;

        // Labels for types are defined by plugin
        this.type = 0;

        // Labels for properties are defined by plugin
        this.priority = 3;
        
        // Optional params
        this.estimate;
        this.version;
        this.milestone;
        this.comments = [];
        this.labels = [];
        this.assignee;
    }

    /**
     * Check is issue is closed
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

    /**
     * Adopt properties into this model
     */
    adopt(properties) {
        for(let k in properties) {
            this[k] = properties[k];
        }
    }
}

module.exports = Issue;
