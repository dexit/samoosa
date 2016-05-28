'use strict';

let ApiHelper = require('../../../src/client/js/helpers/ApiHelper');

function call(url) {
    return new Promise((callback) => {
        $.ajax({
            url: 'https://api.github.com' + url + '?access_token=' + localStorage.getItem('githubApiToken'),
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
            call('/repos/Putaitu/mondai/collaborators')
            .then((collaborators) => {
                this.processCollaborators(collaborators);

                callback();
            });
        });
    }

    getIssues() {
        return new Promise((callback) => {
            call('/repos/Putaitu/mondai/issues')//?state=all')
            .then((issues) => {
                this.processIssues(issues);

                callback();
            });
        });
    }
    
    getLabels() {
        return new Promise((callback) => {
            if(!labelCache) {
                call('/repos/Putaitu/mondai/labels')
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
            call('/repos/Putaitu/mondai/milestones')
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
                }
                
                if(versionIndex > -1) {
                    let name = label.name.replace('version:', '');
                    
                    issue.version = ResourceHelper.getVersion(name);
                }
                
                if(priorityIndex > -1) {
                    let name = label.name.replace('priority:', '');
                    
                    issue.priority = ResourceHelper.getIssuePriority(name);
                }
                
                if(columnIndex > -1) {
                    let name = label.name.replace('column:', '');
                    
                    issue.column = ResourceHelper.getIssueColumn(name);
                }
            }

            if(gitHubIssue.milestone) {
                issue.milestone = ResourceHelper.getMilestone(gitHubIssue.milestone.title);
            }

            window.resources.issues[gitHubIssue.number] = issue;
        }
    }

    updateIssue(issue) {
        return new Promise((callback) => {
            // TODO: Match GitHub format and POST

            callback();
        });
    }

    getIssueComments(issue) {
        
    }
}

module.exports = GitHubApi;
