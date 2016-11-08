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

        let issue = new Issue({
            milestone: this.model.index
        });

        ResourceHelper.addResource('issues', issue)
        .then((newIssue) => {
            let editor = new IssueEditor({
                model: newIssue
            }); 

            let $issue = editor.$element;

            this.$element.find('.column[data-index="' + newIssue.column + '"] .btn-new-issue').before($issue);
           
            editor.onClickToggle();

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
     * Gets remaining days
     *
     * @returns {Number} days
     */
    getRemainingDays() {
        let endDate = this.model.endDate;
        let nowDate = new Date();

        if(!endDate) {
            return 0;
        }

        if(endDate.constructor === String) {
            endDate = new Date(endDate);
        }

        return Math.round((endDate-nowDate)/(1000*60*60*24)) + 1;
    }

    /**
     * Get percent complete
     *
     * @returns {Number} percent
     */
    getPercentComplete() {
        let total = this.getIssues();
        let completed = this.getCompletedIssues();
        let percentage = 0;

        let totalHours = 0;
        let completedHours = 0;

        for(let i in total) {
            totalHours += total[i].getEstimate();
        }
        
        for(let i in completed) {
             completedHours += completed[i].getEstimate();
        }

        if(total.length > 0 && completed.length > 0) {
            percentage = (completed.length / total.length) * 100;
        }

        return percentage;
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
             totalHours += issue.getEstimate();
        }
        
        for(let issue of completed) {
             completedHours += issue.getEstimate();
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

        // Due date
        if(this.model.endDate) {
            let $dueDate = this.$element.find('.header .due-date');

            if($dueDate.length < 1) {
                $dueDate = _.span({class: 'due-date'}).prependTo(this.$element.find('.header .stats'));
            }

            _.append($dueDate.empty(),
                _.span({class: 'fa fa-calendar'}),
                _.span({class: 'date'},
                    prettyDate(this.model.endDate)
                ),
                // No time left
                _.if(this.getRemainingDays() < 1 && this.getPercentComplete() < 100,
                    _.span({class: 'remaining warn-red'},
                        this.getRemainingDays() + 'd'
                    )
                ),
                // Little time left
                _.if(this.getRemainingDays() >= 1 && this.getRemainingDays() < 3 && this.getPercentComplete() < 100,
                    _.span({class: 'remaining warn-yellow'},
                        this.getRemainingDays() + 'd'
                    )
                ),
                // More time left
                _.if(this.getRemainingDays() >= 3 && this.getPercentComplete() < 100,
                    _.span({class: 'remaining'},
                        this.getRemainingDays() + 'd'
                    )
                ),
                // Complete
                _.if(this.getPercentComplete() == 100,
                    _.span({class: 'remaining ok fa fa-check'})
                )
            )
        }
    }

    /**
     * Gets a list of completed
     */
    getCompletedIssues() {
        let issues = []; 
        
        for(let issue of window.resources.issues) {
            if(!issue) { continue; }

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
            if(!issue) { continue; }

            if(issue.milestone == this.model.index) {
                issues.push(issue);
            }            
        }

        return issues;
    }
}

module.exports = MilestoneEditor;
