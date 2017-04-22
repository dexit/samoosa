'use strict';

module.exports = function render() {
    let resourceDictionary = {
        assignee: resources.collaborators,
        column: resources.issueColumns,
        milestone: resources.milestones,
        priority: ISSUE_PRIORITIES,
        teams: resources.teams,
        type: ISSUE_TYPES,
        version: resources.versions
    };

    return _.div({class: 'filter-editor'},
        _.button({class: 'btn-toggle', 'data-filter-amount': this.model.length.toString()},
            'Filters', 
            _.span({class: 'filter-indicator'}, this.model.length.toString())
        ).click(() => {
            this.onClickToggle();  
        }),
        _.div({class: 'filters-container'},
            _.div({class: 'filters'},
                _.each(this.model, (i, filter) => {
                    let resourceKey = filter.key;
                    let resource = resourceDictionary[resourceKey];

                    let $valueSelect;
                    let $filter = _.div({class: 'filter'},
                        _.div({class: 'select-container key'},
                            _.select({},
                                _.each(resourceDictionary, (key) => {
                                    return _.option({
                                        value: key,
                                        selected: key == filter.key
                                    }, key)
                                })
                            ).change((e) => {
                                filter.key = $filter.find('.key select').val();
                                filter.value = null;
                                
                                this.onChange(i);
                            })
                        ),
                        _.div({class: 'select-container operator'},
                            _.select({},
                                _.each(this.getOperators(), (operator, label) => {
                                    return _.option({value: operator}, label)
                                })
                            ).val(filter.operator || '!=').change((e) => {
                                filter.operator = $filter.find('.operator select').val();

                                this.onChange(i);
                            })
                        ),
                        _.div({class: 'select-container value', style: 'min-width: ' + (((filter.value || '').length * 10) + 20) + 'px'},
                            _.select({},
                                _.each(resource, (i, value) => {
                                    // We are looping an enum, swap the index and value
                                    if(isNaN(i)) {
                                        let idx = value;

                                        value = i;
                                        i = idx;
                                    }

                                    let valueName = value;

                                    if(value.title) {
                                        valueName = value.title;
                                    }

                                    if(value.name) {
                                        valueName = value.name;
                                    }
                                    
                                    let isSelected = valueName == filter.value;

                                    if(!filter.value && i == 0) {
                                        isSelected = true;
                                    }

                                    return _.option({
                                        value: valueName,
                                        selected: isSelected
                                    }, valueName)
                                })
                            ).change((e) => {
                                filter.value = $filter.find('.value select').val();

                                this.onChange(i);
                            })
                        ),
                        _.button({class: 'btn-remove'},
                            _.span({class: 'fa fa-remove'})
                        ).click(() => { this.onClickRemove(i); })
                    );

                    return $filter;
                })
            ),
            _.div({class: 'button-container'},
                _.if(this.model.length < this.MAX_FILTERS,
                    _.button({class: 'btn btn-add-filter'},
                        'Add filter',
                        _.span({class: 'fa fa-plus'})
                    ).click(() => { this.onClickAdd(); })
                )
            )
        )
    );
}
