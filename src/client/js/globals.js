'use strict';

// Convert to HTML from markdown
window.markdownToHtml = function(string) {
    if(string) {
        try {
            return marked(string);

        } catch(e) {
            console.log(e);
        
        }
    }
};

// Floor date extension
Date.prototype.floor = function() {
    this.setHours(0, 0, 0, 0);

    return this;
};

// Get ISO day
Date.prototype.getISODay = function() {
    let day = this.getDay() - 1;

    if(day < 0) {
        day = 6;
    }   

    return day;
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

// Pretty date
window.prettyDate = function(date, separator) {
    let prettyDate = '';

    if(date) {
        if(date.constructor === String) {
            date = new Date(date);
        }

        date.floor();

        separator = separator || '.';

        prettyDate = date.getFullYear() + separator + (date.getMonth() + 1) + separator + date.getDate();
    }

    return prettyDate;
}

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

