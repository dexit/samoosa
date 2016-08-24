'use strict';

let ApiHelper = require('../../../src/client/js/helpers/ApiHelper');

let labelCache;

class BitBucketApi extends ApiHelper {
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
                let apiUrl = 'https://api.bitbucket.org/1.0' + url;

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
                        xhr.setRequestHeader('Authorization', 'Basic ' + self.getApiToken());
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

        return new Promise((reseolve, reject) => {
            $.ajax({
                url: 'https://api.bitbucket.org/1.0' + url + '?' + (param ? param + '&' : ''),
                type: 'DELETE',
                cache: false,
                success: (result) => {
                    resolve(result);
                },
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('Authorization', 'Basic ' + self.getApiToken());
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
                url: 'https://api.bitbucket.org/1.0' + url,
                type: 'POST',
                data: data,
                cache: false,
                success: (result) => {
                    resolve(result);
                },
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('Authorization', 'Basic ' + self.getApiToken());
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
                url: 'https://api.bitbucket.org/1.0' + url,
                type: 'POST',
                data: data,
                cache: false,
                success: (result) => {
                    resolve(result);
                },
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('Authorization', 'Basic ' + self.getApiToken());
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
                url: 'https://api.bitbucket.org/1.0' + url,
                type: 'POST',
                data: data,
                cache: false,
                success: (result) => {
                    resolve(result);
                },
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('Authorization', 'Basic ' + self.getApiToken());
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
            console.log(error);

            switch(error.status) {
                //case 401: case 403:
                //    this.resetApiToken();
                //    break;

                default:
                    if(error.responseJSON) {
                        alert(error.responseJSON.message);
                    } else {
                        alert(error.statusText);
                    } 
                    break;
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
        return new Promise((resolve, reject) => {
            this.get('/user')
            .then((gitHubUser) => {
                if(Array.isArray(gitHubUser)) {
                    gitHubUser = gitHubUser[0];
                }

                let user = {
                    name: gitHubUser.login,
                    avatar: gitHubUser.avatar_url
                };

                resolve(user);
            })
            .catch((e) => {
                if(this.isSpectating()) {
                    resolve({name: '', avatar: ''});
                
                } else {
                    reject(e);

                }  
            });   
        });
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
            this.get('/user/repositories')
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
        return new Promise((resolve, reject) => {
            this.get('/privileges/' + this.getUserName() + '/' + this.getProjectName())
            .then((collaborators) => {
                this.processCollaborators(collaborators);

                resolve();
            })
            .catch((e) => {
                if(this.isSpectating()) {
                    resolve([]);
                
                } else {
                    reject(e);

                }
            });
        });
    }

    /**
     * Gets issues
     *
     * @returns {Promise} promise
     */
    getIssues() {
        return new Promise((resolve, reject) => {
            this.get('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/issues', 'issues', false)
            .then((res) => {
                this.processIssues(res);

                resolve();
            })
            .catch(reject);
        });
    }
    
    /**
     * Gets issue types
     *
     * @returns {Promise} promise
     */
    getIssueTypes() {
        return new Promise((resolve, reject) => {
            window.resources.issueTypes = [
                'bug',
                'enhancement',
                'proposal',
                'task'
            ];
            
            resolve();
        });
    }
    
    /**
     * Gets issue columns
     *
     * @returns {Promise} promise
     */
    getIssueColumns() {
        return new Promise((resolve, reject) => {
            window.resources.issueColumns = [
                'open',
                'resolved',
                'closed'
            ];
            
            resolve();
        });
    }
    
    /**
     * Gets issue priorities
     *
     * @returns {Promise} promise
     */
    getIssuePriorities() {
        return new Promise((resolve, reject) => {
            window.resources.issuePriorities = [
                'trivial',
                'minor',
                'major',
                'critical',
                'blocker'
            ];

            resolve();
        });
    }
    
    /**
     * Gets issue estimates
     *
     * @returns {Promise} promise
     */
    getIssueEstimates() {
        return new Promise((resolve, reject) => {
            window.resources.issueEstimates = [
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

            resolve();
        });
    }
    
    /**
     * Gets versions
     *
     * TODO: This only returns empty arrays, why?
     *
     * @returns {Promise} promise
     */
    getVersions() {
        return new Promise((callback) => {
            this.get('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/issues/versions')
            .then((versions) => {
                this.processVersions(versions);
                
                callback();
            });    
        });
    }

    /**
     * Gets milestones
     *
     * @returns {Promise} promise
     */
    getMilestones() {
        return new Promise((callback) => {
            this.get('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/issues/milestones')
            .then((milestones) => {
                this.processMilestones(milestones);
                
                callback();
            });    
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
        return new Promise((callback) => {
            this.post('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/issues', this.convertIssue(issue))
            .then(() => {
                callback(issue);
            });
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
            this.put('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/collaborators/' + collaborator)
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
            this.post('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/labels', {
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
            this.post('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/labels', {
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
            this.post('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/labels', {
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
            this.post('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/labels', {
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
        return new Promise((callback) => {
            this.post('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/milestones', this.convertMilestone(milestone))
            .then(() => {
                callback();
            });
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
            this.post('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/labels', {
                name: 'version:' + version,
                color: 'ffffff'
            })
            .then(() => {
                callback();
            });
        });
    }

    // ----------
    // Resource removers
    // ----------
    /**
     * Removes collaborator
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */
    removeCollaborator(index) {
        return new Promise((callback) => {
            this.delete('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/collaborators/' + window.resources.collaborators[index])
            .then(() => {
                callback();
            });
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
            this.delete('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/labels/type:' + window.resources.issueTypes[index])
            .then(() => {
                callback();
            });
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
            this.delete('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/labels/priority:' + window.resources.issuePriorities[index])
            .then(() => {
                callback();
            });
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
            this.delete('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/labels/estimate:' + window.resources.issueEstimates[index])
            .then(() => {
                callback();
            });
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
            this.delete('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/labels/column:' + window.resources.issueColumns[index])
            .then(() => {
                callback();
            });
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
            this.delete('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/milestones/' + (parseInt(index) + 1))
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
        return new Promise((callback) => {
            this.delete('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/labels/version:' + window.resources.versions[index])
            .then(() => {
                callback();
            });
        });
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
        return new Promise((callback) => {
            this.put('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/issues/' + issue.id, this.convertIssue(issue))
            .then(() => {
                callback();
            });
        });
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
            this.patch('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/milestones/' + (parseInt(milestone.index) + 1), this.convertMilestone(milestone))
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
            this.patch('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/labels/type:' + previousName, {
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
            this.patch('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/labels/priority:' + previousName, {
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
            this.patch('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/labels/estimate:' + previousName, {
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
            this.patch('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/labels/column:' + previousName, {
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
    updateVersion(version, previousName) {
        return new Promise((callback) => {
            this.patch('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/labels/version:' + previousName, {
                name: 'version:' + version,
                color: 'ffffff'
            })
            .then(() => {
                callback();
            });
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
                title: projects[i].slug,
                description: projects[i].description
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
        window.resources.milestones = [];
        
        for(let i in milestones) {
            let milestone = {
                index: i,
                title: milestones[i].name
            };

            window.resources.milestones[i] = milestone;
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
                title: versions[i].name
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
     * Process collaborators
     *
     * @param {Array} collaborators
     */
    processCollaborators(collaborators) {
        window.resources.collaborators = [];

        for(let collaborator of collaborators) {
            console.log('COLLABORATOR', collaborator);

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
        
        let indexCounter = 0;

        for(let bitBucketIssue of issues) {
            let issue = new Issue();

            issue.title = bitBucketIssue.title;
            issue.description = bitBucketIssue.content;
            issue.id = bitBucketIssue.local_id;
            
            issue.reporter = ResourceHelper.getCollaborator(bitBucketIssue.reported_by.username);

            if(bitBucketIssue.responsible) {
                issue.assignee = ResourceHelper.getCollaborator(bitBucketIssue.responsible.username);
            }

            issue.priority = ResourceHelper.getIssuePriority(bitBucketIssue.priority);
            issue.milestone = ResourceHelper.getMilestone(bitBucketIssue.metadata.milestone);
            issue.type = ResourceHelper.getIssueType(bitBucketIssue.metadata.kind);
            issue.version = ResourceHelper.getVersion(bitBucketIssue.metadata.version);

            // Parse for estimate
            let estimateMatches = /{% estimate: ([0-9](\.[0-9])?h) %}/.exec(issue.content || '');

            if(estimateMatches && estimateMatches.length > 0) {
                issue.estimate = ResourceHelper.getIssueEstimates(estimateMatches[0]);
            }

            switch(bitBucketIssue.status) {
                case 'open': default:
                    issue.column = 0;
                    break;

                case 'resolved': 
                    issue.column = 1;
                    break;

                case 'closed':
                    issue.column = 2;
                    break;
            }

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
        let gitHubMilestone = {
            title: milestone.title,
            description: milestone.description,
            due_on: milestone.endDate,
            state: milestone.closed ? 'closed' : 'open'
        };

        return gitHubMilestone;
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
        let assignee = resources.collaborators[issue.assignee];

        if(assignee) {
            bitBucketIssue.responsible = assignee.name;
        
        } else {
            bitBucketIssue.responsible = '';

        }

        // State
        let issueColumn = resources.issueColumns[issue.column];

        bitBucketIssue.status = issueColumn;

        // Milestone
        let milestone = resources.milestones[issue.milestone];
        
        if(milestone) {
            bitBucketIssue.milestone = milestone.title;
        }

        // Type
        let issueType = resources.issueTypes[issue.type];

        bitBucketIssue.kind = issueType;

        // Version
        let version = resources.versions[issue.version];

        bitBucketIssue.version = version;
       
        // Estimate
        let issueEstimate = resources.issueEstimates[issue.estimate];
        let estimateString = '{% estimate: ' + issueEstimate + ' %}';

        bitBucketIssue.content = bitBucketIssue.content.replace(/{% estimate: ([0-9](\.[0-9])?h) %}/g, '');
        bitBucketIssue.content += estimateString;

        // Priority
        let issuePriority = resources.issuePriorities[issue.type];

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
        return new Promise((callback) => {
            this.post('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/issues/' + (issue.index + 1) + '/comments', {
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
            this.patch('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/issues/comments/' + comment.index, {
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
            this.get('/repositories/' + this.getUserName() + '/' + this.getProjectName() + '/issues/' + (issue.index + 1) + '/comments')
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

module.exports = BitBucketApi;
