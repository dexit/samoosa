'use strict';

// Libs
require('exomon');
window.Promise = require('bluebird');

// Helpers
window.ResourceHelper = require('./helpers/ResourceHelper');

let GitHubApi = require('../../../plugins/github/js/GitHubApi');
window.ApiHelper = new GitHubApi();

// Models
window.Issue = require('./models/Issue');

// Views
window.IssueEditor = require('./views/IssueEditor');
window.MilestoneEditor = require('./views/MilestoneEditor');

Router.route('/scrum/', () => {
    ApiHelper.getResources()
    .then(() => {
        $('.app-container').html(
            _.div({class: 'scrum-container'},
                _.div({class: 'toolbar'},
                    _.button('list').click(() => {
                        $('.scrum-container').toggleClass('list');
                    })
                ),
                _.div({class: 'workspace'},
                    _.each(window.resources.milestones, (i, milestone) => {
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

Router.init();
