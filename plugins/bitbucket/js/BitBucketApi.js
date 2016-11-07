'use strict';

let ApiHelper = require('../../../src/client/js/helpers/ApiHelper');

class BitBucketApi extends ApiHelper {
    /**
     * Gets the configuration for this plugin
     */
    getConfig() {
        return {
            readonlyResources: [
                'issueTypes',
                'issueEstimates',
                'issuePriorities',
                'issueColumns'
            ]
        };
    }

    // ----------
    // Generic API methods
    // ----------
    /**
     * GET method
     *
     * @param {String} url
     * @param {String} key
     * @param {Boolean} recursePages
     *
     * @returns {Promise} promise
     */
    get(url, key, recursePages) {
        let self = this;

        return new Promise((resolve, reject) => {
            let items = [];

            function getPage(page) {
                let apiUrl = 'https://api.bitbucket.org/' + url;

                if(recursePages) {
                    apiUrl += '?limit=50&start=' + page;
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
                    error: (e) => {
                        self.error(e);
                        reject(new Error(e.responseText));
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
                    this.error(e);
                    reject(new Error(e.responseText));
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
                    reject(new Error(e.responseText));
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
                data: data,
                cache: false,
                success: (result) => {
                    resolve(result);
                },
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + self.getApiToken());
                },
                error: (e) => {
                    reject(new Error(e.responseText));
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
                    reject(new Error(e.responseText));
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
            
            if(error.responseJSON) {
                displayError(new Error(error.responseJSON.error.message));
            } else {
                displayError(new Error(error.statusText));
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
     * Gets projects
     *
     * @returns {Promise} promise
     */
    getProjects() {
        return new Promise((resolve, reject) => {
            this.get('1.0/user/repositories')
            .then((repositories) => {
                this.processProjects(repositories);

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
        if(this.isSpectating()) {
            return Promise.resolve([]);
        }

        return this.get('2.0/teams/' + this.getProjectOwner() + '/members')
        .then((res) => {
            if(Array.isArray(res)) {
                res = res[0];
            }

            this.processMembers(res.values);

            return Promise.resolve();
        })
        .catch((e) => {
            // TODO try something else to retrieve collaborators

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
        return this.get('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues', 'issues', false)
        .then((res) => {
            this.processIssues(res);

            return Promise.resolve();
        });
    }
    
    /**
     * Gets issue types
     *
     * @returns {Promise} promise
     */
    getIssueTypes() {
        resources.issueTypes = [
            'bug',
            'enhancement',
            'proposal',
            'task'
        ];
            
        return Promise.resolve();
    }
    
    /**
     * Gets issue columns
     *
     * @returns {Promise} promise
     */
    getIssueColumns() {
        resources.issueColumns = [
            'new',
            'open',
            'resolved',
            'closed'
        ];
            
        return Promise.resolve();
    }
    
    /**
     * Gets issue priorities
     *
     * @returns {Promise} promise
     */
    getIssuePriorities() {
        resources.issuePriorities = [
            'trivial',
            'minor',
            'major',
            'critical',
            'blocker'
        ];

        return Promise.resolve();
    }
    
    /**
     * Gets issue estimates
     *
     * @returns {Promise} promise
     */
    getIssueEstimates() {
        resources.issueEstimates = [
            '0.25h',
            '0.5h',
            '1h',
            '2h',
            '3h',
            '4h',
            '5h',
            '6h',
            '7h',
            '8h'
        ];

        return Promise.resolve();
    }
    
    /**
     * Gets versions
     *
     * @returns {Promise} promise
     */
    getVersions() {
        return this.get('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues/versions')
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
        return this.get('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues/milestones')
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
        return this.post('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues', this.convertIssue(issue))
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
            this.put('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/collaborators/' + collaborator)
            .then(() => {
                callback();
            });    
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
            this.post('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels', {
                name: 'type:' + type,
                color: 'ffffff'
            })
            .then(() => {
                callback();
            });
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
            this.post('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels', {
                name: 'priority:' + priority,
                color: 'ffffff'
            })
            .then(() => {
                callback();
            });
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
            this.post('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels', {
                name: 'estimate:' + estimate,
                color: 'ffffff'
            })
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
    addIssueColumn(column) {
        return new Promise((callback) => {
            this.post('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels', {
                name: 'column:' + column,
                color: 'ffffff'
            })
            .then(() => {
                callback();
            });
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

        return this.post('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues/milestones', this.convertMilestone(milestone))
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
        return this.post('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues/versions', {
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
        return this.delete('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues/' + issue.id);
    }
    
    /**
     * Removes collaborator
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeCollaborator(index) {
        return this.delete('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/collaborators/' + window.resources.collaborators[index]);
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
            this.delete('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues/milestones/' + milestone.id)
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
        
        return this.delete('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues/versions/' + version.id);
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
        return this.put('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues/' + issue.id, this.convertIssue(issue));
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
            this.put('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues/milestones/' + milestone.id, this.convertMilestone(milestone))
            .then(() => {
                callback();
            });
        });
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
        return new Promise((callback) => {
            this.patch('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels/type:' + previousName, {
                name: 'type:' + type,
                color: 'ffffff'
            })
            .then(() => {
                callback();
            });
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
        return new Promise((callback) => {
            this.patch('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels/priority:' + previousName, {
                name: 'priority:' + priority,
                color: 'ffffff'
            })
            .then(() => {
                callback();
            });
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
        return new Promise((callback) => {
            this.patch('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels/estimate:' + previousName, {
                name: 'estimate:' + estimate,
                color: 'ffffff'
            })
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
    updateIssueColumn(column, previousName) {
        return new Promise((callback) => {
            this.patch('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/labels/column:' + previousName, {
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

        return this.put('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues/versions/' + version.id, {
            name: newName
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
            let project = new Project({
                index: i,
                id: projects[i].slug,
                title: projects[i].slug,
                description: projects[i].description,
                owner: projects[i].owner
            });

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
            let milestone = new Milestone({
                index: i,
                title: milestones[i].name,
                id: milestones[i].id,
                originalName: milestones[i].name
            });

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

        window.resources.issueEstimates.sort((a, b) => {
            a = parseFloat(a);
            b = parseFloat(b);

            if(a < b) {
                return -1;
            }
            
            if(a > b) {
                return 1;
            }

            return 0;
        });
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
     * Process team members
     *
     * @param {Array} members
     */
    processMembers(members) {
        resources.collaborators = [];

        for(let member of members || []) {
            resources.collaborators.push({
                id: member.username,
                name: member.username,
                displayName: member.display_name,
                avatar: member.links.avatar.href
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
            issue.description = bitBucketIssue.content;
            issue.id = bitBucketIssue.local_id;
            issue.createdAt = bitBucketIssue.utc_created_on;

            if(bitBucketIssue.status == 'closed') {
                issue.closedAt = bitBucketIssue.utc_last_updated;
            }
            
            issue.reporter = ResourceHelper.getCollaborator(bitBucketIssue.reported_by.username);

            if(bitBucketIssue.responsible) {
                issue.assignee = ResourceHelper.getCollaborator(bitBucketIssue.responsible.username);
            }

            // Clean up milestone name
            let milestoneDateRegex = /{% (start|end)Date: (\d+) %}/g;

            bitBucketIssue.metadata.milestone = (bitBucketIssue.metadata.milestone || '').replace(milestoneDateRegex, '');

            issue.priority = ResourceHelper.getIssuePriority(bitBucketIssue.priority);
            issue.milestone = ResourceHelper.getMilestone(bitBucketIssue.metadata.milestone);
            issue.type = ResourceHelper.getIssueType(bitBucketIssue.metadata.kind);
            issue.version = ResourceHelper.getVersion(bitBucketIssue.metadata.version);
            issue.column = ResourceHelper.getIssueColumn(bitBucketIssue.status);

            // Remove meta
            issue.description = issue.description.replace(/\n\n---\[Samoosa\]---\n\n/g, '');
            
            // Parse for estimate
            let estimateRegex = /{% estimate: ((\d+.\d+|\d+)(d|h|m)|(\d+.\d+|\d+)) %}/g;
            let estimateMatches = estimateRegex.exec(issue.content || '');

            if(estimateMatches && estimateMatches.length > 0) {
                issue.estimate = ResourceHelper.getIssueEstimates(estimateMatches[0]);
            }

            // Remove estimate markup
            issue.description = issue.description.replace(estimateRegex, '');

            issue.index = indexCounter;

            window.resources.issues[issue.index] = issue;

            indexCounter++;
        }
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

        // State
        let issueColumn = issue.getColumn();

        bitBucketIssue.status = issueColumn;

        // Milestone
        let milestone = issue.getMilestone();
        
        if(milestone) {
            bitBucketIssue.milestone = milestone.originalName;
        }

        // Type
        let issueType = issue.getType();

        bitBucketIssue.kind = issueType;

        // Version
        let version = issue.getVersion();

        bitBucketIssue.version = version;
       
        // Description meta
        bitBucketIssue.content += '\n\n---[Samoosa]---\n\n';

        // Estimate
        let issueEstimate = resources.issueEstimates[issue.estimate];
        let estimateString = '{% estimate: ' + issueEstimate + ' %}';

        bitBucketIssue.content += estimateString;

        // Priority
        let issuePriority = issue.getPriority();

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
        return this.post('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues/' + issue.id + '/comments', {
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
        return this.put('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues/' + issue.id + '/comments/' + comment.index, {
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
        return this.get('1.0/repositories/' + this.getProjectOwner() + '/' + this.getProjectName() + '/issues/' + issue.id + '/comments')
        .then((bitBucketComments) => {
            let comments = [];

            for(let bitBucketComment of bitBucketComments) {
                let comment = {
                    collaborator: ResourceHelper.getCollaborator(bitBucketComment.author_info.username),
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
