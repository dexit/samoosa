'use strict';

let Issue = require('../models/Issue');

class IssueEditor extends View {
    constructor(params) {
        super(params);

        this.fetch();
    }

    render() {
        let issue = new Issue(this.model);

        this.$element = _.div({class: 'issue'},
            _.div({class: 'header'},
                _.h4({class: 'title'}, this.model.title)
            ),
            _.div({class: 'body'},
                this.model.description
            ),
            _.div({class: 'footer'},
                // Operations and such
                ''
            )
        );
    }
}

module.exports = IssueEditor;
