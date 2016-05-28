'use strict';

let ApiHelper = require('../../../src/client/js/helpers/ApiHelper');

function get(url, param) {
    return new Promise((callback) => {
        $.ajax({
            url: 'https://api.github.com' + url + '?' + (param ? param + '&' : '') + 'access_token=' + localStorage.getItem('githubApiToken'),
            type: 'GET',
            success: (result) => {
                callback(result);
            }
        });
    });
}

function patch(url, data) {
    if(typeof data === 'object') {
        data = JSON.stringify(data);
    }

    return new Promise((callback) => {
        $.ajax({
            url: 'https://api.github.com' + url + '?access_token=' + localStorage.getItem('githubApiToken'),
            type: 'PATCH',
            data: data,
            success: (result) => {
                callback(result);
            }
        });
    });
}

function post(url, data) {
    if(typeof data === 'object') {
        data = JSON.stringify(data);
    }

    return new Promise((callback) => {
        $.ajax({
            url: 'https://api.github.com' + url + '?access_token=' + localStorage.getItem('githubApiToken'),
            type: 'POST',
            data: data,
            success: (result) => {
                callback(result);
            }
        });
    });
}

let labelCache;

class GitHubApi extends ApiHelper {
    getCollaborators() {
        return new Promise((callback) => {
            get('/repos/Putaitu/mondai/collaborators')
            .then((collaborators) => {
                this.processCollaborators(collaborators);

                callback();
            });
        });
    }

    getIssues() {
        return new Promise((callback) => {
            get('/repos/Putaitu/mondai/issues', 'state=all')
            .then((issues) => {
                this.processIssues(issues);

                callback();
            });
        });
    }
    
    getLabels() {
        return new Promise((callback) => {
            if(!labelCache) {
                get('/repos/Putaitu/mondai/labels')
                .then((labels) => {
                    labelCache = labels;

                    callback(labelCache);
                });    

            } else {
                callback(labelCache);
            
            }
        });
    }

    getIssueTypes() {
        return new Promise((callback) => {
            this.getLabels()
            .then((labels) => {
                this.processIssueTypes(labels);

                callback();
            });
        });
    }
    
    getIssueColumns() {
        return new Promise((callback) => {
            this.getLabels()
            .then((labels) => {
                this.processIssueColumns(labels);

                callback();
            });
        });
    }
    
    getIssuePriorities() {
        return new Promise((callback) => {
            this.getLabels()
            .then((labels) => {
                this.processIssuePriorities(labels);

                callback();
            });
        });
    }
    
    getVersions() {
        return new Promise((callback) => {
            this.getLabels()
            .then((labels) => {
                this.processVersions(labels);

                callback();
            });
        });
    }

    getMilestones() {
        return new Promise((callback) => {
            get('/repos/Putaitu/mondai/milestones')
            .then((milestones) => {
                this.processMilestones(milestones);
                
                callback();
            });    
        });

        console.log('asdasd');
    }
    
    processMilestones(milestones) {
        window.resources.milestones = [];
        
        for(let i in milestones) {
            let milestone = milestones[i];

            milestone.index = i;

            window.resources.milestones.push(milestone);
        }
    }

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

    processCollaborators(collaborators) {
        window.resources.collaborators = [];

        for(let collaborator of collaborators) {
            window.resources.collaborators.push({
                name: collaborator.login,
                avatar: collaborator.avatar_url,
            });
        }
    }

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
                let versionIndex = label.name.indexOf('version:');
                let columnIndex = label.name.indexOf('column:');

                if(typeIndex > -1) {
                    let name = label.name.replace('type:', '');
                    
                    issue.type = ResourceHelper.getIssueType(name);

                } else if(versionIndex > -1) {
                    let name = label.name.replace('version:', '');
                    
                    issue.version = ResourceHelper.getVersion(name);
                    
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

    updateIssue(issue) {
        return new Promise((callback) => {
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

            // GitHub counts numbers from 1, Mondai counts from 0
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
            
            // Priority
            let issuePriority = resources.issuePriorities[issue.priority];

            if(issuePriority) {
                gitHubIssue.labels.push('priority:' + issuePriority);
            }

            // Column
            if(issueColumn && issueColumn != 'to do' && issueColumn != 'done') {
                gitHubIssue.labels.push('column:' + issueColumn);
            }

            // PATCH data to api
            patch('/repos/Putaitu/mondai/issues/' + (issue.index + 1), gitHubIssue)
            .then(() => {
                callback();
            });
        });
    }

    addIssueComment(issue, text) {
        return new Promise((callback) => {
            post('/repos/Putaitu/mondai/issues/' + (issue.index + 1) + '/comments', {
                body: text
            })
            .then(() => {
                callback(); 
            });
        });
    }

    getIssueComments(issue) {
        return new Promise((callback) => {
            get('/repos/Putaitu/mondai/issues/' + (issue.index + 1) + '/comments')
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
