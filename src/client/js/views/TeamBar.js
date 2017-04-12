'use strict';

class TeamBar extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/TeamBar');

        this.fetch();
    }
    
    /**
     * Event: Click team
     *
     * @param {String} name
     */
    onClickTeam(name) {
        let basePath = '/' + Router.params.user + '/' + Router.params.repository + '/board/' + Router.params.mode + '/';
        
        Router.go(basePath + name, true);  

        this.applyTeam();

        this.render();
    }

    /**
     * Applies selected filters
     */
    applyTeam() {
        let issueViews = ViewHelper.getAll('IssueEditor');
        let team = Router.params.team;

        for(let issueView of issueViews) {
            let isValid = team == 'all' || issueView.model.getTeam() == team;

            issueView.$element.toggle(isValid);
        }
    }
}

module.exports = TeamBar;
