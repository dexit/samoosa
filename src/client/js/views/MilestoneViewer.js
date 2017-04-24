'use strict';

/**
 * An editor for milestones, displaying issues in columns or rows
 */
class MilestoneEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/MilestoneViewer');

        this.fetch();
    }

    /**
     * Event: Click new issue button
     */
    onClickNewIssue() {
        spinner('Creating issue');

        let issue = new Issue({
            milestone: this.model.index,
            team: Router.params.team == 'all' ? null : ResourceHelper.getTeam(Router.params.team),
            reporter: ResourceHelper.getCollaborator(User.getCurrent().name)
        });

        ResourceHelper.addResource('issues', issue)
        .then((newIssue) => {
            let editor = new IssueEditor({
                model: newIssue
            }); 

            let $issue = editor.$element;

            this.$element.find('.column[data-index="' + newIssue.column + '"] .btn-new-issue').before($issue);
           
            editor.onClickToggle();

            spinner(false);
        });

        if(this.$element.hasClass('collapsed')) {
            this.onClickToggle();
        }
    }

    /**
     * Event: Click toggle button
     */
    onClickToggle() {
        let wasCollapsed = this.$element.hasClass('collapsed');
        let newKey = wasCollapsed ? 'expanded' : 'collapsed';
        
        toggleExpand(this.$element);

        SettingsHelper.set(
            'milestone',
            this.model.index,
            newKey
        );
    }

    /**
     * Gets a list of all issues
     */
    getIssues() {
        let issues = []; 
        
        for(let issue of window.resources.issues) {
            if(!issue) { continue; }

            if(issue.milestone == this.model.index) {
                issues.push(issue);
            }            
        }

        return issues;
    }
}

module.exports = MilestoneEditor;
