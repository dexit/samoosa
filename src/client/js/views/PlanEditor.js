'use strict';

class PlanEditor extends View {
    constructor(params) {
        super(params);

        this.currentYear = new Date().getFullYear().toString();
        this.currentMonth = (new Date().getMonth() + 1).toString();

        if(this.currentMonth.length == 1) {
            this.currentMonth = '0' + this.currentMonth;
        }
            
        this.template = require('../templates/PlanEditor');

        this.init();
    }
    
    onClickYear(year) {
        this.currentYear = year;

        this.render();
    }

    onClickMonth(month) {
        this.currentMonth = month;

        this.render();
    }

    getYears() {
        return [
            {
                number: 2015
            },
            {
                number: 2016
            },
            {
                number: 2017
            },
            {
                number: 2018
            },
            {
                number: 2019
            }
        ];
    }

    getMonths() {
        return [
            { 
                name: 'january',
                number: '01'
            },
            { 
                name: 'february',
                number: '02'
            },
            { 
                name: 'march',
                number: '03'
            },
            { 
                name: 'april',
                number: '04'
            },
            { 
                name: 'may',
                number: '05'
            },
            { 
                name: 'june',
                number: '06'
            },
            { 
                name: 'july',
                number: '07'
            },
            { 
                name: 'august',
                number: '08'
            },
            { 
                name: 'september',
                number: '09'
            },
            { 
                name: 'october',
                number: '10'
            },
            { 
                name: 'november',
                number: '11'
            },
            { 
                name: 'december',
                number: '12'
            }
        ];
    }

    onClickAddMilestone(date) {
    }

    getWeeks(year, month) {
        let weeks = [];
        let map = {};

        for(let date of this.getDates(year, month)) {
            let week = date.getWeek();

            // Check if we included this week already
            if(!map[week]) {
                map[week] = true;
                weeks.push(week);
            }
        }

        return weeks;
    }

    getDates(year, month) {
        let dates = [];

        for(let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
            let day = i.toString();

            if(day.length == 1) {
                day = '0' + day;
            }
            
            if(month.length == 1) {
                month = '0' + month;
            }

            let date = new Date(year + '-' + month + '-' + day).floor();

            dates.push(date); 
        }

        return dates; 
    }
}

module.exports = PlanEditor;
