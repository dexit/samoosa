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
     * Event: Click print button
     */
    onClickPrint() {
        let html = '';
        let repository = Repository.getCurrent();

        html += '<!DOCTYPE html>';
        html += '<html>';
        
        // Header
        html += '<head>';
        html += '<meta charset="utf-8"/>'
        html += '<meta http-equiv="X-UA-Compatible" content="IE=edge"/>'
        html += '<meta name="viewport" content="width=device-width initial-scale=1"/>'
        html += '<meta name="robots" content"noindex, nofollow"/>'
        html += '<title>' + repository.title + ': ' + this.model.title + '</title>';
        html += '<style>';
        html += 'body { font-family: sans-serif; max-width: 900px; margin: 0px auto; }';
        html += 'h1, h2, h3, h4, h5, h6 { margin-top: 1em; margin-bottom: 0px; }';
        html += 'h1, h3, h5 { margin-top: 0px; }';
        html += 'section { margin-top: 1rem; border: 1px solid #000; padding: 1rem; }';
        html += '</style>';
        html += '</head>';
        
        // Body
        html += '<body>';

        // Repository title and description
        html += '<h1>' + repository.title + '</h1>';

        if(repository.description) {
            html += '<h5>' + repository.description + '</h5>';
        }

        // Milestone title and description
        html += '<h2>' + this.model.title;

        if(this.model.getTotalEstimatedHours() > 0) {
            html += ' (' + this.model.getTotalEstimatedHours() + ' hours)';
        }

        html += '</h2>';

        if(this.model.description) {
            html += '<h5>' + this.model.description + '</h5>';
        }

        for(let issue of this.model.getIssues()) {
            html += '<section>';

            // Issue title
            html += '<h3>' + issue.id + ': ' + issue.title + '</h3>';

            html += '<h5>';

            // Issue assignee
            if(issue.getAssignee()) {
                html += (issue.getAssignee().displayName || issue.getAssignee().name);
            }
            
            // Issue estimate
            if(issue.getEstimatedHours() > 0) {
                html += ' (' + issue.getEstimatedHours() + ' hour' + (issue.getEstimatedHours() != 1 ? 's' : '') + ')';
            }
            
            html += '</h5>';

            // Issue body
            html += (marked(issue.description) || '');
            
            html += '</section>';
        }
    
        html += '</body>';
        html += '</html>';
        
        // Instantiate window
        let printWindow = window.open('', 'PRINT', 'width=780');

        printWindow.document.write(html);
    }

    /**
     * Event: Click new issue button
     */
    onClickNewIssue() {
        spinner('Creating issue');

        let issue = new Issue({
            milestone: this.model.index,
            category: Router.params.category == 'all' ? null : ResourceHelper.getIssueCategory(Router.params.category),
            reporter: ResourceHelper.getCollaborator(User.getCurrent().name),
            assignee: ResourceHelper.getCollaborator(User.getCurrent().name)
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
            totalHours += total[i].getEstimatedHours();
        }
        
        for(let i in completed) {
             completedHours += completed[i].getEstimatedHours();
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
