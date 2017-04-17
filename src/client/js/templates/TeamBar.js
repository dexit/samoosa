'use strict';

module.exports = function render() {
    let activeTab = Router.params.team || 'all';
    let basePath = '/' + Router.params.user + '/' + Router.params.repository + '/board/' + Router.params.mode + '/';

    if(resources.teams.length < 1) { return; }

    return _.div({class: 'team-bar tabbed-container vertical'},
        _.div({class: 'tabs'},
            _.a({href: '#' + basePath + 'all', class: 'tab' + (activeTab == 'all' ? ' active' : '')}, 'all teams')
            .click((e) => {
                e.preventDefault();
                this.onClickTeam('all');
            }),
            _.each(resources.teams || [], (i, team) => {
                return _.a({href: '#' + basePath + team, class: 'tab' + (activeTab == team ? ' active' : '')}, team)
                .click((e) => {
                    e.preventDefault();
                    this.onClickTeam(team);
                });
            })
        )
    ); 
};
