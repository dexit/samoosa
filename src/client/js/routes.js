'use strict';

// Root
Router.route('/', () => {
    ApiHelper.checkConnection()
    .then(() => {
        $('.workspace').remove();

        $.get('./README.md', (txt) => {
            $('.app-container').append(
                _.div({class: 'workspace readme-container'},
                    _.div({class: 'content'},
                        _.p('v' + app.version),
                        markdownToHtml(txt)
                    )
                )
            );
        });

        navbar.slideIn();
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
Router.route('/:project/board/:mode', () => {
    if(!SettingsHelper.check()) {
        return;
    }

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

Router.init();

// Navbar
let navbar = new Navbar();

$('.app-container').html(
    navbar.$element
);

