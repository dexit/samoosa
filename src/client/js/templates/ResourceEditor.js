'use strict';

module.exports = function render() {
    return _.div({class: 'resource-editor'},
        _.div({class: 'body'},
            _.each(this.model, (i, item) => {
                return _.div({class: 'item'},
                    _.label(item.name || item.title || item),
                    _.button(
                        _.span({class: 'fa fa-remove'})
                    ).click(() => { this.onClickRemove(i); })
                );
            })
        ),
        _.div({class: 'footer'},
            _.input({type: 'text'}),
            _.button(
                _.span({class: 'fa fa-plus'})
            ).click(() => {
                this.onClickAdd(this.$element.find('.footer input').val());
            })
        )
    );
};
