'use strict';

class PlanEditor extends View {
    constructor(params) {
        super(params);

        this.init();
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
                number: 1
            },
            { 
                name: 'february',
                number: 2
            },
            { 
                name: 'march',
                number: 3
            },
            { 
                name: 'april',
                number: 4
            },
            { 
                name: 'may',
                number: 5
            },
            { 
                name: 'june',
                number: 6
            },
            { 
                name: 'july',
                number: 7
            },
            { 
                name: 'august',
                number: 8
            },
            { 
                name: 'september',
                number: 9
            },
            { 
                name: 'october',
                number: 10
            },
            { 
                name: 'november',
                number: 11
            },
            { 
                name: 'december',
                number: 12
            }
        ];
    }

    getDates(year, month) {
        let dates = [];
        
        for(let i = 1; i < 31; i++) {
            let day = i.toString();

            if(day.length == 1) {
                day = '0' + day;
            }

            dates.push(year + '-' + month + '-' + day); 
        }
        
       return dates; 
    }

    render() {
        this.$element = _.div({class: 'plan-editor'},
            _.div({class: 'years'},
                _.each(this.getYears(), (i, year) => {
                    return _.button({class: 'year'}, year.number);
                })
            ),
            _.div({class: 'months'},
                _.each(this.getMonths(), (i, month) => {
                    return _.button({class: 'month'}, month.name);
                })
            ),
            _.div({class: 'dates'},
                _.each(this.getDates('2016', '06'), (i, date) => {
                    return _.div({class: 'date', 'data-date': date});
                })
            )
        );
    }
}

module.exports = PlanEditor;
