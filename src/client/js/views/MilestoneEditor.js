'use strict';

class PlanItemEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/MilestoneEditor');

        this.fetch();
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

        // TODO: Find a more elegant solution to this
        // Write change log to console
        console.log(this.model.getChangeLog());
    }


    /**
     * Event: Click save
     */
    onClickSave() {
        let year = this.$element.find('input[name="year"]').val();
        let month = this.$element.find('input[name="month"]').val();
        let day = this.$element.find('input[name="day"]').val();
        let dateString = year + '-' + month + '-' + day;

        // Update model data with new information based on DOM location
        this.model.title = this.$element.find('input[name="title"]').val();
        this.model.description = this.$element.find('input[name="description"]').val();
      
        if(dateString) {
            try {
                let date = new Date(dateString);

                this.model.endDate = date.toISOString();
            } catch(e) {
                displayError(new Error(dateString + ' is an invalid date'));
                return;
            }
        } else {
            this.model.endDate = null;
        }

        // Update DOM elements to match model
        this.$element.find('.drag-handle').text(this.model.title);

        // Start loading
        this.$element.toggleClass('loading', true);
        
        ResourceHelper.updateResource('milestones', this.model)
        .then(() => {
            this.$element.toggleClass('loading', false);

            ViewHelper.get('MilestonesEditor').render();
            ViewHelper.get('MilestonesEditor').focus(this.model);
        }); 
    }

    /**
     * Event: Click delete button
     */
    onClickDelete() {
        if(!confirm('Are you sure you want to delete the milestone "' + this.model.title + '"?')) { return; }

        spinner('Deleting milestone');

        ResourceHelper.removeResource('milestones', this.model.index)
        .then(() => {
            ViewHelper.get('MilestonesEditor').render();

            $('.app-container').removeClass('disabled');

            spinner(false);
        });
    }
}

module.exports = PlanItemEditor;
