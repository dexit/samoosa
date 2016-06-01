'use strict';

module.exports = function render() {
    return _.div({class: 'plan-editor'},
        _.div({class: 'years'},
            _.each(this.getYears(), (i, year) => {
                return _.button({class: 'tab year' + (this.currentYear == year.number ? ' active' : '')},
                    year.number
                ).click(() => { this.onClickYear(year.number); });
            })
        ),
        _.div({class: 'months'},
            _.each(this.getMonths(), (i, month) => {
                return _.button({class: 'tab month' + (this.currentMonth == month.number ? ' active' : '')},
                    month.name
                ).click(() => { this.onClickMonth(month.number); });
            })
        ),
        _.div({class: 'weeks'},
            _.each(this.getWeeks(this.currentYear, this.currentMonth), (i, week) => {
                return _.div({class: 'week'},
                    week
                );
            })
        ),
        _.div({class: 'dates'},
            _.each(this.getDates(this.currentYear, this.currentMonth), (i, date) => {
                return _.div({class: 'date', 'data-date': date},
                    _.div({class: 'header'},
                        _.span({class: 'number'}, date.getDate()),
                        _.span({class: 'name'}, date.getDayName())
                    ),
                    _.div({class: 'body'},
                        _.each(window.resources.milestones, (i, milestone) => {
                            let dueDate = new Date(milestone.endDate);

                            dueDate.setHours(0);
                            dueDate.setMinutes(0);
                            dueDate.setSeconds(0);

                            if(dueDate.valueOf() == date.valueOf()) {
                                return new PlanItemEditor({
                                    model: milestone,
                                }).$element;
                            }
                        }),
                        _.button({class: 'btn-transparent'},
                            _.span({class: 'fa fa-plus'})
                        )
                    )
                );
            })
        )
    );
}
