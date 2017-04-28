'use strict';

window.resources = {};

class ResourceHelper {
    static get(name, resource, key) {
        for(let resource of resources[resource]) {
            if((key && resource[key] === name) || (!key && resource === name)) {
                return resource;
            }
        }
    }

    static getConstant(name, constant) {
        if(!constant[name]) { return; }

        return name;
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
