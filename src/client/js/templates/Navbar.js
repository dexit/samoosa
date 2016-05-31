'use strict';

module.exports = function Navbar() {
    return _.div({class: 'navbar'},
        _.div({class: 'buttons'},
            _.a({href: '/#/user/', class: Router.url == '/user/' ? 'active' : ''},
                _.span({class: 'fa fa-user'})
            ),
            _.a({href: '/#/plan/', class: Router.url == '/plan/' ? 'active' : ''},
                _.span({class: 'fa fa-calendar'})
            ),
            _.a({href: '/#/board/', class: Router.url == '/board/' ? 'active' : ''},
                _.span({class: 'fa fa-columns'})
            ),
            _.a({href: '/#/list/', class: Router.url == '/list/' ? 'active' : ''},
                _.span({class: 'fa fa-list'})
            ),
            _.a({href: '/#/settings/', class: Router.url == '/settings/' ? 'active' : ''},
                _.span({class: 'fa fa-cog'})
            )

        )
    );
};
