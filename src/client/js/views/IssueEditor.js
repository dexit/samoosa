'use strict';

let Issue = require('../models/Issue');

class IssueEditor extends View {
    constructor(params) {
        super(params);

        this.fetch();
    }

    onClickEdit() {
        this.$element.toggleClass('editing');
    }

    onChange() {

    }

    updateIssue() {

    }

    render() {
        let issue = new Issue(this.model);

        this.$element = _.div({class: 'issue-editor'},
            _.div({class: 'header'},
                _.button({class: 'btn-transparent'},
                    _.span({class: 'fa fa-edit'}),
                    _.span({class: 'fa fa-close'}),
                    _.h4(this.model.title)
                ).click(() => { this.onClickEdit(); })
            ),
            _.div({class: 'meta'},
                _.div({class: 'meta-field type'},
                    _.label('Type'),
                    _.select(
                        _.each(window.settings.types, (i, type) => {
                            return _.option({value: i}, type);
                        })
                    ).change(() => { this.onChange(); }).val(issue.type)
                ),
                _.div({class: 'meta-field priority'},
                    _.label('Priority'),
                    _.select(
                        _.each(window.settings.priorities, (i, priority) => {
                            return _.option({value: i}, priority);
                        })
                    ).change(() => { this.onChange(); }).val(issue.priority)
                ),
                _.div({class: 'meta-field assignee'},
                    _.label('Assignee'),
                    _.select(
                        _.each(window.settings.contributors, (i, contributor) => {
                            return _.option({value: i}, contributor.name);
                        })
                    ).change(() => { this.onChange(); }).val(issue.assignee)
                ),
                _.div({class: 'meta-field version'},
                    _.label('Version'),
                    _.select(
                        _.each(window.settings.versions, (i, version) => {
                            return _.option({value: i}, version);
                        })
                    ).change(() => { this.onChange(); }).val(issue.version)
                )
            ),
            _.div({class: 'body'},
                this.model.description
            ),
            _.div({class: 'comments'},
                _.each(this.model.comments, (i, comment) => {
                    let contributor = window.settings.contributors[comment.contributor];
                    let text = comment.text;
                    
                    return _.div({class: 'comment'},
                        _.div({class: 'contributor'},
                            contributor.name    
                        ),
                        _.div({class: 'text'},
                            text
                        )
                    );
                })
            )
        );
    }
}

module.exports = IssueEditor;
