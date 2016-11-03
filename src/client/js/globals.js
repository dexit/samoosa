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

            html = html.replace(/@[a-zA-Z0-9-_]+/g, (string) => {
                let typedName = string.replace('@', '');

                for(let collaborator of resources.collaborators || []) {
                    if(!collaborator) { continue; }

                    if(typedName == collaborator.name) {
                        return '<span class="collaborator-reference"><img src="' + collaborator.avatar + '" />' + string + '</span>';
                    }
                }

                return string;
            });

            return html;

        } catch(e) {
            console.log(e);
        
        }
    }
};

// Collapse/expand an HTMLElement
window.toggleExpand = function($element) {
    $element.removeAttr('style');

    let wasExpanded = $element.hasClass('expanded');

    $element.removeClass('expanded');
    $element.addClass('collapsed');
    
    let collapsedHeight = $element.outerHeight();

    $element.removeClass('collapsed');
    $element.addClass('expanded');
    
    let expandedHeight = $element.outerHeight();

    if(!wasExpanded) {
        $element.css('height', collapsedHeight + 'px');
        
        setTimeout(() => {
            $element.css('height', expandedHeight + 'px');
            
            setTimeout(() => {
                $element.removeAttr('style');
                $element.toggleClass('expanded', !wasExpanded);
                $element.toggleClass('collapsed', wasExpanded);
            }, 500);
        }, 50);
    
    } else {
        $element.css('height', expandedHeight + 'px');
        
        setTimeout(() => {
            $element.css('height', collapsedHeight + 'px');
            
            setTimeout(() => {
                $element.removeAttr('style');
                $element.toggleClass('expanded', !wasExpanded);
                $element.toggleClass('collapsed', wasExpanded);
            }, 500);
        }, 50);

    }
}

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

// Get UNIX time
Date.prototype.getUnixTime = function() {
    return this.getTime()/1000|0;
};

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
window.prettyDate = function(inputDate, separator) {
    let date = inputDate;
    let prettyDate = '';

    if(!date) { return prettyDate; }
    
    if(typeof date === 'string' || typeof date === 'number') { date = new Date(date); }

    if(date instanceof Date == false) {
        debug.warning('Date is of incorrect object type (' + typeof inputDate + ')');

        return prettyDate;
    }
    
    if(isNaN(date.getTime())) {
        debug.warning('Date is invalid (' + inputDate + ')');

        return prettyDate;
    }

    date.floor();

    separator = separator || '.';

    prettyDate = date.getFullYear() + separator + (date.getMonth() + 1) + separator + date.getDate();

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

// Displays an error
window.displayError = function(error) {
    if(error instanceof Error == false) { return; }

    let alertString = error.name + '\n\n' + error.message;

    if(error.stack) {
        alertString += '\n\n' + error.stack;
    }

    alert(alertString);

    throw error;
};
