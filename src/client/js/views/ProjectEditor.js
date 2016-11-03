'use strict';

class ProjectEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/ProjectEditor');

        this.fetch();
    }

    onClick() {
        if(this.overrideUrl) {
            location = '/#/' + ApiHelper.getUserName() + '/' + this.model.title + this.overrideUrl;

        } else if(Router.params.project) {
            location = '/#' + location.hash.replace('#', '').replace(Router.params.project, this.model.title);
        
        } else {
            location = '/#/' + ApiHelper.getUserName() + '/' + this.model.title + '/board/kanban/';
        
        }

        location.reload(true);
    }   
}

module.exports = ProjectEditor;
