'use strict';

module.exports = function ProjectBar() {
    return _.div({class: 'project-bar'},
        _.h4(Project.getCurrent().title),
        _.p(Project.getCurrent().description)
    );
};
