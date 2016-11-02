'use strict';

class ProjectEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/ProjectEditor');

        this.fetch();
    }

    onClick() {
        if(this.overrideUrl) {
            location.hash = '/' + ApiHelper.getUserName() + '/' + this.model.title + this.overrideUrl;

        } else if(Router.params.project) {
            location.hash = location.hash.replace('#', '').replace(Router.params.project, this.model.title);
        
        } else {
            location.hash = '/' + ApiHelper.getUserName() + '/' + this.model.title + '/board/kanban/';
        
        }
    }   
}

module.exports = ProjectEditor;
