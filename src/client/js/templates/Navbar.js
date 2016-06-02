'use strict';

module.exports = function Navbar() {
    return _.div({class: 'navbar'},
        _.div({class: 'buttons'},
            _.each(this.getLinks(), (i, link) => {
                return _.a({
                    href: './#' + link.url,
                    class: (Router.url == link.url ? 'active' : '') + (link.bottom ? ' bottom' : '')
                },
                    _.span({class: 'fa fa-' + link.icon})
                ).click(this.onClickLink);
            })
        )
    );
};
