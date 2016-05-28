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

    getResources() {
        return new Promise((callback) => {
            let loaded = {
                collaborators: false,
                issueTypes: false,
                issuePriorities: false,
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

            this.getCollaborators()
            .then(() => {
                check('collaborators');
            });

            this.getIssueTypes()
            .then(() => {
                check('issueTypes');
            });
            
            this.getIssuePriorities()
            .then(() => {
                check('issuePriorities');
            });
            
            this.getIssueColumns()
            .then(() => {
                check('issueColumns');
            });
            
            this.getMilestones()
            .then(() => {
                check('milestones');
            });
            
            this.getVersions()
            .then(() => {
                check('versions');
            });
            
            this.getIssues()
            .then(() => {
                check('issues');
            });
        });
    }
}

module.exports = ApiHelper;
