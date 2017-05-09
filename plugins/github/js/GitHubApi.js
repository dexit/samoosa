'use strict';

let ApiHelper = require('../../../src/client/js/helpers/ApiHelper');

let labelCache;
let deletedIssuesCache = [];

class GitHubApi extends ApiHelper {
    /**
     * Clears all temporary data
     */
    clear() {
        labelCache = null;
        deletedIssuesCache = [];
    }
    
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
                        reject(new Error(e.responseJSON ? e.responseJSON.message : e.statusText));
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
     * @param {Object} data
     *
     * @returns {Promise} promise
     */
    delete(url, param, data) {
        if(data && typeof data === 'object') {
            data = JSON.stringify(data);
        }
        
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'https://api.github.com' + url + this.getApiTokenString() + (param ? '&' + param : ''),
                type: 'DELETE',
                cache: false,
                data: data,
                success: (result) => {
                    resolve(result);
                },
                error: (e) => {
                    reject(new Error(e.responseJSON.message));
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
                    reject(new Error(e.responseJSON.message));
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
                    reject(new Error(e.responseJSON.message));
                }
            });
        });
    }
    
    /**
     * PUT method
     *
     * @param {String} url
     * @param {Object} data
     *
     * @returns {Promise} promise
     */
    put(url, data) {
        if(typeof data === 'object') {
            data = JSON.stringify(data);
        }
        
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'https://api.github.com' + url + this.getApiTokenString(),
                type: 'PUT',
                cache: false,
                data: data,
                success: (result) => {
                    resolve(result);
                },
                error: (e) => {
                    reject(new Error(e.responseJSON.message));
                }
            });
        });
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
     * Gets repositories
     *
     * @returns {Promise} promise
     */
    getRepositories() {
        return this.get('/user/repos', '', true)
        .then((repos) => {
            this.processRepositories(repos);
            
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

        return this.get('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/collaborators')
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
        return this.get('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues', 'state=all', true)
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
            return this.get('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels')
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
     * Gets issue columns
     *
     * @returns {Promise} promise
     */
    getColumns() {
        return this.getLabels()
        .then((labels) => {
            this.processColumns(labels);

            return Promise.resolve();
        });
    }
    
    /**
     * Gets issue attachments
     *
     * @param {Issue} issue
     *
     * @returns {Promise} Promise
     */
    getIssueAttachments(issue) {
        let apiUrl = '/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/contents/issueAttachments/' + issue.id;

        return this.get(apiUrl, 'ref=samoosa-resources') 
        .then((response) => {
            if(!Array.isArray(response)) {
                return Promise.reject(new Error('Response of issue attachments was not an array'));
            }
            
            let attachments = [];

            for(let obj of response) {
                let attachment = new Attachment({
                    name: obj.name,
                    url: obj.download_url
                });
                
                attachment.sha = obj.sha;
                
                attachments[attachments.length] = attachment;
            }

            return Promise.resolve(attachments);  
        })
        .catch(() => {
            return Promise.resolve([]);  
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
        return this.get('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/milestones')
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

            return this.updateIssue(issue)
            .then(() => {
                return Promise.resolve(issue);  
            });
        
        } else {
            return this.post('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues', this.convertIssue(issue))
            .then((gitHubIssue) => {
                issue.id = gitHubIssue.number;

                return Promise.resolve(issue);
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
        return this.put('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/collaborators/' + collaborator);
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
        return this.post('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels', {
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
        return this.post('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels', {
            name: 'type:' + type,
            color: 'ffffff'
        })
        .then(() => {
            return Promise.resolve(type);  
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
        return this.post('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels', {
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
    addColumn(column) {
        return this.post('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels', {
            name: 'column:' + column,
            color: 'ffffff'
        })
        .then(() => {
            return Promise.resolve(column);  
        });
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
        let apiUrl = '/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/contents/issueAttachments/' + issue.id + '/' + attachment.getName();
        let postData = {
            message: 'Added attachment "' + attachment.name + '"',
            content: attachment.base64,
            branch: 'samoosa-resources'
        };

        return this.put(apiUrl, postData) 
        .then((response) => {
            if(response && response.content) {
                attachment.url = response.content.download_url;
            }

            return Promise.resolve(attachment);  
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
            
        return this.post('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/milestones', this.convertMilestone(milestone))
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
        return this.post('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels', {
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

        resources.issues.splice(issue.index, 1);

        // Update the issue with the "deleted" label
        return this.updateIssue(issue)

        // Get all attachments
        .then(() => {
            return this.getIssueAttachments(issue)
        })

        // Delete attachments one by one
        .then((attachments) => {
            let deleteNextAttachment = () => {
                let attachment = attachments.pop();

                if(attachment) {
                    return this.removeIssueAttachment(issue, attachment)
                    .then(() => {
                        return deleteNextAttachment();
                    });
                
                } else {
                    return Promise.resolve();

                }
            };
        
            return deleteNextAttachment();
        })

        // Get all comments
        .then(() => {
            return this.getIssueComments(issue);
        })

        // Delete all comments one by one
        .then((comments) => {
            let deleteNextComment = () => {
                let comment = comments.pop();

                if(comment) {
                    return this.removeIssueComment(issue, comment)
                    .then(() => {
                        return deleteNextComment();
                    });
                
                } else {
                    return Promise.resolve();

                }
            };
        
            return deleteNextComment();
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
        return this.delete('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/collaborators/' + window.resources.collaborators[index]);
    }
    
    /**
     * Removes issue type
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeIssueType(index) {
        return this.delete('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/type:' + ISSUE_TYPES[index]);
    }
    
    /**
     * Removes issue estimate
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeIssueEstimate(index) {
        return this.delete('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/estimate:' + ISSUE_ESTIMATES[index]);
    }
    
    /**
     * Removes issue column
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeColumn(index) {
        return this.delete('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/column:' + window.resources.columns[index]);
    }
    
    /**
     * Removes an issue attachment
     *
     * @param {Issue} issue
     * @param {Attachment} attachment
     *
     * @returns {Promise} Promise
     */
    removeIssueAttachment(issue, attachment) {
        let apiUrl = '/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/contents/issueAttachments/' + issue.id + '/' + attachment.getName();
        let deleteData = {
            message: 'Removed attachment "' + attachment.getName() + '"',
            sha: attachment.sha,
            branch: 'samoosa-resources'
        };

        return this.delete(apiUrl, null, deleteData);
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
            return this.delete('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/milestones/' + milestone.id);
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
        return this.delete('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/version:' + window.resources.versions[index]);
    }

    // ----------
    // Resource updaters
    // ----------
    /**
     * Update repository
     *
     * @param {Repository} repository
     *
     * @returns {Promise} Promise
     */
    updateRepository(repository, previousName) {
        return this.patch('/repos/' + repository.owner + '/' + previousName, this.convertRepository(repository));
    }

    /**
     * Update issue
     *
     * @param {Object} issue
     */
    updateIssue(issue) {
        return this.patch('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id, this.convertIssue(issue));
    }

    /**
     * Updates milestone 
     *
     * @param {Milestone} milestone
     *
     * @returns {Promise} promise
     */
    updateMilestone(milestone) {
        return this.patch('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/milestones/' + milestone.id, this.convertMilestone(milestone));
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
        return this.patch('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/type:' + previousName, {
            name: 'type:' + type,
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
        return this.patch('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/estimate:' + previousName, {
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
    updateColumn(column, previousName) {
        return this.patch('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/column:' + previousName, {
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
        return this.patch('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/version:' + previousName, {
            name: 'version:' + version,
            color: 'ffffff'
        });
    }

    // ----------
    // Resource processing methods
    // ----------
    /**
     * Process repositories
     *
     * @param {Array} repositories
     */
    processRepositories(repositories) {
        window.resources.repositories = [];

        for(let i in repositories) {
            let repository = {
                index: i,
                title: repositories[i].name,
                description: repositories[i].description,
                cloneUrl: repositories[i].clone_url,
                owner: repositories[i].owner.login
            };
            
            window.resources.repositories[i] = repository;
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
     * Process issue columns
     *
     * @param {Array} labels
     */
    processColumns(labels) {
        window.resources.columns = [];
        
        window.resources.columns.push('to do');
        
        for(let label of labels) {
            let index = label.name.indexOf('column:');
            
            if(index > -1) {
                let name = label.name.replace('column:', '');

                window.resources.columns.push(name);
            }
        }
        
        window.resources.columns.push('done');
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
            issue.reporter = gitHubIssue.user.login;
            issue.createdAt = gitHubIssue.created_at;
            issue.closedAt = gitHubIssue.closed_at;

            if(gitHubIssue.assignee) {
                issue.assignee = gitHubIssue.assignee.login;
            }

            issue.labels = issue.labels || [];

            for(let label of gitHubIssue.labels) {
                let typeIndex = label.name.indexOf('type:');
                let tagIndex = label.name.indexOf('tag:');
                let priorityIndex = label.name.indexOf('priority:');
                let estimateIndex = label.name.indexOf('estimate:');
                let versionIndex = label.name.indexOf('version:');
                let columnIndex = label.name.indexOf('column:');

                if(label.name == 'deleted') {
                    issue.deleted = true;

                } else if(typeIndex > -1) {
                    let name = label.name.replace('type:', '');
                    
                    issue.type = name;

                } else if(tagIndex > -1) {
                    let name = label.name.replace('tag:', '');
                   
                    if(name) {
                        issue.tags.push(name);
                    }

                } else if(versionIndex > -1) {
                    let name = label.name.replace('version:', '');
                    
                    issue.version = name;
                
                } else if(estimateIndex > -1) {
                    let name = label.name.replace('estimate:', '');
                   
                    issue.estimate = name;

                } else if(priorityIndex > -1) {
                    let name = label.name.replace('priority:', '');
                    
                    issue.priority = name;
        
                } else if(columnIndex > -1) {
                    let name = label.name.replace('column:', '');
                    
                    issue.column = name;

                }
            }

            if(gitHubIssue.state == 'closed') {
                issue.column = 'done';
            }

            if(gitHubIssue.milestone) {
                issue.milestone = gitHubIssue.milestone.title;
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
     * Convert repository model to GitHub schema
     *
     * @param {Repository} repository
     */
    convertRepository(repository) {
        let gitHubRepository = {
            name: repository.title,
            description: repository.description,
            has_issues: true
        };

        return gitHubRepository;
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
        let assignee = issue.getAssignee();

        if(assignee) {
            gitHubIssue.assignee = assignee.name;
        
        } else {
            gitHubIssue.assignee = '';

        }
        
        // State
        gitHubIssue.state = issue.column == 'done' ? 'closed' : 'open';

        // Milestone
        if(issue.getMilestone()) {
            gitHubIssue.milestone = issue.getMilestone().id;
        } else {
            gitHubIssue.milestone = null;
        }
        
        // Tags
        for(var tag of issue.tags) {
            gitHubIssue.labels.push('tag:' + tag);
        }
        
        // Type
        if(issue.getType()) {
            gitHubIssue.labels.push('type:' + issue.getType());
        }

        // Version
        let version = resources.versions[issue.version];

        if(version) {
            gitHubIssue.labels.push('version:' + version);
        }
       
        // Estimate
        if(issue.getEstimate()) {
            gitHubIssue.labels.push('estimate:' + issue.getEstimate());
        }

        // Priority
        if(issue.getPriority()) {
            gitHubIssue.labels.push('priority:' + issue.getPriority());
        }

        // Column
        if(issue.column && issue.column != 'to do' && issue.column != 'done') {
            gitHubIssue.labels.push('column:' + issue.column);
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
     *
     * @return {Promise} Promise
     */
    addIssueComment(issue, text) {
        return this.post('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id + '/comments', {
            body: text
        });
    }

    /**
     * Update issue comment
     *
     * @param {Issue} issue
     * @param {Object} comment
     *
     * @return {Promise} Promise
     */
    updateIssueComment(issue, comment) {
        if(!comment || !comment.text) {
            return this.removeIssueComment(issue, comment);
        }

        return this.patch('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/comments/' + comment.index, {
            body: comment.text
        });
    }
    
    /**
     * Remove issue comment
     *
     * @param {Issue} issue
     * @param {Object} comment
     *
     * @return {Promise} Promise
     */
    removeIssueComment(issue, comment) {
        return this.delete('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/comments/' + comment.index);
    }

    /**
     * Get issue comments
     *
     * @param {Object} issue
     *
     * @returns {Promise} promise
     */
    getIssueComments(issue) {
        return this.get('/repos/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id + '/comments')
        .then((gitHubComments) => {
            let comments = [];

            for(let gitHubComment of gitHubComments) {
                let comment = {
                    collaborator: new User({
                        id: gitHubComment.user.id,
                        name: gitHubComment.user.login,
                        avatar: gitHubComment.user.avatar_url
                    }),
                    text: gitHubComment.body,
                    index: gitHubComment.id
                };

                comments.push(comment);
            }

            return Promise.resolve(comments);            
        });
    }
}

module.exports = GitHubApi;
