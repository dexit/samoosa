'use strict';

// Floor date extension
Date.prototype.floor = function() {
    this.setHours(0, 0, 0, 0);

    return this;
};

// Date week number extension
Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    
    date.floor();
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    
    var week1 = new Date(date.getFullYear(), 0, 4);
    
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

// Date day name extension
Date.prototype.getDayName = function() {
    var weekday = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    return weekday[this.getDay()]; 
};

// Date month name extension
Date.prototype.getMonthName = function() {
    var month = [
        'January',    
        'February',    
        'March',    
        'April',    
        'May',    
        'June',    
        'July',    
        'August',    
        'September',    
        'October',    
        'November',    
        'December'
    ];

    return month[this.getMonth()]; 
};

// Pretty name
window.prettyName = function(name) {
    let prettyName = name;

    for(let i in prettyName) {
        if(i == 0) {
            prettyName = prettyName.substring(0,1).toUpperCase() + prettyName.substring(1);

        } else if(prettyName[i] == prettyName[i].toUpperCase()) {
            prettyName = prettyName.substring(0, i) + ' ' + prettyName.substring(i);
        
        }
    }

    return prettyName;
};

// Spinner
window.spinner = function(active) {
    $('.spinner-backdrop').remove();
       
    if(active) { 
        $('body').append(
            _.div({class: 'spinner-backdrop'},
                _.div({class: 'spinner-container'},
                    _.span({class: 'spinner-icon fa fa-refresh'})
                )
            )
        );
    }
};

// Scroll on page
window.scroll = function(amount) {
    let current = $(document).scrollTop();

    $(document).scrollTop(current + amount);
}

