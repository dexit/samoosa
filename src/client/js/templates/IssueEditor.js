let Issue = require('../models/Issue');

module.exports = function render(view) {
    let issue = new Issue(view.model);

    return _.div({class: 'issue-editor'},
        _.div({class: 'header'},
            _.button({class: 'btn-transparent'},
                _.span({class: 'fa fa-edit'}),
                _.span({class: 'fa fa-close'}),
                _.h4({'data-property': 'title'},
                    view.model.title
                )
            ).click(() => { view.onClickEdit(); })
        ),
        _.div({class: 'meta'},
            _.div({class: 'meta-field type'},
                _.label('Type'),
                _.select({'data-property': 'type'},
                    _.each(window.resources.issueTypes, (i, type) => {
                        return _.option({value: i}, type);
                    })
                ).change(() => { view.onChange(); }).val(issue.type)
            ),
            _.div({class: 'meta-field priority'},
                _.label('Priority'),
                _.select({'data-property': 'priority'},
                    _.each(window.resources.issuePriorities, (i, priority) => {
                        return _.option({value: i}, priority);
                    })
                ).change(() => { view.onChange(); }).val(issue.priority)
            ),
            _.div({class: 'meta-field assignee'},
                _.label('Assignee'),
                _.select({'data-property': 'assignee'},
                    _.each(window.resources.collaborators, (i, collaborator) => {
                        return _.option({value: i}, collaborator.name);
                    })
                ).change(() => { view.onChange(); }).val(issue.assignee)
            ),
            _.div({class: 'meta-field version'},
                _.label('Version'),
                _.select({'data-property': 'version'},
                    _.each(window.resources.versions, (i, version) => {
                        return _.option({value: i}, version);
                    })
                ).change(() => { view.onChange(); }).val(issue.version)
            )
        ),
        _.div({class: 'body'},
            markdownToHtml(view.model.description)
        )
    );
};
