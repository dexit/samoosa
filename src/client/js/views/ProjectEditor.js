'use strict';

class ProjectEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/ProjectEditor');

        this.fetch();
    }

    onClick() {
        location.hash = '/' + this.model.title + (SettingsHelper.get('views', 'default') || '/board/');
    }   
}

module.exports = ProjectEditor;
