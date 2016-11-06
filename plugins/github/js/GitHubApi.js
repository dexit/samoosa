'use strict';

let ApiHelper = require('../../../src/client/js/helpers/ApiHelper');

let labelCache;
let deletedIssuesCache = [];

class GitHubApi extends ApiHelper {
    // ----------
    // Generic API methods
    // ----------
    /**
     * GET method
     *
     * @param {String} url
     * @param {String} param
     * @param {Boolean} recursePages
     *
     * @returns {Promise} promise
     */
    get(url, param, recursePages) {
        let self = this;

        return new Promise((resolve, reject) => {
            let issues = [];

            function getPage(page) {
                $.ajax({
                    url: 'https://api.github.com' + url + self.getApiTokenString(true) + 'per_page=100&page=' + page + (param ? '&' + param : ''),
                    type: 'GET',
                    cache: false,
                    success: (result) => {
                        issues = issues.concat(result);

                        if(recursePages && result.length > 0) {
                            getPage(page + 1);

                        } else {
                            resolve(issues);

                        }
                    },
                    error: (e) => {
                        self.error(e);
                        reject(new Error(e.responseJSON.message));
                    }
                });
            }

            getPage(1);
        });
    }
    
    /**
     * DELETE method
     *
     * @param {String} url
     * @param {String} param
     *
     * @returns {Promise} promise
     */
    delete(url, param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'https://api.github.com' + url + this.getApiTokenString() + (param ? '&' + param : ''),
                type: 'DELETE',
                cache: false,
                success: (result) => {
                    resolve(result);
                },
                error: (e) => {
                    this.error(e);
                    reject(e);
                }
            });
        });
    }

    /**
     * PATCH method
     *
     * @param {String} url
     * @param {Object} data
     *
     * @returns {Promise} promise
     */
    patch(url, data) {
        if(typeof data === 'object') {
            data = JSON.stringify(data);
        }

        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'https://api.github.com' + url + this.getApiTokenString(),
                type: 'PATCH',
                data: data,
                cache: false,
                success: (result) => {
                    resolve(result);
                },
                error: (e) => {
                    this.error(e);
                    reject(e);
                }
            });
        });
    }

    /**
     * POST method
     *
     * @param {String} url
     * @param {Object} data
     *
     * @returns {Promise} promise
     */
    post(url, data) {
        if(typeof data === 'object') {
            data = JSON.stringify(data);
        }

        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'https://api.github.com' + url + this.getApiTokenString(),
                type: 'POST',
                data: data,
                cache: false,
                success: (result) => {
                    resolve(result);
                },
                error: (e) => {
                    this.error(e);
                    reject(e);
                }
            });
        });
    }
    
    /**
     * PUT method
     *
     * @param {String} url
     *
     * @returns {Promise} promise
     */
    put(url) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'https://api.github.com' + url + this.getApiTokenString(),
                type: 'PUT',
                cache: false,
                success: (result) => {
                    resolve(result);
                },
                error: (e) => {
                    this.error(e);
                    reject(e);
                }
            });
        });
    }

    /**
     * Error message
     *
     * @param {Object} error
     */
    error(error) {
        if(error) {
            switch(error.status) {
                //case 401: case 403:
                //    this.resetApiToken();
                //    break;

                default:
                    if(error.responseJSON) {
                        displayError(error.responseJSON.message);
                    } else {
                        displayError(error.statusText);
                    } 
                    break;
            }
        }
    }

    // ----------
    // Session methods
    // ----------
    /**
     * Gets the API token string
     *
     * @param {Boolean} includeSuffix
     *
     * @returns {String} string
     */
    getApiTokenString(includeSuffix) {
        let token = this.getApiToken();

        if(!token) {
            if(includeSuffix) {
                return '?';
            }
        } else {
            if(includeSuffix) {
                token += '&';
            }

            return '?access_token=' + token;
        }
    }

    /**
     * Gets the currently logged in user object
     *
     * @returns {Promise} promise
     */
    getUser() {
        if(this.isSpectating()) {
            return Promise.resolve({name: '', avatar: ''});
        }

        return this.get('/user')
        .then((gitHubUser) => {
            if(Array.isArray(gitHubUser)) {
                gitHubUser = gitHubUser[0];
            }

            let user = new User({
                id: gitHubUser.id,
                name: gitHubUser.login,
                avatar: gitHubUser.avatar_url
            });

            return Promise.resolve(user);
        });
    }

    // ----------
    // Resource getters
    // ----------
    /**
     * Gets a list of deleted issues
     *
     * @returns {Array} List of deleted issues
     */
    getDeletedIssues() {
        return deletedIssuesCache;
    }

    /**
     * Gets projects
     *
     * @returns {Promise} promise
     */
    getProjects() {
        return this.get('/user/repos')
        .then((repos) => {
            this.processProjects(repos);
            
            return Promise.resolve();
        });
    }
    
    /**
     * Gets collaborators
     *
     * @returns {Promise} promise
     */
    getCollaborators() {
        if(this.isSpectating()) {
            return Promise.resolve([]);
        }

        return this.get('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/collaborators')
        .then((collaborators) => {
            this.processCollaborators(collaborators);
        });
    }

    /**
     * Gets issues
     *
     * @returns {Promise} promise
     */
    getIssues() {
        return this.get('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues', 'state=all', true)
        .then((issues) => {
            this.processIssues(issues);

            return Promise.resolve();
        });
    }
    
    /**
     * Ensures mandatory labels
     *
     * @returns {Promise} Promise
     */
    ensureMandatoryLabels() {
        if(!labelCache) { 
            return Promise.reject(new Error('Label cache not initialised'));
        
        } else {
            // Check if "deleted" label exists
            for(let label of labelCache) {
                if(label.name == 'deleted') {
                    return Promise.resolve();
                }
            }
        
            return this.addLabel('deleted', 'ff0000')
            .then((newLabel) => {
                labelCache.push(newLabel);

                return Promise.resolve();
            });
        }
    }


    /**
     * Gets labels and caches them
     *
     * @returns {Promise} promise
     */
    getLabels() {
        if(!labelCache) {
            return this.get('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels')
            .then((labels) => {
                labelCache = labels || [];

                return this.ensureMandatoryLabels();
            })
            .then(() => {
                return Promise.resolve(labelCache);
            });

        } else {
            return Promise.resolve(labelCache);
        }
    }

    /**
     * Gets issue types
     *
     * @returns {Promise} promise
     */
    getIssueTypes() {
        return this.getLabels()
        .then((labels) => {
            this.processIssueTypes(labels);

            return Promise.resolve();
        });
    }
    
    /**
     * Gets issue columns
     *
     * @returns {Promise} promise
     */
    getIssueColumns() {
        return this.getLabels()
        .then((labels) => {
            this.processIssueColumns(labels);

            return Promise.resolve();
        });
    }
    
    /**
     * Gets issue priorities
     *
     * @returns {Promise} promise
     */
    getIssuePriorities() {
        return this.getLabels()
        .then((labels) => {
            this.processIssuePriorities(labels);

            return Promise.resolve();
        });
    }
    
    /**
     * Gets issue estimates
     *
     * @returns {Promise} promise
     */
    getIssueEstimates() {
        return this.getLabels()
        .then((labels) => {
            this.processIssueEstimates(labels);

            return Promise.resolve();
        });
    }
    
    /**
     * Gets versions
     *
     * @returns {Promise} promise
     */
    getVersions() {
        return this.getLabels()
        .then((labels) => {
            this.processVersions(labels);

            return Promise.resolve();
        });
    }

    /**
     * Gets milestones
     *
     * @returns {Promise} promise
     */
    getMilestones() {
        return this.get('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/milestones')
        .then((milestones) => {
            this.processMilestones(milestones);
            
            return Promise.resolve();
        });    
    }

    // ----------
    // Resource adders
    // ----------
    /**
     * Adds a new issue
     *
     * @param {Object} issue
     *
     * @returns {Promise} promise
     */
    addIssue(issue) {
        let deletedIssue = deletedIssuesCache.pop();
       
        if(deletedIssue) {
            issue.id = deletedIssue.id;

            return this.updateIssue(issue);
        
        } else {
            return this.post('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues', this.convertIssue(issue))
            .then((gitHubIssue) => {
                issue.id = gitHubIssue.number;

                return Promise.resolve();
            });
        }
    }
    
    /**
     * Adds collaborator
     *
     * @param {String} collaborator
     *
     * @returns {Promise} promise
     */
    addCollaborator(collaborator) {
        return this.put('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/collaborators/' + collaborator);
    }
    
    /**
     * Adds label
     *
     * @param {String} name
     * @param {String} color
     *
     * @returns {Promise} New label
     */
    addLabel(name, color) {
        return this.post('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels', {
            name: name,
            color: color || 'ffffff'
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
        return this.post('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels', {
            name: 'type:' + type,
            color: 'ffffff'
        })
        .then(() => {
            return Promise.resolve(type);  
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
        return this.post('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels', {
            name: 'priority:' + priority,
            color: 'ffffff'
        })
        .then(() => {
            return Promise.resolve(priority);  
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
        return this.post('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels', {
            name: 'estimate:' + estimate,
            color: 'ffffff'
        })
        .then(() => {
            return Promise.resolve(estimate);  
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
        return this.post('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels', {
            name: 'column:' + column,
            color: 'ffffff'
        })
        .then(() => {
            return Promise.resolve(column);  
        });
    }
    
    /**
     * Adds milestone 
     *
     * @param {Object} milestone
     *
     * @returns {Promise} promise
     */
    addMilestone(milestone) {
        if(typeof milestone == 'string') {
            milestone = {
                title: milestone
            };
        }

        if(milestone instanceof Milestone === false) {
            milestone = new Milestone(milestone);
        }
            
        return this.post('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/milestones', this.convertMilestone(milestone))
        .then((gitHubMilestone) => {
            milestone.id = gitHubMilestone.number;

            return Promise.resolve(milestone);
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
        return this.post('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels', {
            name: 'version:' + version,
            color: 'ffffff'
        })
        .then(() => {
            return Promise.resolve(version);  
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
        issue.deleted = true;
        deletedIssuesCache.push(issue);

        resources.issues[issue.index] = null;

        return this.updateIssue(issue);
    }
    
    /**
     * Removes collaborator
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeCollaborator(index) {
        return this.delete('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/collaborators/' + window.resources.collaborators[index]);
    }
    
    /**
     * Removes issue type
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeIssueType(index) {
        return this.delete('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels/type:' + window.resources.issueTypes[index]);
    }
    
    /**
     * Removes issue priority
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeIssuePriority(index) {
        return this.delete('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels/priority:' + window.resources.issuePriorities[index]);
    }
    
    /**
     * Removes issue estimate
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeIssueEstimate(index) {
        return this.delete('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels/estimate:' + window.resources.issueEstimates[index]);
    }
    
    /**
     * Removes issue column
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeIssueColumn(index) {
        return this.delete('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels/column:' + window.resources.issueColumns[index]);
    }
    
    /**
     * Removes milestone 
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeMilestone(index) {
        let milestone = resources.milestones[index];

        if(!milestone) {
            return Promise.reject(new Error('Milestone at index "' + index + '" not found'));
        } else {
            return this.delete('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/milestones/' + milestone.id);
        }
    }
    
    /**
     * Removes version
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeVersion(index) {
        return this.delete('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels/version:' + window.resources.versions[index]);
    }

    // ----------
    // Resource updaters
    // ----------
    /**
     * Update issue
     *
     * @param {Object} issue
     */
    updateIssue(issue) {
        return this.patch('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues/' + issue.id, this.convertIssue(issue));
    }

    /**
     * Updates milestone 
     *
     * @param {Milestone} milestone
     *
     * @returns {Promise} promise
     */
    updateMilestone(milestone) {
        return this.patch('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/milestones/' + milestone.id, this.convertMilestone(milestone));
    }
    
    /**
     * Updates issue type
     *
     * @param {String} type
     * @param {String} previousName
     *
     * @returns {Promise} promise
     */
    updateIssueType(type, previousName) {
        return this.patch('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels/type:' + previousName, {
            name: 'type:' + type,
            color: 'ffffff'
        });
    }
    
    /**
     * Updates issue priority
     *
     * @param {String} priority
     * @param {String} previousName
     *
     * @returns {Promise} promise
     */
    updateIssuePriority(priority, previousName) {
        return this.patch('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels/priority:' + previousName, {
            name: 'priority:' + priority,
            color: 'ffffff'
        });
    }
    
    /**
     * Updates issue estimate
     *
     * @param {String} estimate
     * @param {String} previousName
     *
     * @returns {Promise} promise
     */
    updateIssueEstimate(estimate, previousName) {
        return this.patch('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels/estimate:' + previousName, {
            name: 'estimate:' + estimate,
            color: 'ffffff'
        });
    }
    
    /**
     * Updates issue column
     *
     * @param {String} column
     * @param {String} previousName
     *
     * @returns {Promise} promise
     */
    updateIssueColumn(column, previousName) {
        return this.patch('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels/column:' + previousName, {
            name: 'column:' + column,
            color: 'ffffff'
        });
    }
    
    /**
     * Updates version
     *
     * @param {String} version
     * @param {String} previousName
     *
     * @returns {Promise} promise
     */
    updateVersion(version, previousName) {
        return this.patch('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels/version:' + previousName, {
            name: 'version:' + version,
            color: 'ffffff'
        });
    }

    // ----------
    // Resource processing methods
    // ----------
    /**
     * Process projects
     *
     * @param {Array} projects
     */
    processProjects(projects) {
        window.resources.projects = [];

        for(let i in projects) {
            let project = {
                index: i,
                title: projects[i].name,
                description: projects[i].description,
                cloneUrl: projects[i].clone_url,
                owner: projects[i].owner.login
            };
            
            window.resources.projects[i] = project;
        }
    }
    
    /**
     * Process milestones
     *
     * @param {Array} milestones
     */
    processMilestones(milestones) {
        resources.milestones = [];
        
        for(let i in milestones) {
            let index = resources.milestones.length;

            let milestone = new Milestone({
                index: index,
                id: milestones[i].number,
                title: milestones[i].title,
                description: milestones[i].description,
                startDate: milestones[i].created_at,
                endDate: milestones[i].due_on
            });

            resources.milestones[index] = milestone;
        }
    }

    /**
     * Process versions
     *
     * @param {Array} labels
     */
    processVersions(labels) {
        window.resources.versions = [];

        for(let label of labels) {
            let versionIndex = label.name.indexOf('version:');
            
            if(versionIndex > -1) {
                let versionName = label.name.replace('version:', '');

                window.resources.versions.push(versionName);
            }
        }
    }
    
    /**
     * Process issue priotities
     *
     * @param {Array} labels
     */
    processIssuePriorities(labels) {
        window.resources.issuePriorities = [];
        
        for(let label of labels) {
            let index = label.name.indexOf('priority:');
            
            if(index > -1) {
                let name = label.name.replace('priority:', '');

                window.resources.issuePriorities.push(name);
            }
        }
    }
    
    /**
     * Process issue estimates
     *
     * @param {Array} labels
     */
    processIssueEstimates(labels) {
        window.resources.issueEstimates = [];
        
        for(let label of labels) {
            let index = label.name.indexOf('estimate:');
            
            if(index > -1) {
                let name = label.name.replace('estimate:', '');

                window.resources.issueEstimates.push(name);
            }
        }
    }

    /**
     * Process issue columns
     *
     * @param {Array} labels
     */
    processIssueColumns(labels) {
        window.resources.issueColumns = [];
        
        window.resources.issueColumns.push('to do');
        
        for(let label of labels) {
            let index = label.name.indexOf('column:');
            
            if(index > -1) {
                let name = label.name.replace('column:', '');

                window.resources.issueColumns.push(name);
            }
        }
        
        window.resources.issueColumns.push('done');
    }

    /**
     * Process issue types
     *
     * @param {Array} labels
     */
    processIssueTypes(labels) {
        window.resources.issueTypes = [];
        
        for(let label of labels) {
            let index = label.name.indexOf('type:');
            
            if(index > -1) {
                let name = label.name.replace('type:', '');

                window.resources.issueTypes.push(name);
            }
        }
    }

    /**
     * Process collaborators
     *
     * @param {Array} collaborators
     */
    processCollaborators(collaborators) {
        window.resources.collaborators = [];

        for(let collaborator of collaborators) {
            window.resources.collaborators.push({
                name: collaborator.login,
                avatar: collaborator.avatar_url,
            });
        }
    }

    /**
     * Process issues
     *
     * @param {Array} issues
     */
    processIssues(issues) {
        window.resources.issues = [];
        
        for(let gitHubIssue of issues) {
            let issue = new Issue();

            issue.title = gitHubIssue.title;
            issue.description = gitHubIssue.body;
            issue.id = gitHubIssue.number; 
            issue.reporter =  ResourceHelper.getCollaborator(gitHubIssue.user.login);
            issue.createdAt = gitHubIssue.created_at;
            issue.closedAt = gitHubIssue.closed_at;

            if(gitHubIssue.assignee) {
                issue.assignee = ResourceHelper.getCollaborator(gitHubIssue.assignee.login);
            }

            issue.labels = issue.labels || [];

            for(let label of gitHubIssue.labels) {
                let typeIndex = label.name.indexOf('type:');
                let priorityIndex = label.name.indexOf('priority:');
                let estimateIndex = label.name.indexOf('estimate:');
                let versionIndex = label.name.indexOf('version:');
                let columnIndex = label.name.indexOf('column:');

                if(label.name == 'deleted') {
                    issue.deleted = true;

                } else if(typeIndex > -1) {
                    let name = label.name.replace('type:', '');
                    
                    issue.type = ResourceHelper.getIssueType(name);

                } else if(versionIndex > -1) {
                    let name = label.name.replace('version:', '');
                    
                    issue.version = ResourceHelper.getVersion(name);
                
                } else if(estimateIndex > -1) {
                    let name = label.name.replace('estimate:', '');
                   
                    issue.estimate = ResourceHelper.getIssueEstimate(name);

                } else if(priorityIndex > -1) {
                    let name = label.name.replace('priority:', '');
                    
                    issue.priority = ResourceHelper.getIssuePriority(name);

                } else if(columnIndex > -1) {
                    let name = label.name.replace('column:', '');
                    
                    issue.column = ResourceHelper.getIssueColumn(name);

                } else {
                    issue.labels.push(label);

                }
            }

            if(gitHubIssue.state == 'closed') {
                issue.column = resources.issueColumns.length - 1;
            }

            if(gitHubIssue.milestone) {
                issue.milestone = ResourceHelper.getMilestone(gitHubIssue.milestone.title);
            }

            issue.index = parseInt(gitHubIssue.number) - 1;

            if(issue.deleted) {
                deletedIssuesCache.push(issue);
            } else {
                window.resources.issues[issue.index] = issue;
            }
        }
    }

    /**
     * Convert milestone model to GitHub schema
     *
     * @param {Object} milestone
     */
    convertMilestone(milestone) {
        let gitHubMilestone = {
            title: milestone.title,
            description: milestone.description,
            due_on: milestone.getEndDate() ? milestone.getEndDate().toISOString() : null,
            state: milestone.closed ? 'closed' : 'open'
        };

        return gitHubMilestone;
    }

    /**
     * Convert issue model to GitHub schema
     *
     * @param {Object} issue
     */
    convertIssue(issue) {
        // Directly mappable properties
        let gitHubIssue = {
            title: issue.title,
            body: issue.description,
            number: issue.id,
            labels: []
        };

        // Assignee
        let assignee = resources.collaborators[issue.assignee];

        if(assignee) {
            gitHubIssue.assignee = assignee.name;
        
        } else {
            gitHubIssue.assignee = '';

        }

        // State
        let issueColumn = resources.issueColumns[issue.column];

        gitHubIssue.state = issueColumn == 'done' ? 'closed' : 'open';

        // Milestone
        // GitHub counts numbers from 1, ' + this.getProjectName() + ' counts from 0
        if(issue.getMilestone()) {
            gitHubIssue.milestone = issue.getMilestone().id;
        } else {
            gitHubIssue.milestone = null;
        }

        // Type
        let issueType = resources.issueTypes[issue.type];

        if(issueType) {
            gitHubIssue.labels.push('type:' + issueType);
        }

        // Version
        let version = resources.versions[issue.version];

        if(version) {
            gitHubIssue.labels.push('version:' + version);
        }
       
        // Estimate
        let issueEstimate = resources.issueEstimates[issue.estimate];

        if(issueEstimate) {
            gitHubIssue.labels.push('estimate:' + issueEstimate);
        }

        // Priority
        let issuePriority = resources.issuePriorities[issue.priority];

        if(issuePriority) {
            gitHubIssue.labels.push('priority:' + issuePriority);
        }

        // Column
        if(issueColumn && issueColumn != 'to do' && issueColumn != 'done') {
            gitHubIssue.labels.push('column:' + issueColumn);
        }

        // Deleted
        if(issue.deleted) {
            gitHubIssue.labels.push('deleted');
        }

        return gitHubIssue;
    }

    /**
     * Add issue comment
     *
     * @param {Issue} issue
     * @param {String} text
     */
    addIssueComment(issue, text) {
        return new Promise((callback) => {
            this.post('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues/' + issue.id + '/comments', {
                body: text
            })
            .then(() => {
                callback(); 
            });
        });
    }

    /**
     * Update issue comment
     *
     * @param {Issue} issue
     * @param {Object} comment
     */
    updateIssueComment(issue, comment) {
        return new Promise((callback) => {
            this.patch('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues/comments/' + comment.index, {
                body: comment.text
            })
            .then(() => {
                callback(); 
            });
        });
    }

    /**
     * Get issue comments
     *
     * @param {Object} issue
     *
     * @returns {Promise} promise
     */
    getIssueComments(issue) {
        return new Promise((callback) => {
            this.get('/repos/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues/' + issue.id + '/comments')
            .then((gitHubComments) => {
                let comments = [];

                for(let gitHubComment of gitHubComments) {
                    let comment = {
                        collaborator: ResourceHelper.getCollaborator(gitHubComment.user.login),
                        text: gitHubComment.body,
                        index: gitHubComment.id
                    };

                    comments.push(comment);
                }

                callback(comments);            
            });
        });
    }
}

module.exports = GitHubApi;
