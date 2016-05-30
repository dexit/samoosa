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

// ----------
// Global functions
// ----------
// Pretty name
window.prettyName = function(name) {
    let prettyName = name;

    for(let i in prettyName) {
        if(i == 0) {
            prettyName = prettyName.substring(0,1).toUpperCase() + prettyName.substring(1);

        } else if(prettyName[i] == prettyName[i].toUpperCase()) {
            prettyName = prettyName.substring(0, i) + ' ' + prettyName.substring(i);
        
        }
    }

    return prettyName;
};

// Spinner
window.spinner = function(active) {
    $('.spinner-backdrop').remove();
       
    if(active) { 
        $('body').append(
            _.div({class: 'spinner-backdrop'},
                _.div({class: 'spinner-container'},
                    _.span({class: 'spinner-icon fa fa-refresh'})
                )
            )
        );
    }
};

// Scroll on page
window.scroll = function(amount) {
    let current = $(document).scrollTop();

    $(document).scrollTop(current + amount);
}

// ----------
// Routes
// ----------
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
                    _.div({class: 'tabbed-container'},
                        _.div({class: 'tabs'},
                            _.each(window.resources, (name, resource) => {
                                if(name != 'issues') {
                                    return _.button({class: 'tab' + (name == 'issueTypes' ? ' active' : '')},
                                        prettyName(name)
                                    ).click(function() {
                                        let index = $(this).index();
                                        
                                        $(this).parent().children().each(function(i) {
                                            $(this).toggleClass('active', i == index);
                                        });

                                        $(this).parents('.tabbed-container').find('.panes .pane').each(function(i) {
                                            $(this).toggleClass('active', i == index);
                                        });
                                    });
                                }
                            })
                        ),
                        _.div({class: 'panes'},
                            _.each(window.resources, (name, resource) => {
                                if(name != 'issues') {
                                    return _.div({class: 'pane' + (name == 'issueTypes' ? ' active' : '')},
                                        new ResourceEditor({
                                            name: name,
                                            model: resource
                                        }).$element
                                    );
                                }
                            })
                        )
                    )
                )
            );
    });
});

Router.init();
