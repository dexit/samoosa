'use strict';

// Libs
require('exomon');
window.Promise = require('bluebird');

// Helpers
window.ResourceHelper = require('./helpers/ResourceHelper');
window.ApiHelper = require('../../../plugins/github/js/GitHubApi')

// Models
window.Issue = require('./models/Issue');

// Views
window.IssueEditor = require('./views/IssueEditor');
window.MilestoneEditor = require('./views/MilestoneEditor');

// Temp
let defaultIssue = {
    title: 'New issue',
    description: 'This is a serious issue',
    priority: 3,
    type: 1,
    assignee: 0,
    version: 0,
    progress: 0,
    milestone: 0,
    comments: [
        {
            collaborator: 0,
            text: 'And this is a serious comment'
        }
    ]
};

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
    collaborators: [
        {
            name: 'dude',
            avatar: 'https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/512x512/plain/businessperson.png'
        }            
    ],
    milestones: [
        {
            name: 'alpha',
            description: '...'
        },
        {
            name: 'beta',
            description: '...'
        }
    ],
    issues: [
        defaultIssue,
        defaultIssue,
        defaultIssue,
        defaultIssue,
        defaultIssue
    ],
    columns: [
        'to do',
        'in progress',
        'done'
    ]
};

Router.route('/scrum/', () => {
    ApiHelper.getCollaborators()
    .then(() => {
        ApiHelper.getIssueTypes()
        .then(() => {
            ApiHelper.getMilestones()
            .then(() => {
                ApiHelper.getVersions()
                .then(() => {
                    ApiHelper.getIssues()
                    .then(() => {
                        $('.app-container').html(
                            _.div({class: 'scrum-container'},
                                _.div({class: 'toolbar'},
                                    _.button('list').click(() => {
                                        $('.scrum-container').toggleClass('list');
                                    })
                                ),
                                _.div({class: 'workspace'},
                                    _.each(window.settings.milestones, (i, milestone) => {
                                        return new MilestoneEditor({
                                            model: milestone,
                                        }).$element;
                                    }),
                                    new MilestoneEditor({
                                        model: {
                                            title: 'Backlog',
                                        }
                                    }).$element
                                )
                            )
                        );
                    });
                });
            });
        });
    });
});

Router.init();
