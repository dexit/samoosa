'use strict';

class ApiHelper {
    /**
     * Get config
     */
    getConfig() {
        return {
            readonlyResources: []
        };
    }

    // ----------
    // Checkers
    // ----------
    /**
     * Gets whether we're in spectator mode
     */
    isSpectating() {
        return Router.query('spectate') == 'true';
    }
    
    /**
     * Check whether the connection to the source has been made
     */
    checkConnection() {
        return new Promise((callback) => {
            callback();
        });
    }

    // ----------
    // Session methods
    // ---------- 
    /**
     * Gets the API token and prompts for one if needed
     * 
     * @returns {String} token
     */
    getApiToken() {
        let queryToken = Router.query('token');

        if(queryToken) {
            localStorage.setItem('token', queryToken);
            
            return queryToken;

        } else {
            if(!localStorage.getItem('token')) {
                location = '/login';

                debug.error('No API token found', this);
            }

            return localStorage.getItem('token');
        }
    }
    
    /**
     * Get user name
     */
    getUserName() {
        let user = Router.params && Router.params.user ? Router.params.user : localStorage.getItem('user');;
        
        if(!user) {
            location = '/login';

            debug.error('No username found', this);
        
        } else {
            localStorage.setItem('user', user)

            return user;
        }
    }

    /**
     * Gets project name
     */    
    getProjectName() {
        let project = null;
        
        if(Router.params && Router.params.project) {
            project = Router.params.project;
        }
   
        return project;
    }

    /**
     * Resets the API token and reloads
     */
    resetApiToken() {
        localStorage.setItem('token', '');

        this.getApiToken();
    }
    
    /**
     * Logs out the currently logged in user and reloads
     */
    logOut() {
        localStorage.setItem('token', '');

        location.reload();
    }


    // ----------
    // Resource getters
    // ----------
    /**
     * Gets issues
     *
     * @returns {Promise} promise
     */
    getIssues() {
        return new Promise((callback) => {
            window.resources.issues = [];
            
            callback();
        });
    }
    
    /**
     * Gets collaborators
     *
     * @returns {Promise} promise
     */
    getCollaborators() {
        return new Promise((callback) => {
            window.resources.collaborators = [];
            
            callback();
        });
    }
    
    /**
     * Gets issue types
     *
     * @returns {Promise} promise
     */
    getIssueTypes() {
        return new Promise((callback) => {
            window.resources.issueTypes = [];
            
            callback();
        });
    }
    
    /**
     * Gets issue priorities
     *
     * @returns {Promise} promise
     */
    getIssuePriorities() {
        return new Promise((callback) => {
            window.resources.issuePriorities = [];
            
            callback();
        });
    }
    
    /**
     * Gets issue estimates
     *
     * @returns {Promise} promise
     */
    getIssueEstimates() {
        return new Promise((callback) => {
            window.resources.issueEstimates = [];
            
            callback();
        });
    }
    
    /**
     * Gets issue columns
     *
     * @returns {Promise} promise
     */
    getIssueColumns() {
        return new Promise((callback) => {
            window.resources.issueColumns = [];
            
            callback();
        });
    }
    
    /**
     * Gets milestones 
     *
     * @returns {Promise} promise
     */
    getMilestones() {
        return new Promise((callback) => {
            window.resources.milestones = [];

            callback();
        });
    }
    
    /**
     * Gets versions 
     *
     * @returns {Promise} promise
     */
    getVersions() {
        return new Promise((callback) => {
            window.resources.versions = [];

            callback();
        });
    }
   
    /**
     * Gets projects
     *
     * @returns {Promise} promise
     */
    getProjects() {
        return new Promise((callback) => {
            callback(); 
        });
    }

