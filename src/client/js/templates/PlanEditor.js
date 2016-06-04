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
        _.div({class: 'weekdays dates'},
            _.each(this.getWeekDays(), (weekdayIndex, weekday) => {
                return _.div({class: 'weekday'},
                    _.div({class: 'header'},
                        weekday  
                    ),
                    _.div({class: 'body'},
                        _.each(this.getWeeks(this.currentYear, this.currentMonth), (weekIndex, week) => {
                            let $date = _.div({class: 'date-placeholder'});
                           
                            for(let date of this.getDates(this.currentYear, this.currentMonth, weekdayIndex)) {
                                if(date.getWeek() == week) {
                                    $date = _.div({class: 'date', 'data-date': date},
                                        _.div({class: 'header'},
                                            _.span({class: 'datenumber'}, date.getDate()),
                                            _.span({class: 'weeknumber'}, 'w ' + date.getWeek())
                                        ),
                                        _.div({class: 'body'},
                                            _.each(window.resources.milestones, (i, milestone) => {
                                                if(milestone.endDate) {
                                                    let dueDate = new Date(milestone.endDate);

                                                    dueDate.setHours(0);
                                                    dueDate.setMinutes(0);
                                                    dueDate.setSeconds(0);

                                                    if(dueDate.valueOf() == date.valueOf()) {
                                                        return new PlanItemEditor({
                                                            model: milestone,
                                                        }).$element;
                                                    }
                                                }
                                            }),
                                            _.button({class: 'btn-transparent'},
                                                _.span({class: 'fa fa-plus'})
                                            ).click(() => { this.onClickAddMilestone(date); })
                                        )
                                    );
                                }
                            }

                            return $date;
                        })
                    )
                );  
            })
        ),
        _.if(this.getUndatedMilestones().length > 0,
            _.div({class: 'undated'},
                _.h4('Undated'),
                _.each(this.getUndatedMilestones(), (i, milestone) => {
                    return new PlanItemEditor({
                        model: milestone,
                    }).$element;
                })
            )
        )
    );
}
