'use strict';

// Libs
require('exomon');
window.Promise = require('bluebird');

// Views
let IssueEditor = require('./views/IssueEditor');

// Temp
window.settings = {
    priorities: [
        'blocker',
        'critical',
        'major',
        'minor',
        'trivial'
    ],
    types: [
        'task',
        'bug',
        'enhancement',
        'question'
    ],
    versions: [
        '0.1.1',
        '0.1.2',
        '0.1.3'
    ],
    contributors: [
        {
            name: 'dude',
            icon: 'https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/512x512/plain/businessperson.png'
        }            
    ]
};

Router.route('/scrum/', () => {
    $('.app-container').html(
        new IssueEditor({
            model: {
                title: 'New issue',
                description: 'This is a serious issue',
                priority: 3,
                type: 1,
                assignee: 0,
                version: 0,
                comments: [
                    {
                        contributor: 0,
                        text: 'And this is a serious comment'
                    }
                ]
            }
        }).$element
    );
});

Router.init();
