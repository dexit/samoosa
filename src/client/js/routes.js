'use strict';

// Root
Router.route('/', () => {
    ApiHelper.checkConnection()
    .then(() => {
        navbar.toggleRepositoriesList(true);
        
        $('.workspace').remove();

        $('.app-container').append(
            _.div({class: 'workspace'},
                _.div({class: 'workspace-content logo'},
                    _.img({src: '/public/svg/logo-medium.svg'})
                )
            )
        );
        
        spinner(false);
    })
    .catch(displayError);
});

// User
Router.route('/:user', () => {
    ApiHelper.checkConnection()
    .then(() => {
        navbar.toggleRepositoriesList(true);
        
        $('.workspace').remove();

        $('.app-container').append(
            _.div({class: 'workspace'},
                _.div({class: 'workspace-content logo'},
                    _.img({src: '/public/svg/logo-medium.svg'})
                )
            )
        );
        
        spinner(false);
    })
    .catch(displayError);
});

// Repository
Router.route('/:user/:repository', () => {
    location.hash = '/' + Router.params.user + '/' + Router.params.repository + '/milestones';
});

// Milestones
Router.route('/:user/:repository/milestones/', () => {
    ApiHelper.checkConnection()
    .then(() => {
        return ApiHelper.getResources(true);
    })
    .then(() => {
        SettingsHelper.addToLatestRepositories(Router.params.user, Router.params.repository);

        $('.workspace').remove();

        $('.app-container').append(
            _.div({class: 'workspace'},
                _.div({class: 'workspace-content milestones-container'},
                    new MilestonesEditor().$element
                )
            )
        );
        
        navbar.slideIn();
        spinner(false);
    })
    .catch(displayError);
});

// Board
Router.route('/:user/:repository/board/:mode/', () => {
    location.hash = '/' + Router.params.user + '/' + Router.params.repository + '/board/' + Router.params.mode + '/all';
});

Router.route('/:user/:repository/board/:mode/:tag', () => {
    ApiHelper.checkConnection()
    .then(() => {
        return ApiHelper.getResources(true);
    })
    .then(() => {
        SettingsHelper.addToLatestRepositories(Router.params.user, Router.params.repository);

        $('.workspace').remove();

        // Append all milestones
        $('.app-container').append(
            _.div({class: 'workspace'},
                _.div({class: 'workspace-panel'},
                    new FilterEditor().$element,
                    new TagBar().$element
                ),
                _.div({class: 'workspace-content board-container ' + Router.params.mode},
                    _.each(window.resources.milestones, (i, milestone) => {
                        if(Router.params.mode === 'kanban' && milestone.isClosed()) { return; }
                        
                        return new MilestoneViewer({
                            model: milestone,
                        }).$element;
                    })
                )
            )
        );
       
        // Append the unassigned items, if there are any
        $('.app-container .board-container').append(
            new MilestoneViewer({
                model: new Milestone({
                    title: 'Unassigned',
                    description: 'These issues have yet to be assigned to a milestone'
                })
            }).$element
        );

        navbar.slideIn();
        spinner(false);
    })
    .catch(displayError);
});

// Analytics
Router.route('/:user/:repository/analytics/', () => {
    ApiHelper.checkConnection()
    .then(() => {
        return ApiHelper.getResources(true);
    })
    .then(() => {
        SettingsHelper.addToLatestRepositories(Router.params.user, Router.params.repository);

        $('.workspace').remove();

        $('.app-container').append(
            _.div({class: 'workspace'},
                _.div({class: 'workspace-content analytics'},
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
            )
        );
        
        navbar.slideIn();
        spinner(false);
    })
    .catch(displayError);
});

// Settings
Router.route('/:user/:repository/settings/', () => {
    location = '/#/' + Router.params.user + '/' + Router.params.repository + '/settings/versions';
});

Router.route('/:user/:repository/settings/:resource', () => {
    ApiHelper.checkConnection()
    .then(() => {
        return ApiHelper.getResources(true);
    })
    .then(() => {
        SettingsHelper.addToLatestRepositories(Router.params.user, Router.params.repository);

        $('.workspace').remove();

        let canEdit = (name) => {
            return name !== 'organizations' &&
            name !== 'tags' &&
            name !== 'milestones' &&
            name !== 'issues' &&
            name !== 'repositories' &&
            name !== 'collaborators';
        }

        $('.app-container').append(
            _.div({class: 'workspace'},
                _.div({class: 'workspace-content settings-container'},
                    _.div({class: 'tabbed-container vertical'},
                        _.div({class: 'tabs'},
                            _.each(window.resources, (name, resource) => {
                                // Read only
                                if(ApiHelper.getConfig().readonlyResources.indexOf(name) > -1) {
                                    return;
                                }
                               
                                // Not editable in resource editor
                                if(!canEdit(name)) {
                                    return;
                                }

                                return _.button({class: 'tab' + (Router.params.resource == name ? ' active' : '')},
                                    prettyName(name)
                                ).click(() => {
                                    location = '/#/' + Router.params.user + '/' + Router.params.repository + '/settings/' + name;
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
                                if(!canEdit(name)) {
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
