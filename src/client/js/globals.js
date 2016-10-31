'use strict';

// Get source
window.getSource = function getSource() {
    let source = localStorage.getItem('source');
    
    if(!source && Router.query('source')) {
        source = Router.query('source');
    }

    return source;
}

// Convert to HTML from markdown
window.markdownToHtml = function(string) {
    if(string) {
        try {
            let html = marked(string);

            html = html.replace(/\[ \]/g, '<input type="checkbox" disabled readonly>');
            html = html.replace(/\[x\]/g, '<input type="checkbox" checked="checked" disabled readonly>');

            return html;

        } catch(e) {
            console.log(e);
        
        }
    }
};

// Get cookie by name
window.getCookie = function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    
    if (parts.length == 2) return parts.pop().split(";").shift();
};

// Set cookie by name
window.setCookie = function setCookie(name, value) {
    document.cookie = name + '=' + value;
}

// Simple date string
Date.prototype.getSimpleString = function() {
    return this.getFullYear() + '-' + (this.getMonth() + 1) + '-' + this.getDate();
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

// Sort array by date
window.sortByDate = function(array, key) {
    return array.concat().sort((a, b) => {
        a = new Date(a[key]).floor();
        b = new Date(b[key]).floor();

        if(a < b) {
            return -1;
        }
        
        if(a > b) {
            return 1;
        }

        return 0;
    });
}
