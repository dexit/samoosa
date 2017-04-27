'use strict';

module.exports = function render() {
    let activeTab = Router.params.tag || 'all';
    let basePath = '/' + Router.params.user + '/' + Router.params.repository + '/board/' + Router.params.mode + '/';

    return _.div({class: 'tag-bar tabbed-container vertical'},
        _.if(resources.tags.length > 0,
            _.div({class: 'tabs'},
                _.a({href: '#' + basePath + 'all', class: 'tab' + (activeTab == 'all' ? ' active' : '')}, 'all tags')
                .click((e) => {
                    e.preventDefault();
                    this.onClickTag('all');
                }),
                _.each(resources.tags || [], (i, tag) => {
                    return _.a({href: '#' + basePath + tag, class: 'tab' + (activeTab == tag ? ' active' : '')}, tag)
                    .click((e) => {
                        e.preventDefault();
                        this.onClickTag(tag);
                    });
                })
            )
        )
    ); 
};
