'use strict';

module.exports = function render() {
    return _.div({class: 'activity-analytics'},
        _.div({class: 'toolbar'},
            _.select({class: 'milestone-picker'},
                _.each(resources.milestones, (i, milestone) => {
                    return _.option({value: milestone.index}, milestone.title);
                })
            ).change((e) => { this.onChangeMilestonePicker($(e.target).val()); })
        ),
        _.div({class: 'graph'},
            _.each(resources.issues, (i, issue) => {
                if(issue.milestone != this.getCurrentMilestone().index) { return; }
                
                return _.p(issue.title);  
            }) 
        )
    );
}
