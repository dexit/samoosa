'use strict';

let ApiHelper = require('../../../src/client/js/helpers/ApiHelper');

class BitBucketApi extends ApiHelper {
    /**
     * Gets the configuration for this plugin
     */
    getConfig() {
        return {
            readonlyResources: [
                'columns'
            ]
        };
    }

    // ----------
    // Generic API methods
    // ----------
    /**
     * Refresh API token
     *
     * @returns {Promise} Promise
     */
    refresh() {
        spinner('Refreshing token');

        return new Promise((resolve, reject) => {
            let apiUrl = 'http://api.samoosa.rocks/oauth/bitbucket/?refresh=' + localStorage.getItem('refresh');

            $.ajax({
                url: apiUrl,
                type: 'GET',
                success: (result) => {
                    if(result.token) {
                        localStorage.setItem('token', result.token);

                        resolve();
        
						spinner(false);
                    } else {
                        reject(new Error(result));

                    }
                }
            });
        });
    }

    /**
     * Check for refresh
     *
     * @param {Object} error
     *
     * @returns {Boolean} Whether or not we should refresh
     */
    shouldRefresh(error) {
        if(
            error.responseJSON &&
            error.responseJSON.error &&
            error.responseJSON.error.message &&
            error.responseJSON.error.message.indexOf('Access token expired') == 0
        ) {
            debug.log('API token needs a refresh', this);

            return true;
        }

        return false;
    }
    
    /**
     * GET method
     *
     * @param {String} url
     * @param {String} key
     * @param {Boolean} recursePages
     * @param {String} param
     *
     * @returns {Promise} promise
     */
    get(url, key, recursePages, param) {
        let self = this;

        return new Promise((resolve, reject) => {
            let items = [];

            function getPage(page) {
                let apiUrl = 'https://api.bitbucket.org/' + url;

                if(recursePages) {
                    apiUrl += '?limit=50&start=' + page;

                    if(param) {
                        apiUrl += '&' + param;
                    }

                } else if(param) {
                    apiUrl += '?' + param;
                }

                $.ajax({
                    url: apiUrl,
                    type: 'GET',
                    cache: false,
                    success: (result) => {
                        if(result.error) {
                            reject(new Error(result.error.message));
                        
                        } else {
                            if(key) {
                                result = result[key];
                            }

                            items = items.concat(result);

                            if(recursePages && result.length > 0) {
                                getPage(page + 1);

                            } else {
                                resolve(items);

                            }
                        }
                    },
                    beforeSend: (xhr) => {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + self.getApiToken());
                    },
                    error: (xhr) => {
                        if(self.shouldRefresh(xhr)) {
                            self.refresh()
                            .then(() => {
                                getPage(page);
                            })
							.catch((e) => {
								reject(e);
							});    
                        
                        } else {
                            reject(new Error(xhr.responseText));
                        }
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
        let self = this;

        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'https://api.bitbucket.org/' + url + '?' + (param ? param + '&' : ''),
                type: 'DELETE',
                cache: false,
                success: (result) => {
                    resolve(result);
                },
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + self.getApiToken());
                },
                error: (e) => {
                    if(this.shouldRefresh(e)) {
                        this.refresh()
                        .then(() => {
                            return this.delete(url, param);
                        })
                        .then((result) => {
                            resolve(result);
                        });    

                    } else {
                        reject(new Error(e.responseText));
                    
                    }
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
        let self = this;

        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'https://api.bitbucket.org/' + url,
                type: 'POST',
                data: data,
                cache: false,
                success: (result) => {
                    resolve(result);
                },
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + self.getApiToken());
                },
                error: (e) => {
                    if(this.shouldRefresh(e)) {
                        this.refresh()
                        .then(() => {
                            return this.patch(url, data);
                        })
                        .then((result) => {
                            resolve(result);
                        });
                    
                    } else {    
                        reject(new Error(e.responseText));
                    
                    }
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
        let self = this;

        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'https://api.bitbucket.org/' + url,
                type: 'POST',
                contentType: data instanceof FormData ? false : undefined,
                data: data,
                processData: data instanceof FormData == false,
                cache: false,
                success: (result) => {
                    resolve(result);
                },
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + self.getApiToken());
                },
                error: (e) => {
                    if(this.shouldRefresh(e)) {
                        this.refresh()
                        .then(() => {
                            return this.post(url, data);
                        })
                        .then((result) => {
                            resolve(result);
                        });
                    
                    } else {    
                        reject(new Error(e.responseText));
                    
                    }
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
        let self = this;

        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'https://api.bitbucket.org/' + url,
                type: 'PUT',
                data: data,
                cache: false,
                success: (result) => {
                    resolve(result);
                },
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + self.getApiToken());
                },
                error: (e) => {
                    if(this.shouldRefresh(e)) {
                        this.refresh()
                        .then(() => {
                            return this.put(url, data);
                        })
                        .then((result) => {
                            resolve(result);
                        });
                    
                    } else {    
                        reject(new Error(e.responseText));
                    
                    }
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
            console.log(JSON.stringify(error));

            if(error.status == 0) { return; }
            
            if(error.responseJSON && error.responseJSON.error && error.responseJSON.error.message) {
                displayError(new Error(error.responseJSON.error.message));
            } else {
                displayError(new Error(error.responseText));
            }
        }
    }

