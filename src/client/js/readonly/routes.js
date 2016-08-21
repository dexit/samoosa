'use strict';

// Root
Router.route('/', () => {
    ApiHelper.checkConnection()
    .then(() => {
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
        });
    });
});

// Scope
Router.route('/:user/:project/scope', () => {
    if(!SettingsHelper.check()) {
        return;
    }

    ApiHelper.checkConnection()
    .then(() => {
        ApiHelper.getResources(['collaborators'])
        .then(() => {
            $('.app-container').empty();

            $('.app-container').append(
                _.div({class: 'workspace scope-container'},
                    _.h1('Scope of work'),
                    _.each(window.resources.milestones, (milestoneIndex, milestone) => {
                        return _.div({class: 'print-milestone'},
                            _.h2({class: 'print-milestone-title'}, milestone.title),
                            _.each(window.resources.issues, (issueIndex, issue) => {
                                if(issue.milestone == milestoneIndex) {
                                    return _.div({class: 'print-issue'},
                                        _.h3({class: 'print-issue-title'},
                                            issue.title
                                        ),
                                        _.p({class: 'print-issue-estimate'},
                                            window.resources.issueEstimates[issue.estimate]
                                        ),
                                        _.p({class: 'print-issue-description'},
                                            markdownToHtml(issue.description)
                                        )
                                    );
                                }            
                            })
                        );
                    })
                )
            );
        });
    });
});

Router.init();
