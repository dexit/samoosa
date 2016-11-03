'use strict';

// Root
Router.route('/', () => {
    setTimeout(() => {
        location.hash = '/' + ApiHelper.getUserName();

        $('.app-container').append(
            _.div({class: 'workspace logo'},
                _.img({src: '/public/svg/logo-medium.svg'})
            )
        );
    }, 10);
});

// User
Router.route('/:user', () => {
    setTimeout(() => {
        navbar.toggleProjectsList(true);
        
        $('.app-container').append(
            _.div({class: 'workspace logo'},
                _.img({src: '/public/svg/logo-medium.svg'})
            )
        );
    }, 10);
});

// Project
Router.route('/:user/:project', () => {
    location.hash = '/' + Router.params.user + '/' + Router.params.project + '/board/kanban';
});

// Plan
Router.route('/:user/:project/plan/', () => {
    ApiHelper.checkConnection()
    .then(() => {
        return ApiHelper.getResources();
    })
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

// Board
Router.route('/:user/:project/board/:mode', () => {
    ApiHelper.checkConnection()
    .then(() => {
        return ApiHelper.getResources();
    })
    .then(() => {
        $('.workspace').remove();

        // Append all milestones
        $('.app-container').append(
            _.div({class: 'workspace board-container ' + Router.params.mode},
                new FilterEditor().$element,
                _.each(window.resources.milestones, (i, milestone) => {
                    return new MilestoneEditor({
                        model: milestone,
                    }).$element;
                })
            )
        );
        
        // Sort milestones by end date
        $('.app-container .board-container .milestone-editor').sort((a, b) => {
            let aDate = new Date(a.getAttribute('data-end-date'));
            let bDate = new Date(b.getAttribute('data-end-date'));

            if(aDate < bDate) {
                return -1;
            }
            
            if(aDate > bDate) {
                return 1;
            }

            return 0;
        }).detach().appendTo('.app-container .board-container');

        // Append the unassigned items
        $('.app-container .board-container').append(
            new MilestoneEditor({
                model: {
                    title: 'Unassigned',
                    description: 'These issues have yet to be assigned to a milestone'
                }
            }).$element
        );

        navbar.slideIn();
    });
});

// Analytics
Router.route('/:user/:project/analytics/', () => {
    ApiHelper.checkConnection()
    .then(() => {
        return ApiHelper.getResources();
    })
    .then(() => {
        $('.workspace').remove();

        $('.app-container').append(
            _.div({class: 'workspace analytics'},
                _.div({class: 'tabbed-container vertical'},
                    _.div({class: 'tabs'},
                        _.button({class: 'tab active'},
                            'BURN DOWN CHART'
                        ).click(function() {
                            let index = $(this).index();
                            
                            $(this).parent().children().each(function(i) {
                                $(this).toggleClass('active', i == index);
                            });

                            $(this).parents('.tabbed-container').find('.panes .pane').each(function(i) {
                                $(this).toggleClass('active', i == index);
                            });
                        })
                    ),
                    _.div({class: 'panes'},
                        _.div({class: 'pane active'},
                            new BurnDownChart().$element
                        )
                    )
                )
            )
        );
        
        navbar.slideIn();
    })
    .catch(displayError);
});

// Settings
Router.route('/:user/:project/settings/', () => {
    ApiHelper.checkConnection()
    .then(() => {
        return ApiHelper.getResources();
    })
    .then(() => {
        $('.workspace').remove();

        let tabCounter = 0;
        let paneCounter = 0;

        $('.app-container').append(
            _.div({class: 'workspace settings-container'},
                _.div({class: 'tabbed-container vertical'},
                    _.div({class: 'tabs'},
                        _.each(window.resources, (name, resource) => {
                            // Read only
                            if(ApiHelper.getConfig().readonlyResources.indexOf(name) > -1) {
                                return;
                            }
                           
                            // Not editable in resource editor
                            if(name == 'issues' || name == 'projects') {
                                return;
                            }

                            tabCounter++;
                            
                            return _.button({class: 'tab' + (tabCounter == 1 ? ' active' : '')},
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
                        })
                    ),
                    _.div({class: 'panes'},
                        _.each(window.resources, (name, resource) => {
                            // Read only
                            if(ApiHelper.getConfig().readonlyResources.indexOf(name) > -1) {
                                return;
                            }
                            
                            // Not editable in resource editor
                            if(name == 'issues' || name == 'projects') {
                                return;
                            }
                            
                            paneCounter++;
                            
                            return _.div({class: 'pane' + (paneCounter == 1 ? ' active' : '')},
                                new ResourceEditor({
                                    name: name,
                                    model: resource
                                }).$element
                            );
                        })
                    )
                )
            )
        );
        
        navbar.slideIn();
    });
});

// Init router
Router.init();

// Navbar
let navbar = new Navbar();

$('.app-container').html(
    navbar.$element
);
