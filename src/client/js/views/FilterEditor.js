'use strict';

class FilterEditor extends View {
    constructor(params) {
        super(params);

        this.MAX_FILTERS = 5;

        this.template = require('../templates/FilterEditor');

        this.defaultFilter = {
            key: 'column',
            query: '!= \'done\''
        };

        this.model = SettingsHelper.get('filters', 'custom', [ { key: this.defaultFilter.key, query: this.defaultFilter.query } ], true);

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
        let $filter = this.$element.find('.filter').eq(index);

        this.model[index].key = $filter.find('select').val();
        this.model[index].query = $filter.find('input').val();

        SettingsHelper.set('filters', 'custom', this.model, true);

        this.render();

        this.applyFilters();
    }

    /**
     * Event: Click remove button
     *
     * @param {Number} index
     */
    onClickRemove(index) {
        this.model.splice(index, 1);
        
        SettingsHelper.set('filters', 'custom', this.model, true);

        this.applyFilters();

        this.render();
    }

    /**
     * Event: Click add button
     */
    onClickAdd() {
        if(this.model.length < this.MAX_FILTERS) {
            this.model.push({
                key: this.defaultFilter.key,
                query: this.defaultFilter.query
            });
            
            SettingsHelper.set('filters', 'custom', this.model, true);

            this.applyFilters();

            this.render();
        }
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
                    let evalString = 'issue.' + filter.key + ' ' + filter.query;
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
