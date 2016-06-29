'use strict';

module.exports = function render() {
    let issueKeys = Object.keys(new Issue());

    return _.div({class: 'filter-editor'},
        _.div({class: 'title'},
            'Filters'
        ),
        _.div({class: 'filters'},
            _.each(this.model, (i, filter) => {
                return _.div({class: 'filter'},
                    _.div({class: 'select-container'},
                        _.select({},
                            _.each(issueKeys, (i, key) => {
                                return _.option({value: key}, key)
                            })
                        ).val(filter.key).change(() => { this.onChange(i); })
                    ),
                    _.input({type: 'text', value: filter.query})
                        .change(() => { this.onChange(i); }),
                    _.button({class: 'btn-remove btn-transparent'},
                        _.span({class: 'fa fa-remove'})
                    ).click(() => { this.onClickRemove(i); })
                );
            })
        ),
        _.div({class: 'button-container'},
            _.if(this.model.length < this.MAX_FILTERS,
                _.button({class: 'btn-transparent'},
                    _.span({class: 'fa fa-plus'})
                ).click(() => { this.onClickAdd(); })
            )
        )
    );
}
