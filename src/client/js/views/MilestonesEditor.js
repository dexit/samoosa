'use strict';

class MilestonesEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/MilestonesEditor');

        this.init();

        // Set click event
        this.$element.on('click', (e) => {
            $('.milestone-editor').removeClass('editing');
            
            let $milestone = $(e.target);
            
            if(!$milestone.hasClass('milestone-editor')) {
                $milestone = $milestone.parents('.milestone-editor');
            }

            if($milestone.length > 0) {
                $milestone.addClass('editing');
            }
        });
    }

    
    /**
     * Focuses a milestone
     *
     * @param {Object} milestone
     */
    focus(milestone) {
        $('.milestone-editor').each((i, element) => {
            let isFocus = element.dataset.id == milestone.id;

            element.classList.toggle('editing', isFocus);

            if(isFocus) {
                element.scrollIntoView();
            }
        });
    }

    /**
     * Event: Click add milestone
     */
    onClickAddMilestone() {
        if(ApiHelper.isSpectating()) {
            return;
        }
        
        spinner('Creating milestone');

        ResourceHelper.addResource('milestones', new Milestone({
            title: 'New milestone',
            description: '',
            endDate: new Date().toISOString()
        }))
        .then((newMilestone) => {
            this.render();

            this.focus(newMilestone);

            spinner(false);
        });
    }
}

module.exports = MilestonesEditor;
