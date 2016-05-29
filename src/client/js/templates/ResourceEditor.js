'use strict';

module.exports = function render() {
    return _.div({class: 'resource-editor'},
        _.div({class: 'header'},
            _.h4(this.prettyName)
        ),
        _.div({class: 'body'},
            _.each(this.model, (i, item) => {
                return _.div({class: 'item'},
                    _.label(item.name || item.title || item),
                    _.button(
                        _.span({class: 'fa fa-remove'})
                    )
                );
            })
        ),
        _.div({class: 'footer'},
            _.input({type: 'text'}),
            _.button(
                _.span({class: 'fa fa-plus'})
            )
        )
    );
};
