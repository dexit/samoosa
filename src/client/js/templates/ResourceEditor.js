'use strict';

module.exports = function render() {
    // Set regex for individual cases
    let regex;

    return _.div({class: 'resource-editor'},
        _.div({class: 'body'},
            _.each(this.model, (i, item) => {
                // Do not handle issue columns "to do" and "done"
                if(this.name == 'columns' && (item == 'to do' || item == 'done')) { return; }

                return _.div({class: 'item'},
                    _.if(typeof item === 'string',
                        _.input({pattern: regex, class: 'selectable', value: item, placeholder: 'Input name', type: 'text'})
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
            _.input({type: 'text', pattern: regex}),
            _.button({class: 'btn btn-add'},
                'Add',
                _.span({class: 'fa fa-plus'})
            ).click(() => {
                let $input = this.$element.find('.footer input');

                this.onClickAdd($input.val(), regex);
            })
        )
    );
};
