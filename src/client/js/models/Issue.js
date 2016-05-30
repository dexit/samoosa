'use strict';

class Issue {
    static create(properties) {
        return new Promise((callback) => {
            let issue = new Issue();

            issue.index = window.resources.issues.length;
            window.resources.issues[issue.index] = issue;

            if(properties) {
                for(let k in properties) {
                    issue[k] = properties[k];
                }
            }

            ResourceHelper.addResource('issue', issue)
            .then(() => {
                callback(issue);
            });
        });
    }

    constructor(properties) {
        if(properties) {
            this.adopt(properties);
        } else {
            this.useStandard();
        }
    }

    useStandard() {
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
