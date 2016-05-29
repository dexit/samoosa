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
window.Navbar = require('./views/Navbar');
window.IssueEditor = require('./views/IssueEditor');
window.MilestoneEditor = require('./views/MilestoneEditor');
window.ResourceEditor = require('./views/ResourceEditor');

// User
Router.route('/user/', () => {
    ApiHelper.getUser()
    .then((user) => {
        $('.app-container').empty()
            .append(new Navbar().$element)
            .append(
                _.div({class: 'workspace user-container'},
                    _.div({class: 'profile'},
                        _.h4('Current user'),
                        _.img({src: user.avatar}),
                        _.p(user.name),
                        _.h4('Session'),
                        _.button('Change account').click(() => {
                            ApiHelper.logOut();
                        })
                    ) 
                )
            );
    });
});

// Board
Router.route('/board/', () => {
    ApiHelper.getResources()
    .then(() => {
        $('.app-container').empty()
            .append(new Navbar().$element)
            .append(
                _.div({class: 'workspace board-container'},
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
            );
    });
});

// List
Router.route('/list/', () => {
    ApiHelper.getResources()
    .then(() => {
        $('.app-container').empty()
            .append(new Navbar().$element)
            .append(
                _.div({class: 'workspace board-container list'},
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
            );
    });
});

// Settings
Router.route('/settings/', () => {
    ApiHelper.getResources()
    .then(() => {
        $('.app-container').empty()
            .append(new Navbar().$element)
            .append(
                _.div({class: 'workspace settings-container'},
                    _.each(window.resources, (name, resource) => {
                        if(name != 'issues') {
                            return new ResourceEditor({
                                name: name,
                                model: resource
                            }).$element;   
                        }
                    })
                )
            );
    });
});

Router.init();
