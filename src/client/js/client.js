'use strict';

// Libs
require('exomon');
window.Promise = require('bluebird');

// Views
let IssueEditor = require('./views/IssueEditor');

Router.route('/scrum/', () => {
    $('.app-container').html(
        new IssueEditor({
            model: {
                title: 'New issue',
                description: 'This is a serious issue'            
            }
        }).$element
    );
});

Router.init();