    // ----------
    // Resource adders
    // ----------
    /**
     * Adds issue
     *
     * @param {Object} issue
     *
     * @returns {Promise} promise
     */ 
    addIssue(issue) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Adds collaborator
     *
     * @param {String} collaborator
     *
     * @returns {Promise} promise
     */
    addCollaborator(collaborator) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Adds issue type
     *
     * @param {String} type
     *
     * @returns {Promise} promise
     */
    addIssueType(type) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Adds issue priority
     *
     * @param {String} priority
     *
     * @returns {Promise} promise
     */
    addIssuePriority(priority) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Adds issue estimate
     *
     * @param {String} estimate
     *
     * @returns {Promise} promise
     */
    addIssueEstimate(estimate) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Adds issue column
     *
     * @param {String} column
     *
     * @returns {Promise} promise
     */
    addIssueColumn(column) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Adds milestone 
     *
     * @param {String} milestone
     *
     * @returns {Promise} promise
     */
    addMilestone(milestone) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Adds version
     *
     * @param {String} version
     *
     * @returns {Promise} promise
     */
    addVersion(version) {
        return new Promise((callback) => {
            callback();
        });
    }

    // ----------
    // Resource removers
    // ----------
    /**
     * Removes issue
     *
     * @param {Issue} issue
     *
     * @returns {Promise} Promise
     */ 
    removeIssue(issue) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Removes collaborator
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeCollaborator(index) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Removes issue type
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeIssueType(index) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Removes issue priority
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeIssuePriority(index) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Removes issue estimate
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeIssueEstimate(index) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Removes issue column
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeIssueColumn(index) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Removes milestone 
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeMilestone(index) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Removes version
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeVersion(index) {
        return new Promise((callback) => {
            callback();
        });
    }

    // ----------
    // Resource updaters
    // ---------- 
    /**
     * Updates issue
     *
     * @param {Object} issue
     *
     * @param {Number} index
     * @returns {Promise} promise
     */ 
    updateIssue(index, issue) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Updates collaborator
     *
     * @param {Number} index
     * @param {String} collaborator
     *
     * @returns {Promise} promise
     */
    updateCollaborator(index, collaborator) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Updates issue type
     *
     * @param {Number} index
     * @param {String} type
     *
     * @returns {Promise} promise
     */
    updateIssueType(index, type) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Updates issue priority
     *
     * @param {Number} index
     * @param {String} priority
     *
     * @returns {Promise} promise
     */
    updateIssuePriority(index, priority) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Updates issue estimate
     *
     * @param {Number} index
     * @param {String} estimate
     *
     * @returns {Promise} promise
     */
    updateIssueEstimate(index, estimate) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Updates issue column
     *
     * @param {Number} index
     * @param {String} column
     *
     * @returns {Promise} promise
     */
    updateIssueColumn(index, column) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Updates milestone 
     *
     * @param {Number} index
     * @param {Object} milestone
     *
     * @returns {Promise} promise
     */
    updateMilestone(index, milestone) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Updates version
     *
     * @param {Number} index
     * @param {String} version
     *
     * @returns {Promise} promise
     */
    updateVersion(index, version) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    /**
     * Updates project
     *
     * @param {Number} index
     * @param {Object} project
     *
     * @returns {Promise} promise
     */
    updateProject(index, project) {
        return new Promise((callback) => {
            callback();
        });
    }

    
    // ----------
    // Session methods    
    // ----------
    /**
     * Gets the current user object
     *
     * @returns {Promise}
     */
    getUser() {
        return new Promise((callback) => {
            callback();
        });
    }

   
    // ----------
    // Issue methods
    // ---------- 
    /** 
     * Gets issue comments
     *
     * @returns {Promise} promise
     */
    getIssueComments() {
        return new Promise((callback) => {
            callback([]);
        });
    }
    
    /** 
     * Adds issue comment
     *
     * @param {Issue} issue
     * @param {Object} comment
     *
     * @returns {Promise} promise
     */
    addIssueComment(issue, comment) {
        return new Promise((callback) => {
            callback([]);
        });
    }
    
    /** 
     * Updates issue comment
     *
     * @param {Issue} issue
     * @param {Object} comment
     *
     * @returns {Promise} promise
     */
    updateIssueComment(issue, comment) {
        return new Promise((callback) => {
            callback([]);
        });
    }

