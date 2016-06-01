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

    onClickAddMilestone(date) {
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

    getDates(year, month) {
        let dates = [];

        for(let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
            let day = i.toString();

            if(day.length == 1) {
                day = '0' + day;
            }
            
            if(month.toString().length == 1) {
                month = '0' + month;
            }

            let date = new Date(year + '-' + month + '-' + day).floor();

            dates.push(date); 
        }

        return dates; 
    }
}

module.exports = PlanEditor;
