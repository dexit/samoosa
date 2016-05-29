'use strict';

class MilestoneEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/MilestoneEditor');

        this.fetch();
    }

    onClickNewIssue() {
        Issue.create({ milestone: this.model.index })
        .then((issue) => {
            let $issue = new IssueEditor({
                model: issue
            }).$element; 

            $('.milestone-editor[data-index="' + issue.milestone + '"] .column[data-index="' + issue.column + '"]').append($issue);
        });
    }

    onClickToggle() {
        this.$element.toggleClass('collapsed');
    }
}

module.exports = MilestoneEditor;
