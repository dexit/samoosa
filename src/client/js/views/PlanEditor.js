'use strict';

class PlanEditor extends View {
    constructor(params) {
        super(params);

        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth() + 1;

        if(this.currentMonth.length == 1) {
            this.currentMonth = '0' + this.currentMonth;
        }
            
        this.template = require('../templates/PlanEditor');

        this.init();
    }
   
    onClickYear(year) {
        this.currentYear = parseInt(year);

        this.render();
    }

    onClickMonth(month) {
        this.currentMonth = parseInt(month);

        this.render();
    }

    updateUndatedBox() {
        if(this.getUndatedMilestones().length < 1) {
            $('.plan-editor .undated').remove();
        }
    }

    getUndatedMilestones() {
        let milestones = [];
        
        for(let milestone of resources.milestones) {
            if(!milestone) { continue; }

            if(!milestone.endDate) {
                milestones.push(milestone);
            }
        }

        return milestones;
    }

    getYears() {
        let years = [];

        for(let i = new Date().getFullYear() - 2; i < new Date().getFullYear() + 4; i++) {
            years.push({
                number: i
            });
        }

        return years;
    }

    getMonths() {
        let months = [];

        for(let i = 1; i <= 12; i++) {
            let num = i.toString();

            if(num.length == 1) {
                num = '0' + num;
            }

            months.push({
                name: new Date('2016-' + num + '-01').getMonthName(),
                number: i
            });
        }

        return months;
    }

    getWeekDays() {
        let weekdays = [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday'
        ];

        return weekdays;
    }

    onClickAddMilestone(date) {
        if(ApiHelper.isSpectating()) {
            return;
        }
        
        spinner(true);

        ResourceHelper.addResource('milestones', {
            title: 'New milestone',
            endDate: date.toISOString()
        })
        .then(() => {
            this.render();

            spinner(false);
        });
    }

    getWeeks() {
        let weeks = [];
        let firstDay = new Date(this.currentYear, this.currentMonth, 1);
        let firstWeek = firstDay.getWeek();

        for(let date of this.getDates()) {
            if(weeks.indexOf(date.getWeek()) < 0) {
                weeks.push(date.getWeek());
            }
        }

        return weeks; 
    }

    getDates() {
        let year = this.currentYear;
        let month = this.currentMonth;
        let dates = [];

        for(let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
            let day = i;
            let date = new Date();
            
            date.setYear(year);
            date.setMonth(month - 1);
            date.setDate(day);

            dates.push(date); 
        }

        return dates; 
    }

    getDate(week, weekday) {
        for(let date of this.getDates()) {
            if(date.getWeek() == week && date.getISODay() == weekday) {
                return date;
            }
        } 
    }

    iterateDates(renderFunction) {
        let weekdays = this.getWeekDays();
        let weeks = this.getWeeks();
        
        let renders = [];

        for(let y = 0; y < 6; y++) {
            for(let x = 0; x < 7; x++) {
                let weekday = weekdays[x];
                let week = weeks[y];
                
                if(week && weekday) {
                    let date = this.getDate(week, x);

                    renders.push(renderFunction(date));
                
                } else {
                    renders.push(renderFunction());
                
                }   
            }
        }

        return renders;
    }
}

module.exports = PlanEditor;
