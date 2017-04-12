'use strict';

const MONTHS = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'
]

module.exports = function render() {
    let lastYear;
    let lastMonth;

    return _.div({class: 'milestones-editor'},
        _.div({class: 'milestones'},
            _.each(resources.milestones, (i, milestone) => {
                if(milestone.getEndDate()) {
                    let dueDate = milestone.getEndDate();

                    let $milestone = new MilestoneEditor({
                        model: milestone,
                    }).$element;

                    let elements = [ $milestone ];
                    
                    if(dueDate.getMonth() != lastMonth) {
                        lastMonth = dueDate.getMonth();

                        elements.unshift(_.h4({class: 'month'}, MONTHS[lastMonth]));
                    }

                    if(dueDate.getFullYear() != lastYear) {
                        lastYear = dueDate.getFullYear();

                        elements.unshift(_.h2({class: 'year'}, lastYear));
                    }

                    return elements;
                }
            }),
        ),
        _.div({class: 'btn-new-fixer'},
            _.div({class: 'btn-new-container'},
                _.button({class: 'btn btn-new'},
                    'New milestone',
                    _.span({class: 'fa fa-plus'})
                ).click(() => { this.onClickAddMilestone(); })
            )
        )
    );
}
