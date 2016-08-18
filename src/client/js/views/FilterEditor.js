'use strict';

class FilterEditor extends View {
    constructor(params) {
        super(params);

        this.MAX_FILTERS = 5;

        this.template = require('../templates/FilterEditor');

        this.defaultFilter = {
            key: 'column',
            operator: '!=',
            value: 'done'
        };

        this.model = SettingsHelper.get('filters', 'custom', [], true);

        this.fetch();

        setTimeout(() => {
            this.applyFilters();
        }, 2);
    }

    /**
     * Event: Change
     *
     * @param {Number} index
     */
    onChange(index) {
        this.render();

        // Update value, just in case key was changed
        this.model[index].value = this.$element.find('.filter').eq(index).find('.select-container.value select').val();

        // Update settings
        SettingsHelper.set('filters', 'custom', this.model, true);

        this.applyFilters();
    }

    /**
     * Event: Click remove button
     *
     * @param {Number} index
     */
    onClickRemove(index) {
        this.model.splice(index, 1);
        
        // Update settings
        SettingsHelper.set('filters', 'custom', this.model, true);

        this.render();

        this.applyFilters();
    }

    /**
     * Event: Click add button
     */
    onClickAdd() {
        if(this.model.length < this.MAX_FILTERS) {
            this.model.push({
                key: this.defaultFilter.key,
                operator: this.defaultFilter.operator,
                value: this.defaultFilter.value
            });
            
            // Update settings
            SettingsHelper.set('filters', 'custom', this.model, true);

            this.applyFilters();

            this.render();
        }
    }

    /**
     * Gets all filtering operators
     *
     * @param {Array} operators
     */
    getOperators() {
        return [
            '!=',
            '=='
        ];
    }


    /**
     * Applies selected filters
     */
    applyFilters() {
        let issueViews = ViewHelper.getAll('IssueEditor');

        for(let issueView of issueViews) {
            issueView.$element.toggle(true);
           
            let issue = new Issue(issueView.model).getBakedValues();

            for(let filter of this.model) {
                try {
                    let value = filter.value;

                    if(value && value.constructor === String) {
                        value = '\'' + value + '\'';
                    }

                    let evalString = 'issue.' + filter.key + ' ' + filter.operator + ' ' + value;
                    let isValid = eval(evalString);

                    if(!isValid) {
                        issueView.$element.toggle(false);
                        break;
                    }
                } catch(e) {
                    alert(e);
                    return;
                }
            }
        }
    }
}

module.exports = FilterEditor;
