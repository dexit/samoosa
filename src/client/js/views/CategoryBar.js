'use strict';

class CategoryBar extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/CategoryBar');

        this.fetch();
    }
    
    /**
     * Event: Click category
     *
     * @param {String} name
     */
    onClickCategory(name) {
        let basePath = '/' + Router.params.user + '/' + Router.params.repository + '/board/' + Router.params.mode + '/';
        
        Router.go(basePath + name, true);  

        this.applyCategory();

        this.render();
    }

    /**
     * Applies selected filters
     */
    applyCategory() {
        let issueViews = ViewHelper.getAll('IssueEditor');
        let category = Router.params.category;

        for(let issueView of issueViews) {
            let isValid = category == 'all' || issueView.model.getCategory() == category;

            issueView.$element.toggle(isValid);
        }
    }
}

module.exports = CategoryBar;
