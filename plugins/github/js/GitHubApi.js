'use strict';

let ApiHelper = require('../../../src/client/js/helpers/ApiHelper');

let labelCache;

let org = localStorage.getItem('gitHubOrg');
let repo = localStorage.getItem('gitHubRepo');

class GitHubApi extends ApiHelper {
    // ----------
    // Checkers
    // ----------
    /**
     * Check whether the connection to the source has been made
     */
    checkConnection() {
        return new Promise((callback) => {
            if(!localStorage.getItem('gitHubOrg')) {
                localStorage.setItem('gitHubOrg', prompt('Please input org name'));
            }

            if(!localStorage.getItem('gitHubRepo')) {
                localStorage.setItem('gitHubRepo', prompt('Please input repo name'));
            }

            callback();
        });
    }

    // ----------
    // Generic API methods
    // ----------
    /**
     * GET method
     *
     * @param {String} url
     * @param {String} param
     *
     * @returns {Promise} promise
     */
    get(url, param) {
        return new Promise((callback) => {
            $.ajax({
                url: 'https://api.github.com' + url + '?' + (param ? param + '&' : '') + 'access_token=' + this.getApiToken(),
                type: 'GET',
                success: (result) => {
                    callback(result);
                },
                error: (e) => {
                    this.error(e);
                }
            });
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
        return new Promise((callback) => {
            $.ajax({
                url: 'https://api.github.com' + url + '?' + (param ? param + '&' : '') + 'access_token=' + this.getApiToken(),
                type: 'DELETE',
                success: (result) => {
                    callback(result);
                },
                error: (e) => {
                    this.error(e);
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

        return new Promise((callback) => {
            $.ajax({
                url: 'https://api.github.com' + url + '?access_token=' + this.getApiToken(),
                type: 'PATCH',
                data: data,
                success: (result) => {
                    callback(result);
                },
                error: (e) => {
                    this.error(e);
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

        return new Promise((callback) => {
            $.ajax({
                url: 'https://api.github.com' + url + '?access_token=' + this.getApiToken(),
                type: 'POST',
                data: data,
                success: (result) => {
                    callback(result);
                },
                error: (e) => {
                    this.error(e);
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
        return new Promise((callback) => {
            $.ajax({
                url: 'https://api.github.com' + url + '?access_token=' + this.getApiToken(),
                type: 'PUT',
                success: (result) => {
                    callback(result);
                },
                error: (e) => {
                    this.error(e);
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
                case 401:
                    this.resetApiToken();
                    break;

                default:
                    if(error.responseJSON) {
                        alert(error.responseJSON.message);
                    } else {
                        alert(error.statusText);
                    } 
                    break;
            }

            console.log(error);
        }
    }

    // ----------
    // Session methods
    // ----------
    /**
     * Resets the API token and reloads
     */
    resetApiToken() {
        localStorage.setItem('gitHubApiToken', '');

        this.getApiToken();

        location.reload();
    }

    /**
     * Gets the API token and prompts for one if needed
     * 
     * @returns {String} token
     */
    getApiToken() {
        if(!localStorage.getItem('gitHubApiToken')) {
            localStorage.setItem('gitHubApiToken', prompt('Please input API token'));
        }

        return localStorage.getItem('gitHubApiToken');
    }
    
    /**
     * Gets the currently logged in user object
     *
     * @returns {Promise} promise
     */
    getUser() {
        return new Promise((callback) => {
            this.get('/user')
            .then((gitHubUser) => {
                let user = {
                    name: gitHubUser.login,
                    avatar: gitHubUser.avatar_url
                };

                callback(user);
            });   
        });
    }

    /**
     * Logs out the currently logged in user and reloads
     */
    logOut() {
        localStorage.setItem('gitHubApiToken', '');
        
        location.reload();
    }

    // ----------
    // Resource getters
    // ----------
    /**
     * Gets collaborators
     *
     * @returns {Promise} promise
     */
    getCollaborators() {
        return new Promise((callback) => {
            this.get('/repos/' + org + '/' + repo + '/collaborators')
            .then((collaborators) => {
                this.processCollaborators(collaborators);

                callback();
            });
        });
    }

    /**
     * Gets issues
     *
     * @returns {Promise} promise
     */
    getIssues() {
        return new Promise((callback) => {
            this.get('/repos/' + org + '/' + repo + '/issues', 'state=all')
            .then((issues) => {
                this.processIssues(issues);

                callback();
            });
        });
    }
    
    /**
     * Gets labels and caches them
     *
     * @returns {Promise} promise
     */
    getLabels() {
        return new Promise((callback) => {
            if(!labelCache) {
                this.get('/repos/' + org + '/' + repo + '/labels')
                .then((labels) => {
                    labelCache = labels;

                    callback(labelCache);
                });    

            } else {
                callback(labelCache);
            
            }
        });
    }

    /**
     * Gets issue types
     *
     * @returns {Promise} promise
     */
    getIssueTypes() {
        return new Promise((callback) => {
            this.getLabels()
            .then((labels) => {
                this.processIssueTypes(labels);

                callback();
            });
        });
    }
    
    /**
     * Gets issue columns
     *
     * @returns {Promise} promise
     */
    getIssueColumns() {
        return new Promise((callback) => {
            this.getLabels()
            .then((labels) => {
                this.processIssueColumns(labels);

                callback();
            });
        });
    }
    
    /**
     * Gets issue priorities
     *
     * @returns {Promise} promise
     */
    getIssuePriorities() {
        return new Promise((callback) => {
            this.getLabels()
            .then((labels) => {
                this.processIssuePriorities(labels);

                callback();
            });
        });
    }
    
    /**
     * Gets issue estimates
     *
     * @returns {Promise} promise
     */
    getIssueEstimates() {
        return new Promise((callback) => {
            this.getLabels()
            .then((labels) => {
                this.processIssueEstimates(labels);

                callback();
            });
        });
    }
    
    /**
     * Gets versions
     *
     * @returns {Promise} promise
     */
    getVersions() {
        return new Promise((callback) => {
            this.getLabels()
            .then((labels) => {
                this.processVersions(labels);

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
            this.get('/repos/' + org + '/' + repo + '/milestones')
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
            this.post('/repos/' + org + '/' + repo + '/issues', this.convertIssue(issue))
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
            this.put('/repos/' + org + '/' + repo + '/collaborators/' + collaborator)
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
            this.post('/repos/' + org + '/' + repo + '/labels', {
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
            this.post('/repos/' + org + '/' + repo + '/labels', {
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
            this.post('/repos/' + org + '/' + repo + '/labels', {
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
            this.post('/repos/' + org + '/' + repo + '/labels', {
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
     * TODO: Add remaining properties
     *
     * @param {String} milestone
     *
     * @returns {Promise} promise
     */
    addMilestone(milestone) {
        return new Promise((callback) => {
            this.post('/repos/' + org + '/' + repo + '/milestones', {
                title: milestone
            })
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
            this.post('/repos/' + org + '/' + repo + '/labels', {
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
            this.delete('/repos/' + org + '/' + repo + '/collaborators/' + window.resources.collaborators[index])
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
            this.delete('/repos/' + org + '/' + repo + '/labels/type:' + window.resources.issueTypes[index])
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
            this.delete('/repos/' + org + '/' + repo + '/labels/priority:' + window.resources.issuePriorities[index])
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
            this.delete('/repos/' + org + '/' + repo + '/labels/estimate:' + window.resources.issueEstimates[index])
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
            this.delete('/repos/' + org + '/' + repo + '/labels/column:' + window.resources.issueColumns[index])
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
            this.delete('/repos/' + org + '/' + repo + '/milestones/' + (index + 1))
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
            this.delete('/repos/' + org + '/' + repo + '/labels/version:' + window.resources.versions[index])
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
            this.patch('/repos/' + org + '/' + repo + '/issues/' + (issue.index + 1), this.convertIssue(issue))
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
            this.patch('/repos/' + org + '/' + repo + '/milestones/' + (parseInt(milestone.index) + 1), this.convertMilestone(milestone))
            .then(() => {
                callback();
            });
        });
    }

    // ----------
    // Resource processing methods
    // ----------
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
                title: milestones[i].title,
                description: milestones[i].description,
                endDate: milestones[i].due_on
            };

            window.resources.milestones.push(milestone);
        }
        
        window.resources.milestones.sort((a, b) => {
            a = new Date(a.due_on).floor();
            b = new Date(b.due_on).floor();

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
            
            issue.reporter =  ResourceHelper.getCollaborator(gitHubIssue.user.login);

            if(gitHubIssue.assignee) {
                issue.assignee = ResourceHelper.getCollaborator(gitHubIssue.assignee.login);
            }

            for(let label of gitHubIssue.labels) {
                let typeIndex = label.name.indexOf('type:');
                let priorityIndex = label.name.indexOf('priority:');
                let estimateIndex = label.name.indexOf('estimate:');
                let versionIndex = label.name.indexOf('version:');
                let columnIndex = label.name.indexOf('column:');

                if(typeIndex > -1) {
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

            issue.index = gitHubIssue.number - 1

            window.resources.issues[issue.index] = issue;
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
            due_on: milestone.endDate,
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
            labels: []
        };

        // Assignee
        let assignee = resources.collaborators[issue.assignee];

        if(assignee) {
            gitHubIssue.assignee = assignee.name;
        }

        // State
        let issueColumn = resources.issueColumns[issue.column];

        gitHubIssue.state = issueColumn == 'done' ? 'closed' : 'open';

        // GitHub counts numbers from 1, ' + repo + ' counts from 0
        if(issue.milestone >= 0) {
            gitHubIssue.milestone = parseInt(issue.milestone) + 1;
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

        return gitHubIssue;
    }

    /**
     * Add issue comment
     *
     * @param {Object} issue
     * @param {String} text
     */
    addIssueComment(issue, text) {
        return new Promise((callback) => {
            this.post('/repos/' + org + '/' + repo + '/issues/' + (issue.index + 1) + '/comments', {
                body: text
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
            this.get('/repos/' + org + '/' + repo + '/issues/' + (issue.index + 1) + '/comments')
            .then((gitHubComments) => {
                let comments = [];

                for(let gitHubComment of gitHubComments) {
                    let comment = {
                        collaborator: ResourceHelper.getCollaborator(gitHubComment.user.login),
                        text: gitHubComment.body
                    };

                    comments.push(comment);
                }

                callback(comments);            
            });
        });
    }
}

module.exports = GitHubApi;
