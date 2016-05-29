'use strict';

class ApiHelper {
    getIssues() {
        return new Promise((callback) => {
            window.resources.issues = [];
            
            callback();
        });
    }
    
    getCollaborators() {
        return new Promise((callback) => {
            window.resources.collaborators = [];
            
            callback();
        });
    }
    
    getIssueTypes() {
        return new Promise((callback) => {
            window.resources.issueTypes = [];
            
            callback();
        });
    }
    
    getIssuePriorities() {
        return new Promise((callback) => {
            window.resources.issuePriorities = [];
            
            callback();
        });
    }
    
    getIssueEstimates() {
        return new Promise((callback) => {
            window.resources.issueEstimates = [];
            
            callback();
        });
    }
    
    getIssueColumns() {
        return new Promise((callback) => {
            window.resources.issueColumns = [];
            
            callback();
        });
    }
    
    getMilestones() {
        return new Promise((callback) => {
            window.resources.milestones = [];

            callback();
        });
    }
    
    getVersions() {
        return new Promise((callback) => {
            window.resources.versions = [];

            callback();
        });
    }
    
    createIssue(issue) {
        return new Promise((callback) => {
            callback();
        });
    }
    
    getUser() {
        return new Promise((callback) => {
            callback();
        });
    }

    logOut() {
        location.reload();
    }
    
    getIssueComments() {
        return new Promise((callback) => {
            callback([]);
        });
    }
    
    addIssueComment() {
        return new Promise((callback) => {
            callback([]);
        });
    }

    getResource(resource) {
        switch(resource) {
            case 'collaborators':
                return this.getCollaborators();

            case 'issueTypes':
                return this.getIssueTypes();

            case 'issuePriorities':
                return this.getIssuePriorities();

            case 'issueEstimates':
                return this.getIssueEstimates();

            case 'issueColumns':
                return this.getIssueColumns();

            case 'milestones':
                return this.getMilestones();

            case 'versions':
                return this.getVersions();

            case 'issues':
                return this.getIssues();
        }
    }

    getResources() {
        let helper = this;

        return new Promise((callback) => {
            let loaded = {
                collaborators: false,
                issueTypes: false,
                issuePriorities: false,
                issueEstimates: false,
                issueColumns: false,
                milestones: false,
                versions: false,
                issues: false
            };
            
            function check(resource) {
                loaded[resource] = true;
           
                for(let resource in loaded) {
                    if(!loaded[resource]) {
                        return;
                    }
                }

                callback();
            }

            function get(resource) {
                helper.getResource(resource)
                .then(() => {
                    check(resource);
                });
            }

            get('collaborators');
            get('issueTypes');
            get('issuePriorities');
            get('issueEstimates');
            get('issueColumns');
            get('milestones');
            get('versions');
            get('issues');
        });
    }
}

module.exports = ApiHelper;
