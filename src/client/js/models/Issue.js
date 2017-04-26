'use strict';

/**
 * The data model for issues
 */
class Issue {
    constructor(properties) {
        properties = properties || {};
        
        // Essential properties
        this.title = properties.title || 'New issue';
        this.description = properties.description || '';
        this.id = properties.id;
        this.reporter = properties.reporter;

        // Optional properties
        this.column = properties.column || 0;
        this.type = properties.type || 0;
        this.tags = properties.tags || [];
        this.priority = properties.priority || 0;
        this.estimate = properties.estimate || 0;
        this.version = properties.version;
        this.milestone = properties.milestone;
        this.comments = properties.comments || [];
        this.assignee = properties.assignee;
        this.createdAt = properties.createdAt;
        this.closedAt = properties.closedAt;
        this.deleted = false;
    }

    /**
     * Parses the description for meta data and assigns the cleaned up description
     * Meta data is using the {% key:value %} notation
     *
     * @param {String} description
     */
    setDescriptionWithMetaData(description) {
        if(!description) { return; }

        let tagRegex = /{% (\w+):(.+) %}/g;
        let nextMatch = tagRegex.exec(description);

        while(nextMatch != null) {
            let key = nextMatch[1];
            let value = nextMatch[2];

            if(key && value) {
                switch(key) {
                    case 'column':
                        this.column = ResourceHelper.getIssueColumn(value);
                        break;
                    
                    case 'type':
                        this.type = ISSUE_TYPES[value];
                        break;
                    
                    case 'tags':
                        this.tags = value.split(',');
                        break;
                    
                    case 'priority':
                        this.priority = ISSUE_PRIORITIES[value];
                        break;
                    
                    case 'estimate':
                        this.estimate = ISSUE_ESTIMATES[value];
                        break;
                    
                    case 'version':
                        this.version = ResourceHelper.getVersion(value);
                        break;
                
                    default:
                        this[key] = value;
                        break;    
                }
            }

            nextMatch = tagRegex.exec(this.description);
        }

        this.description = description.replace(tagRegex, '');
    }

    /**
     * Gets the attachments
     *
     * @returns {Promise} Array of attachments
     */
    getAttachments() {
        return ApiHelper.getIssueAttachments(this);
    }

    /**
     * Gets the title
     *
     * @returns {String} Title
     */
    getTitle() {
        return this.title;
    }
    
    /**
     * Gets the description
     *
     * @returns {String} Description
     */
    getDescription() {
        return this.description;
    }
    
    /**
     * Gets column
     *
     * @returns {String} Column name
     */
    getColumn() {
        return resources.issueColumns[this.column || 0];
    }
    
    /**
     * Gets type
     *
     * @returns {String} Type name
     */
    getType() {
        return getKey(ISSUE_TYPES, this.type || 0);
    }

    /**
     * Gets priority
     *
     * @returns {String} Priority name
     */
    getPriority() {
        return getKey(ISSUE_PRIORITIES, this.priority || 0);
    }

    /**
     * Gets version
     *
     * @returns {String} Version name
     */
    getVersion() {
        return resources.versions[this.version];
    }

    /**
     * Gets milestone
     *
     * @returns {Milestone} Milestone object
     */
    getMilestone() {
        return resources.milestones[this.milestone];
    }

    /**
     * Gets comments
     *
     * @returns {Array} Comments
     */
    getComments() {
        return this.comments || [];
    }

    /**
     * Gets assignee
     *
     * @returns {Collaborator} Collaborator object
     */
    getAssignee() {
        return resources.collaborators[this.assignee];
    }
    
    /**
     * Gets reporter
     *
     * @returns {Collaborator} Collaborator object
     */
    getReporter() {
        return resources.collaborators[this.reporter];
    }

    /**
     * Gets created at date
     *
     * @returns {Date} Created at date
     */
    getCreatedDate() {
        let date = new Date(this.createdAt);

        if(!this.createdAt || !date || isNaN(date.getTime())) {
            return null;
        
        } else {
            return date;
                
        }
    }
    
    /**
     * Gets closed at date
     *
     * @returns {Date} Closed at date
     */
    getClosedDate() {
        let date = new Date(this.closedAt);

        if(!this.closedAt || !date || isNaN(date.getTime())) {
            return null;
        
        } else {
            return date;
                
        }
    }
    
    /**
     * Gets estimate
     *
     * @returns {String} Estimate
     */
    getEstimate() {
        return getKey(ISSUE_ESTIMATES, this.estimate || 0);
    }

    /**
     * Gets estimated hours
     *
     * @returns {Number} Hours
     */
    getEstimatedHours() {
        return estimateToFloat(this.getEstimate());
    }

    /**
     * Gets an object with all the baked values
     *
     * @returns {Object} Baked values
     */
    getBakedValues() {
        return {
            column: this.getColumn(),
            type: this.getType(),
            tags: this.tags,
            priority: this.getPriority(),
            version: this.getVersion(),
            milestone: this.getMilestone() ? this.getMilestone().title : null,
            assignee: this.getAssignee() ? this.getAssignee().name : null,
            estimate: ISSUE_ESTIMATES[this.estimate || -1]
        };
    }

    /**
     * Check if issue is closed
     *
     * @returns {Boolean} closed
     */
    isClosed() {
        return this.column == window.resources.issueColumns.length - 1;
    }
}

module.exports = Issue;
