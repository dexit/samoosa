'use strict';

/**
 * The navbar view
 *
 * @class View Navbar
 */
class Navbar extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/Navbar');

        this.fetch();
    }

    /**
     * Gets a list of links
     */
    getLinks() {
        return [
            {
                url: '/user/',
                icon: 'user'
            },
            {
                url: '/projects/',
                icon: 'folder'
            },
            {
                url: '/plan/',
                icon: 'calendar'
            },
            {
                url: '/board/',
                icon: 'columns'
            },
            {
                url: '/list/',
                icon: 'list'
            },
            {
                url: '/settings/',
                icon: 'cog',
                bottom: true
            }
        ];
    }
}

module.exports = Navbar;
