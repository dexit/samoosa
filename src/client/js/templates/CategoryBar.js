'use strict';

module.exports = function render() {
    let activeTab = Router.params.category || 'all';
    let basePath = '/' + Router.params.user + '/' + Router.params.repository + '/board/' + Router.params.mode + '/';

    return _.div({class: 'category-bar tabbed-container'},
        _.div({class: 'tabs'},
            _.a({href: '#' + basePath + 'all', class: 'tab' + (activeTab == 'all' ? ' active' : '')}, 'all')
            .click((e) => {
                e.preventDefault();
                this.onClickCategory('all');
            }),
            _.each(resources.issueCategories || [], (i, category) => {
                return _.a({href: '#' + basePath + category, class: 'tab' + (activeTab == category ? ' active' : '')}, category)
                .click((e) => {
                    e.preventDefault();
                    this.onClickCategory(category);
                });
            })
        )
    ); 
};
