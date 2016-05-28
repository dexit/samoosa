'use strict';

class IssueEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/IssueEditor');

        this.fetch();
    }

    onClickEdit() {
        let wasEditing = this.$element.hasClass('editing');

        $('.issue-editor').removeClass('editing');

        this.$element.toggleClass('editing', !wasEditing);
    }

    onChange() {
        
    }

    updateIssue() {

    }
}

module.exports = IssueEditor;
