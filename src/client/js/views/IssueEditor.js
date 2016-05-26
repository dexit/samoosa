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

    onChangePriority() {

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
                _.div({class: 'priority'},
                    _.select(
                        _.each(window.settings.priorities, (key, value) => {
                            return _.option({value: value}, key);
                        })
                    ).change(() => { this.onChange(); }).val(issue.priority)
                )
            ),
            _.div({class: 'body'},
                this.model.description
            ),
            _.div({class: 'operations'},
                // Operations and such
                ''
            )
        );
    }
}

module.exports = IssueEditor;
