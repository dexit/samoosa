'use strict';

module.exports = function render() {
    let issueKeys = Object.keys(new Issue().getBakedValues());

    return _.div({class: 'filter-editor'},
        _.h4({class: 'title'},
            'Filters'
        ),
        _.div({class: 'filters'},
            _.each(this.model, (i, filter) => {
                let resourceKey = filter.key;
              
                // Change assignee to collaborator
                if(resourceKey == 'assignee') {
                    resourceKey = 'collaborator';
                }

                // Append 's' for plural
                resourceKey += 's';
                
                // Correct grammar
                resourceKey = resourceKey.replace('ys', 'ies');

                let resource = resources[resourceKey];

                // If we didn't find the resource, it's likely that we just need to capitalise it and prepend 'issue'
                // For example: 'type' should be 'issueType' when referring to the resource
                if(!resource) {
                    resourceKey = 'issue' + resourceKey.substring(0, 1).toUpperCase() + resourceKey.substring(1);

                    resource = resources[resourceKey];
                }

                let $valueSelect;
                let $filter = _.div({class: 'filter'},
                    _.div({class: 'select-container key'},
                        _.select({},
                            _.each(issueKeys, (i, key) => {
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
    );
}
