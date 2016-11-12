'use strict';

class Repository {
    constructor(properties) {
        properties = properties || {};
        
        // Essential properties
        this.title = properties.title;
        this.description = properties.description || '';
        this.id = properties.id;
        this.owner = properties.owner;
    }

    /**
     * Finds a repository by title
     *
     * @param {String} title
     *
     * @returns {Repository} Repository found
     */
    static find(title) {
        for(let repository of resources.repositories || []) {
            if(!repository) { continue; }

            if(repository.title == title) {
                return repository;
            }
        }

        debug.warning('Repository "' + title + '" not found', this);

        return null;
    }

    /**
     * Gets the current repository
     *
     * @returns {Repository} Current repository
     */
    static getCurrent() {
        if(!Router.params) { return null; }

        return Repository.find(Router.params.repository);
    }
}

module.exports = Repository;
