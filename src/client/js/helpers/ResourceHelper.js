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
            let type = window.resources.issueEstimates[i];
            
            if(type == name) {
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

    static updateResource(resource, item) {
        return new Promise((callback) => {
            ApiHelper.updateResource(resource, item)
            .then(() => {
                if(item.index) {
                    item.index = parseInt(item.index);

                    resources[resource][item.index] = item;
                } else {
                    throw 'Item "' + (item.title || item.name) + '" for resource "' + resource + '" has no index!';

                }
                
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
            .then(() => {
                item.index = resources[resource].length;

                resources[resource][item.index] = item;

                callback();
            });
        });
    }
}

module.exports = ResourceHelper;
