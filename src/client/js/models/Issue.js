'use strict';

/**
 * The data model for issues
 */
class Issue {
    constructor(properties) {
        properties = properties || {};
        
        // Sanity check (no properties should be a number)
        for(let key in properties) {
            if(!isNaN(properties[key])) {
                properties[key] = null;
            }

            if(typeof properties[key] === 'undefined') {
                properties[key] = null;
            }
        }

        // Essential properties
        this.title = properties.title || 'New issue';
        this.description = properties.description || '';
        this.id = properties.id;
        this.reporter = properties.reporter;

        // Optional properties
        this.column = properties.column || 'to do';
        this.type = properties.type || 'task';
        this.tags = properties.tags || [];
        this.priority = properties.priority || 'low';
        this.estimate = properties.estimate || '15m';
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

        let tagRegex = /{% (\w+):([^%]+) %}/g;
        let nextMatch = tagRegex.exec(description);

        while(nextMatch != null) {
            let key = nextMatch[1];
            let value = nextMatch[2];

            if(key && value) {
                switch(key) {
                    case 'column':
                        this.column = value;
                        break;
                    
                    case 'type':
                        this.type = value;
                        break;
                    
                    case 'tags':
                        this.tags = value.split(',');
                        break;
                    
                    case 'priority':
                        this.priority = value;
                        break;
                    
                    case 'estimate':
                        this.estimate = value;
                        break;
                    
                    case 'version':
                        this.version = value;
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
        return ResourceHelper.get(this.column, 'columns');
    }
    
    /**
     * Gets type
     *
     * @returns {String} Type name
     */
    getType() {
        return this.type;
    }

    /**
     * Gets priority
     *
     * @returns {String} Priority name
     */
    getPriority() {
        return this.priority;
    }

    /**
     * Gets version
     *
     * @returns {String} Version name
     */
    getVersion() {
        return ResourceHelper.get(this.version, 'versions');
    }

    /**
     * Gets milestone
     *
     * @returns {Milestone} Milestone object
     */
    getMilestone() {
        return ResourceHelper.get(this.milestone, 'milestones', 'title');
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
        return ResourceHelper.get(this.assignee, 'collaborators', 'name');
    }
    
    /**
     * Gets reporter
     *
     * @returns {Collaborator} Collaborator object
     */
    getReporter() {
        return ResourceHelper.get(this.reporter, 'collaborators', 'name') || { name: this.reporter };
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
        return this.estimate;
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
     * Check if issue is closed
     *
     * @returns {Boolean} closed
     */
    isClosed() {
        return this.column == 'done'; 
    }
}

module.exports = Issue;
