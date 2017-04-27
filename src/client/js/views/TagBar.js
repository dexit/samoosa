'use strict';

class TagBar extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/TagBar');

        this.fetch();
    }
    
    /**
     * Event: Click tag
     *
     * @param {String} name
     */
    onClickTag(name) {
        let basePath = '/' + Router.params.user + '/' + Router.params.repository + '/board/' + Router.params.mode + '/';
        
        Router.go(basePath + name, true);  

        this.applyTag();

        this.render();
    }

    /**
     * Applies selected filters
     */
    applyTag() {
        let issueViews = ViewHelper.getAll('IssueEditor');
        let tag = Router.params.tag;

        for(let issueView of issueViews) {
            let isValid = tag == 'all' || issueView.model.tags.indexOf(tag) > -1;

            issueView.$element.toggle(isValid);
        }
    }

    /**
     * Reload
     */
    static reload() {
        return ApiHelper.getTags()
        .then(() => {
            let view = ViewHelper.get('TagBar');

            if(view) {
                view.render();
            } else {
                view = new TagBar();
            }

            if(!view.$element.parent().hasClass('workspace-panel')) {
                _.find('.workspace-panel').append(
                    view.$element
                );
            }
        });
    }
}

module.exports = TagBar;
