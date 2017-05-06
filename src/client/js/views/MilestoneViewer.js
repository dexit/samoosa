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
        let editor = new IssueEditor({
            model: new Issue({
                milestone: this.model.title,
                tags: Router.params.tag == 'all' ? [] : [Router.params.tag],
                reporter: User.getCurrent().name
            }),
            isCreating: true
        }); 

        let $issue = editor.$element;

        this.$element.find('.column[data-name="to do"] .btn-new-issue').before($issue);
       
        editor.onClickToggle();

        editor.on('created', (newIssue) => {
            ResourceHelper.addResource('issues', newIssue)
            .then((newIssue) => {
                this.render();
            });
        });
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
