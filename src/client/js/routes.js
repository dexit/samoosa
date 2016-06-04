'use strict';

// Root
Router.route('/', () => {
    ApiHelper.checkConnection()
    .then(() => {
        $('.workspace').remove();

        $('.app-container').append(
            _.div({class: 'workspace root-container'},
                _.div({class: 'content'},
                    _.h1('Mondai'),
                    _.p('The pluggable issue tracker')
                )
            )
        );
       
        navbar.slideIn();
    });
});

// User
Router.route('/user/', () => {
    ApiHelper.checkConnection()
    .then(() => {
        ApiHelper.getUser()
        .then((user) => {
            $('.workspace').remove();

            $('.app-container').append(
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

            navbar.slideIn();
        });
    });
});

// Plan
Router.route('/:project/plan/', () => {
    if(!SettingsHelper.check()) {
        return;
    }

    ApiHelper.checkConnection()
    .then(() => {
        ApiHelper.getResources()
        .then(() => {
            $('.workspace').remove();

            $('.app-container').append(
                _.div({class: 'workspace plan-container'},
                    new PlanEditor().$element
                )
            );
            
            navbar.slideIn();
        });
    });
});

// Board
Router.route('/:project/board/', () => {
    if(!SettingsHelper.check()) {
        return;
    }

    ApiHelper.checkConnection()
    .then(() => {
        ApiHelper.getResources()
        .then(() => {
            $('.workspace').remove();

            $('.app-container').append(
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
            
            navbar.slideIn();
        });
    });
});

// List
Router.route('/:project/list/', () => {
    if(!SettingsHelper.check()) {
        return;
    }

    ApiHelper.checkConnection()
    .then(() => {
        ApiHelper.getResources()
        .then(() => {
            $('.workspace').remove();

            $('.app-container').append(
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
            
            navbar.slideIn();
        });
    });
});

// Settings
Router.route('/:project/settings/', () => {
    if(!SettingsHelper.check()) {
        return;
    }

    ApiHelper.checkConnection()
    .then(() => {
        ApiHelper.getResources()
        .then(() => {
            $('.workspace').remove();

            $('.app-container').append(
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
            
            navbar.slideIn();
        });
    });
});

Router.init();

// Navbar
let navbar = new Navbar();

$('.app-container').html(
    navbar.$element
);

