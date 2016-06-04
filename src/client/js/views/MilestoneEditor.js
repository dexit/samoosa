'use strict';

/**
 * An editor for milestones, displaying issues in columns or rows
 */
class MilestoneEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/MilestoneEditor');

        this.fetch();

        this.updateProgress();
    }

    /**
     * Event: Click new issue button
     */
    onClickNewIssue() {
        spinner(true);
        
        Issue.create({ milestone: this.model.index })
        .then((issue) => {
            let editor = new IssueEditor({
                model: issue
            }); 

            console.log(issue);

            let $issue = editor.$element;

            $('.milestone-editor[data-index="' + issue.milestone + '"] .column[data-index="' + issue.column + '"]').append($issue);
           
            $issue.find('.header .btn-edit').click();

            this.updateProgress();

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
        this.$element.toggleClass('collapsed');
        
        SettingsHelper.set(
            'milestone',
            this.model.index,
            this.$element.hasClass('collapsed') ? 'collapsed' : ''
        );
    }

    /**
     * Update progress indicators
     */
    updateProgress() {
        let total = this.getIssues();
        let completed = this.getCompletedIssues();
        let percentage = 0;

        let totalHours = 0;
        let completedHours = 0;

        for(let issue of total) {
             totalHours += issue.getEstimatedHours();
        }
        
        for(let issue of completed) {
             completedHours += issue.getEstimatedHours();
        }

        if(total.length > 0 && completed.length > 0) {
            percentage = (completed.length / total.length) * 100;
        }
        
        this.$element.find('.header .progress-bar').css({
            width: percentage + '%'
        });
        
        this.$element.find('.header .progress-amounts .total').html(total.length);
        this.$element.find('.header .progress-hours .total').html(totalHours + 'h');
        
        this.$element.find('.header .progress-amounts .remaining').html(total.length - completed.length);
        this.$element.find('.header .progress-hours .remaining').html((totalHours - completedHours) + 'h');
    }

    /**
     * Gets a list of completed
     */
    getCompletedIssues() {
        let issues = []; 
        
        for(let issue of window.resources.issues) {
            if(issue.milestone == this.model.index && issue.isClosed()) {
                issues.push(issue);
            }            
        }

        return issues;
    }

    /**
     * Gets a list of all issues
     */
    getIssues() {
        let issues = []; 
        
        for(let issue of window.resources.issues) {
            if(issue.milestone == this.model.index) {
                issues.push(issue);
            }            
        }

        return issues;
    }
}

module.exports = MilestoneEditor;
