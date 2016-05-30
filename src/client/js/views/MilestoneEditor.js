'use strict';

class MilestoneEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/MilestoneEditor');

        this.fetch();

        this.updateProgress();
    }

    onClickNewIssue() {
        spinner(true);
        
        Issue.create({ milestone: this.model.index })
        .then((issue) => {
            let $issue = new IssueEditor({
                model: issue
            }).$element; 

            $('.milestone-editor[data-index="' + issue.milestone + '"] .column[data-index="' + issue.column + '"]').append($issue);
            
            spinner(false);
        });
    }

    onClickToggle() {
        this.$element.toggleClass('collapsed');
    }

    updateProgress() {
        let total = this.getIssues().length;
        let completed = this.getCompletedIssues().length;
        let percentage = 0;

        if(total > 0 && completed > 0) {
            percentage = (completed / total) * 100;
        }
        
        this.$element.find('.header .progress-bar').css({
            width: percentage + '%'
        });
        
        this.$element.find('.header .progress-text .completed').html(completed);
        this.$element.find('.header .progress-text .total').html(total);
    }

    getCompletedIssues() {
        let issues = []; 
        
        for(let issue of window.resources.issues) {
            if(issue.milestone == this.model.index && issue.column == window.resources.issueColumns.length - 1) {
                issues.push(issue);
            }            
        }

        return issues;
    }

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
