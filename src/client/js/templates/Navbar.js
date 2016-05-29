'use strict';

module.exports = function Navbar() {
    return _.div({class: 'navbar'},
        _.div({class: 'buttons'},
            _.a({href: '/#/user'},
                _.span({class: 'fa fa-user'})
            ),
            _.a({href: '/#/board'},
                _.span({class: 'fa fa-columns'})
            ),
            _.a({href: '/#/list'},
                _.span({class: 'fa fa-list'})
            )
        )
    );
};
