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
    static getCollaborators() {
        return new Promise((callback) => {
            call('/repos/Putaitu/mondai/collaborators')
            .then((collaborators) => {
                GitHubApi.processCollaborators(collaborators);

                callback();
            });
        });
    }

    static getIssues() {
        return new Promise((callback) => {
            call('/repos/Putaitu/mondai/issues')//?state=all')
            .then((issues) => {
                GitHubApi.processIssues(issues);

                callback();
            });
        });
    }
    
    static getLabels() {
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

    static getIssueTypes() {
        return new Promise((callback) => {
            GitHubApi.getLabels()
            .then((labels) => {
                GitHubApi.processIssueTypes(labels);

                callback();
            });
        });
    }
    
    static getVersions() {
        return new Promise((callback) => {
            GitHubApi.getLabels()
            .then((labels) => {
                GitHubApi.processVersions(labels);

                callback();
            });
        });
    }

    static getMilestones() {
        return new Promise((callback) => {
            call('/repos/Putaitu/mondai/milestones')
            .then((milestones) => {
                GitHubApi.processMilestones(milestones);
                
                callback();
            });    
        });
    }
    
    static processMilestones(milestones) {
        window.settings.milestones = [];
        
        for(let i in milestones) {
            let milestone = milestones[i];

            milestone.index = i;

            window.settings.milestones.push(milestone);
        }
    }

    static processVersions(labels) {
        window.settings.versions = [];

        for(let label of labels) {
            let versionIndex = label.name.indexOf('version:');
            
            if(versionIndex > -1) {
                let versionName = label.name.replace('version:', '');

                window.settings.versions.push(versionName);
            }
        }
    }

    static processIssueTypes(labels) {
        window.settings.types = [];
        
        for(let label of labels) {
            let typeIndex = label.name.indexOf('type:');
            
            if(typeIndex > -1) {
                let typeName = label.name.replace('type:', '');

                window.settings.types.push(typeName);
            }
        }
    }

    static processCollaborators(collaborators) {
        window.settings.collaborators = [];

        for(let collaborator of collaborators) {
            window.settings.collaborators.push({
                name: collaborator.login,
                avatar: collaborator.avatar_url,
            });
        }
    }

    static processIssues(issues) {
        window.settings.issues = [];
        
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
                let versionIndex = label.name.indexOf('version:');

                if(typeIndex > -1) {
                    let typeName = label.name.replace('type:', '');
                    
                    issue.type = ResourceHelper.getIssueType(typeName);
                }
                
                if(versionIndex > -1) {
                    let typeName = label.name.replace('version:', '');
                    
                    issue.version = ResourceHelper.getVersion(typeName);
                }
            }

            if(gitHubIssue.milestone) {
                issue.milestone = ResourceHelper.getMilestone(gitHubIssue.milestone.title);
            }

            window.settings.issues.push(issue);
        }
    }
}

module.exports = GitHubApi;