    // ----------
    // Generic methods
    // ----------
    /**
     * Removes a resource
     *
     * @param {String} resource
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeResource(resource, index) {
        switch(resource) {
            case 'collaborators':
                return this.removeCollaborator(index);

            case 'issueTypes':
                return this.removeIssueType(index);

            case 'issuePriorities':
                return this.removeIssuePriority(index);

            case 'issueEstimates':
                return this.removeIssueEstimate(index);

            case 'issueColumns':
                return this.removeIssueColumn(index);

            case 'milestones':
                return this.removeMilestone(index);

            case 'versions':
                return this.removeVersion(index);

            case 'issues':
                return this.removeIssue(index);
            
            case 'projects':
                return this.removeProject(index);
        }
    }
    
    /**
     * Adds a resource
     *
     * @param {String} resource
     * @param {Object} item
     *
     * @returns {Promise} promise
     */
    addResource(resource, item) {
        switch(resource) {
            case 'collaborators':
                return this.addCollaborator(item);

            case 'issueTypes':
                return this.addIssueType(item);

            case 'issuePriorities':
                return this.addIssuePriority(item);

            case 'issueEstimates':
                return this.addIssueEstimate(item);

            case 'issueColumns':
                return this.addIssueColumn(item);

            case 'milestones':
                return this.addMilestone(item);

            case 'versions':
                return this.addVersion(item);

            case 'issues':
                return this.addIssue(item);
            
            case 'projects':
                return this.addProject(item);
        
            default:
                displayError(new Error('Resource "' + resource + '" is unknown'));
        }
    }
    
    /**
     * Updates a resource
     *
     * @param {String} resource
     * @param {Object} item
     * @param {String} identifier
     *
     * @returns {Promise} promise
     */
    updateResource(resource, item, identifier) {
        switch(resource) {
            case 'issueTypes':
                return this.updateIssueType(item, identifier);

            case 'issuePriorities':
                return this.updateIssuePriority(item, identifier);

            case 'issueEstimates':
                return this.updateIssueEstimate(item, identifier);

            case 'issueColumns':
                return this.updateIssueColumn(item, identifier);

            case 'versions':
                return this.updateVersion(item, identifier);

            case 'milestones':
                return this.updateMilestone(item);

            case 'issues':
                return this.updateIssue(item);
        
            case 'projects':
                return this.updateProject(item);
            
            default:
                displayError(new Error('Resource "' + resource + '" is unknown'));
        }
    }

    /**
     * Gets a resource
     *
     * @param {String} resource
     *
     * @returns {Promise} promise
     */
    getResource(resource) {
        switch(resource) {
            case 'collaborators':
                return this.getCollaborators();

            case 'issueTypes':
                return this.getIssueTypes();

            case 'issuePriorities':
                return this.getIssuePriorities();

            case 'issueEstimates':
                return this.getIssueEstimates();

            case 'issueColumns':
                return this.getIssueColumns();

            case 'milestones':
                return this.getMilestones();

            case 'versions':
                return this.getVersions();

            case 'issues':
                return this.getIssues();
            
            case 'projects':
                return this.getIssues();
        }
    }

    /**
     * Gets all resources
     *
     * @param {Array} excludeResources
     *
     * @returns {Promise} promise
     */
    getResources(excludeResources) {
        let helper = this;
        
        spinner(true);

        function get(resource) {
            window.resources[resource] = [];
          
            debug.log('Getting ' + resource + '...', helper);

            // If this resource is excluded, just proceed
            if(excludeResources && Array.isArray(excludeResources) && excludeResources.indexOf(resource) > -1) {
                return new Promise((resolve) => {
                    resolve();
                });

            // If not, fetch it normally
            } else {
                return helper.getResource(resource);
            }
        }

        return get('issueTypes')
        .then(() => {
            return get('issuePriorities');
        })
        .then(() => {
            return get('issueEstimates');
        })
        .then(() => {
            return get('issueColumns');
        })
        .then(() => {
            return get('collaborators');
        })
        .then(() => {
            return get('milestones');
        })
        .then(() => {
            return get('versions');
        })
        .then(() => {
            return get('issues');
        })
        .then(() => {
            spinner(false);
        });
    }
}

module.exports = ApiHelper;