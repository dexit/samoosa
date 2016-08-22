'use strict';

// Root
Router.route('/', () => {
    setTimeout(() => {
        $('.workspace').remove();

        $.get('/README.md', (res) => {
            $('.app-container').append(
                _.div({class: 'workspace readme-container'},
                    markdownToHtml(res) 
                )
            );
        });

        navbar.slideIn();
    }, 10);
});

// User
Router.route('/:user', () => {
    setTimeout(() => {
        $('.workspace').remove();

        $('.app-container').append(
            _.div({class: 'workspace user-container'},
                _.h1(this.user)
            )
        );

        navbar.toggleProjectsList(true);
    }, 10);
});

// Plan
Router.route('/:user/:project/plan/', () => {
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
Router.route('/:user/:project/board/:mode', () => {
    ApiHelper.checkConnection()
    .then(() => {
        ApiHelper.getResources()
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
});

// Settings
Router.route('/:user/:project/settings/', () => {
    ApiHelper.checkConnection()
    .then(() => {
        ApiHelper.getResources()
        .then(() => {
            $('.workspace').remove();

            $('.app-container').append(
                _.div({class: 'workspace settings-container'},
                    _.div({class: 'tabbed-container vertical'},
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

// Init router
Router.init();

// Navbar
let navbar = new Navbar();

$('.app-container').html(
    navbar.$element
);
