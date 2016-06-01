'use strict';

class ProjectEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/ProjectEditor');

        this.fetch();

        this.$element.find('input[type="checkbox"]')[0].checked = SettingsHelper.get('projects', 'current') == this.model.title;
    }

    onClickCheckbox() {
        $('.project-editor input[type="checkbox"]').each(function() {
            this.checked = false; 
        });

        this.$element.find('input[type="checkbox"]')[0].checked = true;

        SettingsHelper.set('projects', 'current', this.model.title);
    }
}

module.exports = ProjectEditor;