    // ----------
    // Session methods
    // ----------
    /**
     * Gets the currently logged in user object
     *
     * @returns {Promise} promise
     */
    getUser() {
        if(this.isSpectating()) {
            return Promise.resolve({name: '', avatar: ''});
        }

        return this.get('1.0/user')
        .then((response) => {
            if(response[0]) {
                response = response[0];
            }

            if(response.user) {
                response = response.user;
            }

            let bitBucketUser = response;
                
            let user = new User({
                name: bitBucketUser.username,
                id: bitBucketUser.username,
                avatar: bitBucketUser.avatar
            });

            return Promise.resolve(user);
        })
    }

    // ----------
    // Resource getters
    // ----------
    /**
     * Gets repos
     *
     * @returns {Promise} promise
     */
    getRepositories() {
        return new Promise((resolve, reject) => {
            this.get('1.0/user/repositories')
            .then((repositories) => {
                this.processRepositories(repositories);

                resolve();
            })
            .catch(reject);
        });
    }
    
    /**
     * Gets collaborators
     *
     * @returns {Promise} promise
     */
    getCollaborators() {
        return this.get('2.0/teams/' + this.getRepositoryOwner() + '/members')
        .then((res) => {
            if(Array.isArray(res)) {
                res = res[0];
            }

            this.processMembers(res.values);

            return Promise.resolve();
        })
        .catch((e) => {
            displayError(e);
        })
        .finally(() => {
            if(resources.collaborators.length < 1) {
                resources.collaborators.push(User.getCurrent());
            }

            return Promise.resolve();
        });
    }

    /**
     * Gets issues
     *
     * @returns {Promise} promise
     */
    getIssues() {
        return this.get('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues', 'issues', false)
        .then((res) => {
            this.processIssues(res);

            return Promise.resolve();
        });
    }
    
    /**
     * Gets issue columns
     *
     * @returns {Promise} promise
     */
    getColumns() {
        resources.columns = [
            'to do',
            'in progress',
            'done'
        ];
            
        return Promise.resolve();
    }
    
