'use strict';

class ApiHelper {
    /**
     * Clears all temporary data
     */
    clear() {

    }

    /**
     * Checks if owner has changed
     */
    hasOwnerChanged() {
        let hasOwnerChanged = this.prevOwner === Router.params.user;

        this.prevOwner = Router.params.user;

        return hasOwnerChanged;
    }

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
        return Router.query('token') !== null;
    }
    
    /**
     * Check whether the connection to the source has been made
     *
     * @param {Boolean} reloadRepos
     */
    checkConnection(reloadRepos) {
        let userPromise;
        
        // Make sure user is logged in
        if(!User.getCurrent()) {
            spinner('Connecting to ' + localStorage.getItem('source'));

            debug.log('Getting user...', this);

            userPromise = this.getUser()
            .then((user) => {
                if(!user) {
                    return Promise.reject(new Error('User could not be retrieved'));
                }
                
                debug.log('Found user "' + user.name + '"', this);

                localStorage.setItem('user', user.name);

                return Promise.resolve();
            });
        
        } else {
            userPromise = Promise.resolve();

        }

        // Make sure repositories are loaded
        return userPromise
        .then(() => {
            return this.getRepositories();
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
        let user = User.getCurrent();
        
        if(!user) {
            location = '/login';

            debug.warning('No user found', this);

            return '';
        }
        
        return user.name;
    }
    
    /**
     * Gets repository owner
     *
     * @returns {String} Owner
     */    
    getRepositoryOwner() {
        if(Router.params.user) {
            return Router.params.user;
        }
        
        let repository = Repository.getCurrent();
        
        if(!repository) { return ''; }

        return repository.owner;
    }

    /**
     * Gets repository name
     *
     * @returns {String} Repository name
     */    
    getRepositoryName() {
        if(Router.params.repository) {
            return Router.params.repository;
        }

        let repository = Repository.getCurrent();
        
        if(!repository) { return ''; }

        return repository.title;
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

        location = '/login';
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
        window.resources.issues = [];
        
        return Promise.resolve();
    }
    
    /**
     * Gets collaborators
     *
     * @returns {Promise} promise
     */
    getCollaborators() {
        window.resources.collaborators = [];
            
        return Promise.resolve();
    }
    
    /**
     * Gets tags
     *
     * @returns {Promise} promise
     */
    getTags() {
        window.resources.tags = [];
   
        for(let issue of resources.issues) {
            if(!issue) { continue; }

            for(let tag of issue.tags) {
                if(resources.tags.indexOf(tag) > -1 || !tag) { continue; }

                resources.tags.push(tag);
            }
        }

        return Promise.resolve();
    }
    
    /**
     * Gets issue columns
     *
     * @returns {Promise} promise
     */
    getColumns() {
        window.resources.columns = [];
        
        return Promise.resolve();
    }
    
    /**
     * Gets milestones 
     *
     * @returns {Promise} promise
     */
    getMilestones() {
        window.resources.milestones = [];

        return Promise.resolve();
    }
    
    /**
     * Gets versions 
     *
     * @returns {Promise} promise
     */
    getVersions() {
        window.resources.versions = [];
        
        return Promise.resolve();
    }
    
    /**
     * Gets repositories
     *
     * @returns {Promise} promise
     */
    getRepositories() {
        window.resources.repositories = [];
        
        return Promise.resolve();
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
        return Promise.resolve();
    }
    
    /**
     * Adds collaborator
     *
     * @param {String} collaborator
     *
     * @returns {Promise} promise
     */
    addCollaborator(collaborator) {
        return Promise.resolve();
    }
    
    /**
     * Adds issue column
     *
     * @param {String} column
     *
     * @returns {Promise} promise
     */
    addColumn(column) {
        return Promise.resolve();
    }
    
    /**
     * Adds milestone 
     *
     * @param {String} milestone
     *
     * @returns {Promise} promise
     */
    addMilestone(milestone) {
        return Promise.resolve();
    }
    
    /**
     * Adds version
     *
     * @param {String} version
     *
     * @returns {Promise} promise
     */
    addVersion(version) {
        return Promise.resolve();
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
        return Promise.resolve();
    }
    
    /**
     * Removes collaborator
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeCollaborator(index) {
        return Promise.resolve();
    }
    
    /**
     * Removes issue column
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeColumn(index) {
        return Promise.resolve();
    }
    
    /**
     * Updates issue attachment
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    updateIssueAttachment(index) {
        return Promise.resolve();
    }

    /**
     * Removes milestone 
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeMilestone(index) {
        return Promise.resolve();
    }
    
    /**
     * Removes version
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeVersion(index) {
        return Promise.resolve();
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
        return Promise.resolve();
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
        return Promise.resolve();
    }

    /**
     * Updates issue column
     *
     * @param {Number} index
     * @param {String} column
     *
     * @returns {Promise} promise
     */
    updateColumn(index, column) {
        return Promise.resolve();
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
        return Promise.resolve();
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
        return Promise.resolve();
    }
    
    /**
     * Updates repository
     *
     * @param {Number} index
     * @param {Object} repository
     *
     * @returns {Promise} promise
     */
    updateRepository(index, repository) {
        return Promise.resolve();
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
        return Promise.resolve();
    }

   
    // ----------
    // Issue comment methods
    // ---------- 
    /** 
     * Gets issue comments
     *
     * @param {Issue} issue
     *
     * @returns {Promise} Array of comments
     */
    getIssueComments(issue) {
        return Promise.resolve();
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
        return Promise.resolve();
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
        return Promise.resolve();
    }

    // ----------
    // Issue attachment methods
    // ----------
    /**
     * Gets issue attachments
     *
     * @param {Issue} issue
     *
     * @return {Promise} List of attachments
     */
    getIssueAttachments() {
        return Promise.resolve([]);
    }
    
    /**
     * Adds issue attachment
     *
     * @param {Issue} issue
     * @param {Attachment} attachment
     *
     * @returns {Promise} Promise
     */
    addIssueAttachment(issue, attachment) {
        return Promise.resolve();
    }

    /**
     * Removes issue attachment
     *
     * @param {Issue} issue
     * @param {Attachment} attachment
     *
     * @returns {Promise} Promise
     */
    removeIssueAttachment(issue, attachment) {
        return Promise.resolve();
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
        debug.log('Removing item from ' + resource + '...', this);
        
        switch(resource) {
            case 'collaborators':
                return this.removeCollaborator(index);

            case 'columns':
                return this.removeColumn(index);
            
            case 'milestones':
                return this.removeMilestone(index);

            case 'versions':
                return this.removeVersion(index);

            case 'issues':
                return this.removeIssue(index);
            
            case 'repositories':
                return this.removeRepository(index);
            
            default:
                return Promise.reject(new Error('Resource "' + resource + '" is invalid for DELETE'));
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
        debug.log('Adding item to ' + resource + '...', this);
        
        switch(resource) {
            case 'collaborators':
                return this.addCollaborator(item);

            case 'columns':
                return this.addColumn(item);

            case 'milestones':
                return this.addMilestone(item);

            case 'versions':
                return this.addVersion(item);

            case 'issues':
                return this.addIssue(item);
            
            case 'repositories':
                return this.addRepository(item);
        
            default:
                return Promise.reject(new Error('Resource "' + resource + '" is invalid for PUT'));
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
        debug.log('Updating item for ' + resource + '...', this);

        switch(resource) {
            case 'columns':
                return this.updateColumn(item, identifier);
            
            case 'versions':
                return this.updateVersion(item, identifier);

            case 'milestones':
                return this.updateMilestone(item);

            case 'issues':
                return this.updateIssue(item);
        
            case 'repositories':
                return this.updateRepository(item);
            
            default:
                return Promise.reject(new Error('Resource "' + resource + '" is invalid for POST'));
        }
    }

    /**
     * Gets a resource
     *
     * @param {String} resource
     * @param {Boolean} dontOverwrite
     *
     * @returns {Promise} promise
     */
    getResource(resource, dontOverwrite) {
        if(dontOverwrite && resources[resource] && resources[resource].length > 0) {
            return Promise.resolve();
        }
        
        spinner('Getting ' + resource);

        switch(resource) {
            case 'collaborators':
                return this.getCollaborators();
            
            case 'tags':
                return this.getTags();

            case 'columns':
                return this.getColumns();

            case 'milestones':
                return this.getMilestones()
                .then(() => {
                    ResourceHelper.sortResource('milestones');

                    return Promise.resolve();  
                });

            case 'versions':
                return this.getVersions();

            case 'issues':
                return this.getIssues();
            
            case 'repositories':
                return this.getRepositories();

            default:
                return Promise.reject(new Error('Resource "' + resource + '" is invalid for GET'));
        }
    }

    /**
     * Gets all resources
     *
     * @param {Boolean} dontOverwrite
     *
     * @returns {Promise} promise
     */
    getResources(dontOverwrite) {
        spinner('Getting resources');

        // Override this option if we changed owners
        if(this.hasOwnerChanged()) {
            dontOverwrite = false;
        }

        let get = (resource) => {
            // If "don't overwrite" is in effect, check if resource is already loaded
            if(dontOverwrite == true && resources[resource] && resources[resource].length > 0) {
                return Promise.resolve();
            
            } else {
                resources[resource] = [];
              
                return this.getResource(resource);
            }
        }

        return get('columns')
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
            return get('tags');
        });
    }
}

module.exports = ApiHelper;
