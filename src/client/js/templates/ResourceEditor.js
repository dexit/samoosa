'use strict';

module.exports = function render() {
    return _.div({class: 'resource-editor'},
        _.div({class: 'body'},
            _.each(this.model, (i, item) => {
                // Special cases
                if(this.name == 'issueColumns' && (item == 'to do' || item == 'done')) {
                    return;
                }

                return _.div({class: 'item'},
                    _.if(typeof item === 'string',
                        _.input({class: 'selectable', value: item, placeholder: 'Input name', type: 'text'})
                            .change(() => { this.onChange(i, item); })
                    ),
                    _.if(typeof item !== 'string',
                        _.label(item.title || item.name)
                    ),
                    _.button({class: 'btn-remove'},
                        _.span({class: 'fa fa-remove'})
                    ).click(() => { this.onClickRemove(i); })
                );
            })
        ),
        _.div({class: 'footer'},
            _.input({type: 'text'}),
            _.button({class: 'btn btn-add'},
                'Add',
                _.span({class: 'fa fa-plus'})
            ).click(() => {
                this.onClickAdd(this.$element.find('.footer input').val());
            })
        )
    );
};
