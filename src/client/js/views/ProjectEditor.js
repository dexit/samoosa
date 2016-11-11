'use strict';

class ProjectEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/ProjectEditor');

        this.fetch();
    }

    onClick() {
        ResourceHelper.clear();

        if(this.overrideUrl) {
            location = '/#/' + this.model.owner + '/' + this.model.title + this.overrideUrl;

        } else if(Router.params.project) {
            location = '/#' + location.hash.replace('#', '').replace(Router.params.project, this.model.title).replace(Router.params.user, this.model.owner);
        
        } else {
            location = '/#/' + this.model.owner + '/' + this.model.title + '/board/kanban/';
        
        }
    }   
}

module.exports = ProjectEditor;
