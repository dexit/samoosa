'use strict';

// Root
Router.route('/', () => {
    if(!SettingsHelper.check()) {
        return;
    }

    ApiHelper.checkConnection()
    .then(() => {
        ViewHelper.clear();

        $('.app-container')
        .empty()
        .append(new Navbar().$element)
        .append(
            _.div({class: 'workspace root-container'},
                _.div({class: 'content'},
                    _.h1('Mondai'),
                    _.p('The pluggable issue tracker')
                )
            )
        );
        
        setTimeout(() => {
            location.hash = SettingsHelper.get('view', 'default', '/board/');
        }, 3000);
    });
});

// User
Router.route('/user/', () => {
    ApiHelper.checkConnection()
    .then(() => {
        ApiHelper.getUser()
        .then((user) => {
            ViewHelper.clear();

            $('.app-container')
            .empty()
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
});

// Projects
Router.route('/projects/', () => {
    ApiHelper.checkConnection()
    .then(() => {
        ApiHelper.getProjects()
        .then(() => {
            ViewHelper.clear();

            $('.app-container')
            .empty()
            .append(new Navbar().$element)
            .append(
                _.div({class: 'workspace projects-container'},
                    _.each(window.resources.projects, (i, project) => {
                        return new ProjectEditor({
                            model: project
                        }).$element;
                    })
                )
            );
        });
    });
});

// Plan
Router.route('/plan/', () => {
    if(!SettingsHelper.check()) {
        return;
    }

    SettingsHelper.set('view', 'default', '/plan/');

    ApiHelper.checkConnection()
    .then(() => {
        ApiHelper.getResources()
        .then(() => {
            ViewHelper.clear();
            
            $('.app-container')
            .empty()
            .append(new Navbar().$element)
            .append(
                _.div({class: 'workspace plan-container'},
                    new PlanEditor().$element
                )
            );
        });
    });
});

// Board
Router.route('/board/', () => {
    if(!SettingsHelper.check()) {
        return;
    }

    SettingsHelper.set('view', 'default', '/board/');

    ApiHelper.checkConnection()
    .then(() => {
        ApiHelper.getResources()
        .then(() => {
            ViewHelper.clear();

            $('.app-container')
            .empty()
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
});

// List
Router.route('/list/', () => {
    if(!SettingsHelper.check()) {
        return;
    }

    SettingsHelper.set('view', 'default', '/list/');

    ApiHelper.checkConnection()
    .then(() => {
        ApiHelper.getResources()
        .then(() => {
            ViewHelper.clear();
            
            $('.app-container')
            .empty()
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
});

// Settings
Router.route('/settings/', () => {
    if(!SettingsHelper.check()) {
        return;
    }

    ApiHelper.checkConnection()
    .then(() => {
        ApiHelper.getResources()
        .then(() => {
            ViewHelper.clear();
            
            $('.app-container')
            .empty()
            .append(new Navbar().$element)
            .append(
                _.div({class: 'workspace settings-container'},
                    _.div({class: 'tabbed-container'},
                        _.div({class: 'tabs'},
                            _.each(window.resources, (name, resource) => {
                                if(name != 'issues' && name != 'milestones' && name != 'projects') {
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
                                if(name != 'issues' && name != 'milestones' && name != 'projects') {
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
});

Router.init();
