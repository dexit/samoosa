'use strict';

// Libs
require('exomon');
window.Promise = require('bluebird');
window.markdownToHtml = require('marked');

// Helpers
window.ResourceHelper = require('./helpers/ResourceHelper');

let GitHubApi = require('../../../plugins/github/js/GitHubApi');
window.ApiHelper = new GitHubApi();

// Models
window.Issue = require('./models/Issue');

// Views
window.IssueEditor = require('./views/IssueEditor');
window.MilestoneEditor = require('./views/MilestoneEditor');

Router.route('/board/', () => {
    ApiHelper.getResources()
    .then(() => {
        $('.app-container').html(
            _.div({class: 'board-container'},
                _.div({class: 'toolbar'},
                    _.button('list').click(() => {
                        $('.board-container').toggleClass('list');
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
