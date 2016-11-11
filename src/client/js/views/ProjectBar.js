'use strict';

/**
 * The project bar view
 *
 * @class View Navbar
 */
class ProjectBar extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/ProjectBar');

        this.fetch();
    }
}

module.exports = ProjectBar;
