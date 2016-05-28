'use strict';

class Issue {
    constructor(properties) {
        if(properties) {
            this.adopt(properties);
        } else {
            this.create();
        }
    }

    create() {
        this.title = 'New issue';
        this.description = '';
        this.reporter;
        this.column = 0;

        // Labels for types are defined by plugin
        this.type = 0;

        // Labels for properties are defined by plugin
        this.priority = 3;
        
        // Optional params
        this.version;
        this.milestone;
        this.comments = [];
        this.labels = [];
        this.assignee;
    }

    adopt(properties) {
        for(let k in properties) {
            this[k] = properties[k];
        }
    }
}

module.exports = Issue;
