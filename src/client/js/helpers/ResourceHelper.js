'use strict';

window.resources = {};

class ResourceHelper {
    static getCollaborator(name) {
        for(let i in window.resources.collaborators) {
            let collaborator = window.resources.collaborators[i];
            
            if(collaborator.name == name) {
                return i;
            }
        }
    }
    
    static getIssuePriority(name) {
        for(let i in window.resources.issuePriorities) {
            let type = window.resources.issuePriorities[i];
            
            if(type == name) {
                return i;
            }
        }
    }
    
    static getIssueEstimate(name) {
        for(let i in window.resources.issueEstimates) {
            let estimate = window.resources.issueEstimates[i];

            if(estimate == name) {
                return i;
            }
        }
    }
    
    static getIssueColumn(name) {
        for(let i in window.resources.issueColumns) {
            let type = window.resources.issueColumns[i];
            
            if(type == name) {
                return i;
            }
        }

        return 0;
    }
    
    static getIssueType(name) {
        for(let i in window.resources.issueTypes) {
            let type = window.resources.issueTypes[i];
            
            if(type == name) {
                return i;
            }
        }
    }
    
    static getVersion(name) {
        for(let i in window.resources.versions) {
            let version = window.resources.versions[i];
            
            if(version == name) {
                return i;
            }
        }
    }
    
    static getMilestone(name) {
        for(let i in window.resources.milestones) {
            let milestone = window.resources.milestones[i];
            
            if(milestone.title == name) {
                return i;
            }
        }
    }

    static reloadResource(resource) {
        return new Promise((callback) => {
            window.resources[resource] = [];

            ApiHelper.getResource(resource)
            .then(() => {
                callback();
            });
        });
    }

    static updateResource(resource, item, index, identifier) {
        return new Promise((callback) => {
            ApiHelper.updateResource(resource, item, identifier)
            .then(() => {
                if(!index) {
                    index = item.index || resources[resource].indexOf(item);
                }

                resources[resource][index] = item;
               
                callback();
            });
        });
    }

    static removeResource(resource, index) {
        return new Promise((callback) => {
            ApiHelper.removeResource(resource, index)
            .then(() => {
                resources[resource].splice(index, 1);
                
                callback();
            });
        });
    }

    static addResource(resource, item) {
        return new Promise((callback) => {
            ApiHelper.addResource(resource, item)
            .then((newItem) => {
                item = newItem || item;

                let index = resources[resource].length;

                if(typeof item === 'object') {
                    item.index = index;            
                }

                resources[resource][index] = item;

                callback();
            });
        });
    }
}

module.exports = ResourceHelper;
