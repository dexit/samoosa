'use strict';

class RepositoryEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/RepositoryEditor');

        this.fetch();
    }

    onClick() {
        ResourceHelper.clear();

        ViewHelper.get('Navbar').slideIn();
        spinner(this.model.title);

        if(this.overrideUrl) {
            location = '/#/' + this.model.owner + '/' + this.model.title + this.overrideUrl;

        } else if(Router.params.repository) {
            location = '/#' + location.hash.replace('#', '').replace(Router.params.repository, this.model.title).replace(Router.params.user, this.model.owner);
        
        } else {
            location = '/#/' + this.model.owner + '/' + this.model.title + '/board/kanban/';
        
        }
    }   
}

module.exports = RepositoryEditor;
