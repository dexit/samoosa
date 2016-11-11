'use strict';

// Root
Router.route('/', () => {
    ApiHelper.checkConnection()
    .then(() => {
        navbar.toggleProjectsList(true);
        
        $('.workspace').remove();

        $('.app-container').append(
            _.div({class: 'workspace logo'},
                _.img({src: '/public/svg/logo-medium.svg'})
            )
        );
        
        spinner(false);
    })
    .catch(displayError);
});

// Project
Router.route('/:user/:project', () => {
    location.hash = '/' + Router.params.user + '/' + Router.params.project + '/board/kanban';
});

// Plan
Router.route('/:user/:project/plan/', () => {
    ApiHelper.checkConnection()
    .then(() => {
        return ApiHelper.getResources(true);
    })
    .then(() => {
        $('.workspace').remove();

        $('.app-container').append(
            _.div({class: 'workspace plan-container'},
                _.div({class: 'workspace-fixed'},
                    new ProjectBar().$element
                ),
                new PlanEditor().$element
            )
        );
        
        navbar.slideIn();
        spinner(false);
    })
    .catch(displayError);
});

// Board
Router.route('/:user/:project/board/:mode', () => {
    ApiHelper.checkConnection()
    .then(() => {
        return ApiHelper.getResources(true);
    })
    .then(() => {
        $('.workspace').remove();

        // Append all milestones
        $('.app-container').append(
            _.div({class: 'workspace board-container ' + Router.params.mode},
                _.div({class: 'workspace-fixed'},
                    new ProjectBar().$element,
                    new FilterEditor().$element
                ),
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
        spinner(false);
    })
    .catch(displayError);
});

// Analytics
Router.route('/:user/:project/analytics/', () => {
    ApiHelper.checkConnection()
    .then(() => {
        return ApiHelper.getResources(true);
    })
    .then(() => {
        $('.workspace').remove();

        $('.app-container').append(
            _.div({class: 'workspace analytics'},
                _.div({class: 'workspace-fixed'},
                    new ProjectBar().$element
                ),
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
        spinner(false);
    })
    .catch(displayError);
});

// Settings
Router.route('/:user/:project/settings/', () => {
    location = '/#/' + Router.params.user + '/' + Router.params.project + '/settings/versions';
});

Router.route('/:user/:project/settings/:resource', () => {
    ApiHelper.checkConnection()
    .then(() => {
        return ApiHelper.getResources(true);
    })
    .then(() => {
        $('.workspace').remove();

        $('.app-container').append(
            _.div({class: 'workspace settings-container'},
                _.div({class: 'workspace-fixed'},
                    new ProjectBar().$element
                ),
                _.div({class: 'tabbed-container vertical'},
                    _.div({class: 'tabs'},
                        _.each(window.resources, (name, resource) => {
                            // Read only
                            if(ApiHelper.getConfig().readonlyResources.indexOf(name) > -1) {
                                return;
                            }
                           
                            // Not editable in resource editor
                            if(name == 'collaborators' || name == 'issues' || name == 'projects') {
                                return;
                            }

                            return _.button({class: 'tab' + (Router.params.resource == name ? ' active' : '')},
                                prettyName(name)
                            ).click(() => {
                                location = '/#/' + Router.params.user + '/' + Router.params.project + '/settings/' + name;
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
                            if(name == 'issues' || name == 'projects' || name == 'collaborators') {
                                return;
                            }
                            
                            return _.div({class: 'pane' + (Router.params.resource == name ? ' active' : '')},
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
        spinner(false);
    })
    .catch(displayError);
});

// Init router
Router.init();

// Navbar
let navbar = new Navbar();
$('.app-container').html(navbar.$element);
