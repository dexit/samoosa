'use strict';

window.resources = {};

class ResourceHelper {
    static getCollaborator(name) {
        for(let i in resources.collaborators) {
            let collaborator = resources.collaborators[i];
            
            if(collaborator.name == name) {
                return i;
            }
        }
    }
    
    static getIssuePriority(name) {
        for(let i in resources.issuePriorities) {
            let type = resources.issuePriorities[i];
            
            if(type == name) {
                return i;
            }
        }
    }
    
    static getIssueEstimate(name) {
        for(let i in resources.issueEstimates) {
            let estimate = resources.issueEstimates[i];

            if(estimate == name) {
                return i;
            }
        }
    }
    
    static getIssueColumn(name) {
        for(let i in resources.issueColumns) {
            let type = resources.issueColumns[i];
            
            if(type == name) {
                return i;
            }
        }

        return 0;
    }
    
    static getIssueAttachment(name) {
        for(let i in resources.issueAttachments) {
            let type = resources.issueAttachments[i];
            
            if(type == name) {
                return i;
            }
        }

        return 0;
    }
    
    static getIssueType(name) {
        for(let i in resources.issueTypes) {
            let type = resources.issueTypes[i];
            
            if(type == name) {
                return i;
            }
        }
    }
    
    static getIssueCategory(name) {
        for(let i in resources.issueCategories) {
            let category = resources.issueCategories[i];
            
            if(category == name) {
                return i;
            }
        }
    }
    
    static getVersion(name) {
        for(let i in resources.versions) {
            let version = resources.versions[i];
            
            if(version == name) {
                return i;
            }
        }
    }
    
    static getMilestone(name) {
        for(let i in resources.milestones) {
            let milestone = resources.milestones[i];
            
            if(milestone.title == name) {
                return i;
            }
        }
    }

    /**
     * Updates the indices of every resource item
     *
     * @param {String} resource
     */
    static updateResourceIndices(resource) {
       for(let i in resources[resource]) {
            let r = resources[resource][i];

            if(typeof r === 'object') {
                r.index = i;
            }
       }
    }

    static sortResource(resource) {
        switch(resource) {
            case 'issueEstimates':
                resources.issueEstimates.sort((a, b) => {
                    a = estimateToFloat(a);
                    b = estimateToFloat(b);

                    if(a < b) {
                        return -1;
                    }
                    
                    if(a > b) {
                        return 1;
                    }

                    return 0;
                });
                break;

            case 'milestones':
                resources.milestones.sort((a, b) => {
                    a = a.getEndDate() || 0;
                    b = b.getEndDate() || 0;

                    if(a < b) {
                        return -1;
                    }
                    
                    if(a > b) {
                        return 1;
                    }

                    return 0;
                });
                break;
        }   

        this.updateResourceIndices(resource);
    }

    static clear() {
        resources = {};

        ApiHelper.clear();
    }

    static reloadResource(resource) {
        resources[resource] = [];

        return ApiHelper.getResource(resource);
    }

    static updateResource(resource, item, index, identifier) {
        spinner('Updating ' + resource);

        return ApiHelper.updateResource(resource, item, identifier)
        .then(() => {
            index = index || item.index;

            resources[resource][index] = item;

            spinner(false);
            
            ResourceHelper.sortResource(resource);

            return Promise.resolve();
        });
    }

    static removeResource(resource, index) {
        spinner('Updating ' + resource);

        return ApiHelper.removeResource(resource, index)
        .then(() => {
            resources[resource].splice(index, 1);
            
            spinner(false);
            
            ResourceHelper.sortResource(resource);

            return Promise.resolve();
        });
    }

    static addResource(resource, item) {
        spinner('Updating ' + resource);

        return ApiHelper.addResource(resource, item)
        .then((newItem) => {
            item = newItem || item;

            let index = resources[resource].length;

            if(typeof item === 'object' && !item.index) {
                item.index = index;
            }

            resources[resource][index] = item;

            spinner(false);

            ResourceHelper.sortResource(resource);

            return Promise.resolve(item);
        });
    }
}

module.exports = ResourceHelper;