    /**
     * Gets issue attachments
     *
     * @param {Issue} issue
     *
     * @returns {Promise} Array of attachments
     */
    getIssueAttachments(issue) {
        return this.get('2.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id + '/attachments', 'values')
        .then((response) => {
            if(!Array.isArray(response)) {
                return Promise.reject(new Error('Response of issue attachments was not an array'));
            }
            
            let attachments = [];

            for(let obj of response) {
                if(!obj) { continue; }

                let apiUrl = 'https://api.bitbucket.org/2.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id + '/attachments/' + obj.name;

                let attachment = new Attachment({
                    name: obj.name,
                    isRedirect: true,
                    url: apiUrl + '?access_token=' + this.getApiToken()
                });
                
                attachments[attachments.length] = attachment;
            };

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
        return this.get('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/versions')
        .then((versions) => {
            this.processVersions(versions);
            
            return Promise.resolve();
        });
    }

    /**
     * Gets milestones
     *
     * @returns {Promise} promise
     */
    getMilestones() {
        return this.get('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/milestones')
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
        return this.post('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues', this.convertIssue(issue))
        .then((bitBucketIssue) => {
            issue.id = bitBucketIssue.local_id;

            return Promise.resolve(new Issue(issue));
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
            this.put('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/collaborators/' + collaborator)
            .then(() => {
                callback();
            });    
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
        return new Promise((callback) => {
            this.post('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels', {
                name: 'column:' + column,
                color: 'ffffff'
            })
            .then(() => {
                callback();
            });
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
        let apiUrl = '2.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id + '/attachments';
        let postData = new FormData();
        
        postData.append('file', attachment.file);

        return this.post(apiUrl, postData) 
        .then((response) => {
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
            milestone = new Milestone({
                title: milestone
            });
        }

        return this.post('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/milestones', this.convertMilestone(milestone))
        .then((bitBucketMilestone) => {
            milestone.id = bitBucketMilestone.id;

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
        return this.post('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/versions', {
            name: version
        })
        .then((bitBucketVersion) => {
            return Promise.resolve({
                title: version,
                id: bitBucketVersion.id
            });
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
        return this.delete('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id);
    }
    
    /**
     * Removes collaborator
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeCollaborator(index) {
        return this.delete('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/collaborators/' + window.resources.collaborators[index]);
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
        let apiUrl = '2.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id + '/attachments/' + attachment.getName();

        return this.delete(apiUrl);
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

        return new Promise((callback) => {
            this.delete('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/milestones/' + milestone.id)
            .then(() => {
                callback();
            });
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
        let version = resources.versions[index];
        
        return this.delete('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/versions/' + version.id);
    }

    // ----------
    // Resource updaters
    // ----------
    /**
     * Update repo
     *
     * @param {Repository} repo
     *
     * @returns {Promise} Promise
     */
    updateRepository(repo, previousName) {
        return this.put('1.0/repositories/' + repo.owner + '/' + (repo.id || previousName), this.convertRepository(repo))
        .then((bitBucketRepository) => {
            return Promise.resolve(repo);  
        });
    }
    
    /**
     * Update issue
     *
     * @param {Object} issue
     */
    updateIssue(issue) {
        return this.put('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id, this.convertIssue(issue));
    }

    /**
     * Updates milestone 
     *
     * @param {Object} milestone
     *
     * @returns {Promise} promise
     */
    updateMilestone(milestone) {
        return new Promise((callback) => {
            this.put('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/milestones/' + milestone.id, this.convertMilestone(milestone))
            .then(() => {
                callback();
            });
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
        return new Promise((callback) => {
            this.patch('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/labels/column:' + previousName, {
                name: 'column:' + column,
                color: 'ffffff'
            })
            .then(() => {
                callback();
            });
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
    updateVersion(newName, previousName) {
        let version = resources.versions.filter((v) => {
            return v.title == previousName;
        })[0];

        return this.put('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/versions/' + version.id, {
            name: newName
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
        resources.repositories = [];

        for(let i in repositories) {
            let repository = new Repository({
                index: i,
                id: repositories[i].uuid,
                title: repositories[i].slug,
                description: repositories[i].description,
                owner: repositories[i].owner
            });

            resources.repositories[i] = repository;
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
            let milestone = new Milestone({
                index: i,
                title: milestones[i].name,
                id: milestones[i].id
            });

            milestone.originalName = milestones[i].name;

            // Parse end date
            let endDateRegex = /{% endDate: (\d+) %}/g;
            let endDateMatches = endDateRegex.exec(milestone.title || '');
            
            if(endDateMatches && endDateMatches.length > 1) {
                milestone.endDate = endDateMatches[1];
            }
            
            milestone.title = milestone.title.replace(endDateRegex, '');

            // Add to resources list
            resources.milestones[i] = milestone;
        }
    }

    /**
     * Process versions
     *
     * @param {Array} versions
     */
    processVersions(versions) {
        window.resources.versions = [];

        for(let i in versions) {
            let version = {
                index: i,
                title: versions[i].name,
                id: versions[i].id
            };

            window.resources.versions[i] = version;
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
    processMembers(collaborators) {
        resources.collaborators = [];

        for(let collaborator of collaborators || []) {
            resources.collaborators.push({
                id: collaborator.username,
                name: collaborator.username,
                displayName: collaborator.display_name,
                avatar: collaborator.links.avatar.href
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
        
        let indexCounter = 0;

        for(let bitBucketIssue of issues) {
            let issue = new Issue();

            issue.title = bitBucketIssue.title;
            issue.setDescriptionWithMetaData(bitBucketIssue.content)
            issue.id = bitBucketIssue.local_id;
            issue.createdAt = bitBucketIssue.utc_created_on;

            if(bitBucketIssue.status == 'closed') {
                issue.closedAt = bitBucketIssue.utc_last_updated;
            }
            
            issue.reporter = bitBucketIssue.reported_by.username;

            if(bitBucketIssue.responsible) {
                issue.assignee = bitBucketIssue.responsible.username;
            }

            // Remap issue type names
            switch(bitBucketIssue.metadata.kind) {
                case 'enhancement':
                    bitBucketIssue.metadata.kind = 'improvement';
                    break;
                
                case 'proposal':
                    bitBucketIssue.metadata.kind = 'new feature';
                    break;
            }
            
            // Remep issue status names
            switch(bitBucketIssue.status) {
                case 'new':
                    bitBucketIssue.status = 'to do';
                    break;
                
                case 'open':
                    bitBucketIssue.status = 'in progress';
                    break;
                
                case 'closed':
                    bitBucketIssue.status = 'done';
                    break;
            }

            // Remap issue priority names
            switch(bitBucketIssue.priority) {
                case 'trivial':
                    bitBucketIssue.priority = 'low';
                    break;
                
                case 'minor':
                    bitBucketIssue.priority = 'medium';
                    break;
                
                case 'major':
                    bitBucketIssue.priority = 'high';
                    break;
                
                case 'critical':
                    bitBucketIssue.priority = 'blocker';
                    break;
            }

            // Clean up milestone name
            let milestoneDateRegex = /{% (start|end)Date: (\d+) %}/g;

            bitBucketIssue.metadata.milestone = (bitBucketIssue.metadata.milestone || '').replace(milestoneDateRegex, '');

            issue.priority = bitBucketIssue.priority;
            issue.milestone = bitBucketIssue.metadata.milestone;
            issue.type = bitBucketIssue.metadata.kind;
            issue.version = bitBucketIssue.metadata.version;
            issue.column = bitBucketIssue.status;
            
            issue.index = indexCounter;

            window.resources.issues[issue.index] = issue;

            indexCounter++;
        }
    }
    
    /**
     * Convert repository model to BitBucket schema
     *
     * @param {Repository} repository
     */
    convertRepository(repository) {
        let bitBucketRepository = {
            name: repository.title,
            description: repository.description,
            has_issues: true,
            is_private: true,
            project: repository.project
        };

        return bitBucketRepository;
    }

    /**
     * Convert milestone model to BitBucket schema
     *
     * @param {Object} milestone
     */
    convertMilestone(milestone) {
        let bitBucketMilestone = {
            name: milestone.title,
            id: milestone.id
        };

        // End date
        if(milestone.getEndDate()) {
            let endDateString = '{% endDate: ' + milestone.getEndDate().getTime() + ' %}';

            bitBucketMilestone.name += endDateString;
        }
        
        return bitBucketMilestone;
    }

    /**
     * Convert issue model to BitBucket schema
     *
     * @param {Object} issue
     */
    convertIssue(issue) {
        // Directly mappable properties
        let bitBucketIssue = {
            title: issue.title,
            content: issue.description,
            local_id: issue.id
        };

        // Assignee
        let assignee = issue.getAssignee();

        if(assignee) {
            bitBucketIssue.responsible = assignee.name;
        
        } else {
            bitBucketIssue.responsible = '';

        }

        // Column
        let column = issue.column;

        switch(column) {
            case 'to do':
                column = 'new';
                break;
            
            case 'in progress':
                column = 'open';
                break;
            
            case 'done':
                column = 'closed';
                break;
        }

        bitBucketIssue.status = column;

        // Milestone
        let milestone = issue.getMilestone();
        
        if(milestone) {
            bitBucketIssue.milestone = milestone.originalName;
        } else {
            bitBucketIssue.milestone = '';
        }

        // Type
        let issueType = issue.getType();

        switch(issueType) {
            case 'improvement':
                issueType = 'enhancement';
                break;
            
            case 'new feature':
                issueType = 'proposal';
                break;
        }

        bitBucketIssue.kind = issueType;

        // Version
        let version = issue.getVersion();

        bitBucketIssue.version = version;
      
        // Tags
        if(issue.tags.length > 0) {
            bitBucketIssue.content += '{% tags:' + issue.tags.join(',') + ' %}';
        }

        // Estimate
        let issueEstimate = issue.getEstimate();
        let estimateString = '{% estimate:' + issueEstimate + ' %}';

        bitBucketIssue.content += estimateString;

        // Priority
        let issuePriority = issue.getPriority();

        switch(issuePriority) {
            case 'low':
                issuePriority = 'trivial';
                break;

            case 'medium':
                issuePriority = 'minor';
                break;
            
            case 'high':
                issuePriority = 'major';
                break;
        }

        bitBucketIssue.priority = issuePriority;

        return bitBucketIssue;
    }

    /**
     * Add issue comment
     *
     * @param {Issue} issue
     * @param {String} text
     */
    addIssueComment(issue, text) {
        return this.post('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id + '/comments', {
            content: text
        });
    }

    /**
     * Update issue comment
     *
     * @param {Issue} issue
     * @param {Object} comment
     */
    updateIssueComment(issue, comment) {
        return this.put('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id + '/comments/' + comment.index, {
            content: comment.text
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
        return this.get('1.0/repositories/' + this.getRepositoryOwner() + '/' + this.getRepositoryName() + '/issues/' + issue.id + '/comments')
        .then((bitBucketComments) => {
            let comments = [];

            for(let bitBucketComment of bitBucketComments) {
                let comment = {
                    collaborator: bitBucketComment.author_info.username,
                    text: bitBucketComment.content,
                    index: bitBucketComment.comment_id
                };

                comments.push(comment);
            }

            return Promise.resolve(comments);            
        });
    }
}

module.exports = BitBucketApi;
