'use strict';

class Issue extends View {
    constructor(params) {
        super(params);
    }

    render() {
        this.$element = _.div({class: 'issue'},
            _.div({class: 'header'},
                _.h4({class: 'title'}, this.model.title)
            ),
            _.div({class: 'body'},
                this.model.description
            ),
            _.div({class: 'footer'},
                // Operations and such
            )
        );
    }
}
