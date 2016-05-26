'use strict';

// Libs
require('exomon');
window.Promise = require('bluebird');

// Views
let IssueEditor = require('./views/IssueEditor');

// Temp
window.settings = {
    priorities: {
        trivial: 5,
        minor: 4,
        major: 3,
        critical: 2,
        blocker: 1
    }
};

Router.route('/scrum/', () => {
    $('.app-container').html(
        new IssueEditor({
            model: {
                title: 'New issue',
                description: 'This is a serious issue',
                priority: 3            
            }
        }).$element
    );
});

Router.init();
