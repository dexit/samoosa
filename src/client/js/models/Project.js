'use strict';

class Project {
    constructor(properties) {
        properties = properties || {};
        
        // Essential properties
        this.title = properties.title;
        this.description = properties.description || '';
        this.id = properties.id;
        this.owner = properties.owner;
    }

    /**
     * Finds a project by title
     *
     * @param {String} title
     *
     * @returns {Project} Project found
     */
    static find(title) {
        for(let project of resources.projects || []) {
            if(!project) { continue; }

            if(project.title == title) {
                return project;
            }
        }

        debug.warning('Project "' + title + '" not found', this);

        return null;
    }

    /**
     * Gets the current project
     *
     * @returns {Project} Current project
     */
    static getCurrent() {
        if(!Router.params) { return null; }

        return Project.find(Router.params.project);
    }
}

module.exports = Project;
