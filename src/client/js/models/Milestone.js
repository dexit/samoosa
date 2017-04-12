'use strict';

/**
 * The data modle for milestones
 */
class Milestone {
    constructor(properties) {
        properties = properties || {};

        // Essential properties
        this.title = properties.title;
        this.description = properties.description;
        this.id = properties.id;
        this.index = properties.index;

        // Optional properties
        this.startDate = properties.startDate;
        this.endDate = properties.endDate;
    }

    /**
     * Finds the start date based on the first created issue
     */
    findStartDate() {
        if(this.startDate) { return new Date(this.startDate); }

        let earliest;

        for(let issue of this.getIssues()) {
            if(issue.getCreatedDate()) {
                if(!earliest) {
                    earliest = issue;
                
                } else if(issue.getCreatedDate() < earliest.getCreatedDate()) {
                    earliest = issue;

                }
            }
        }

        if(earliest) {
            this.startDate = earliest.createdAt;

            return new Date(this.startDate);

        } else {
            debug.log('Could not find start date for milestone "' + this.title + '"', this);
            return;
        
        }
    }

    /**
     * Gets the start date
     *
     * @returns {Date} Start date
     */
    getStartDate() {
        let date;
       
        if(!isNaN(this.startDate)) {
            date = new Date(parseInt(this.startDate));
        } else {
            date = new Date(this.startDate);
        }

        if(!this.startDate || !date || isNaN(date.getTime())) {
            return this.findStartDate();
        
        } else {
            return date;
                
        }
    }
    
    /**
     * Gets the end date
     *
     * @returns {Date} End date
     */
    getEndDate() {
        let date;
       
        if(!isNaN(this.endDate)) {
            date = new Date(parseInt(this.endDate));
        } else {
            date = new Date(this.endDate);
        }

        if(!this.endDate || !date || isNaN(date.getTime())) {
            return null;
        
        } else {
            return date;
                
        }
    }

    /**
     * Gets a changelog printout
     *
     * @returns {String} Changelog
     */
    getChangeLog() {
        let log = '';

        for(let issue of this.getIssues()) {
            log += '- [' + issue.getType() + '] ' + issue.title + '  \n';
        }

        return log;
    }

    /**
     * Gets a list of all issues under this milestone
     *
     * @returns {Array} Issues
     */
    getIssues() {
        let issues = [];

        for(let issue of resources.issues || []) {
            if(!issue) { continue; }
            
            if(issue.getMilestone() == this || (typeof this.index === 'undefined' && typeof issue.milestone === 'undefined')) {
                issues[issues.length] = issue;
            }
        }

        issues.sort((a, b) => {
            if(a.id < b.id) {
                return -1;
            }
            
            if(a.id > b.id) {
                return 1;
            }
            
            return 0;
        });

        return issues;
    }
    
    /**
     * Gets the total amount of days
     *
     * @returns {Number} Days
     */
    getTotalDays() {
        let start = this.getStartDate();
        let end = this.getEndDate();

        if(!start || !end) { return 0; }

        let timeDiff = Math.abs(start.getTime() - end.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

        return diffDays;
    }

    /**
     * Gets the total of issue estimates in hours
     *
     * @returns {Number} Hours
     */
    getTotalEstimatedHours() {
        let total = 0;

        for(let issue of this.getIssues()) {
            if(!issue) { continue; }

            total += issue.getEstimatedHours();
        }

        return total;
    }

    /**
     * Gets remaining data
     *
     * @returns {Object} Data
     */
    getRemainingData() {
        let data = {
            issues: 0,
            hours: 0
        };

        for(let issue of this.getIssues()) {
            if(!issue.isClosed()) {
                data.issues++;
                data.hours += issue.getEstimatedHours();
            }
        }

        return data;
    }
    
    /**
     * Gets a list of completed
     */
    getCompletedIssues() {
        let issues = []; 
        
        for(let issue of this.getIssues()) {
            if(issue.isClosed()) {
                issues.push(issue);
            }            
        }

        return issues;
    }

    /**
     * Get percent complete
     *
     * @returns {Number} percent
     */
    getPercentComplete() {
        let total = this.getIssues();
        let completed = this.getCompletedIssues();
        let percentage = 0;

        let totalHours = 0;
        let completedHours = 0;

        for(let i in total) {
            totalHours += total[i].getEstimatedHours();
        }
        
        for(let i in completed) {
             completedHours += completed[i].getEstimatedHours();
        }

        if(total.length > 0 && completed.length > 0) {
            percentage = (completed.length / total.length) * 100;
        }

        return percentage;
    }

    /**
     * Gets remaining issues at day
     *
     * @param {Number} day
     *
     * @returns {Array} Issues
     */
    getRemainingIssuesAtDay(day) {
        let issues = [];

        let startDate = this.getStartDate();

        if(!startDate) { return issues; }

        for(let issue of this.getIssues()) {
            let closedDate = issue.getClosedDate();

            if(!closedDate) {
                issues[issues.length] = issue;
            
            } else {
                let timeDiff = Math.abs(startDate.getTime() - closedDate.getTime());
                let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

                if(diffDays > day + 1) {
                    issues[issues.length] = issue;
                }

            }
        }

        return issues;
    }

    /**
     * Gets hours left at day
     *
     * @param {Number} day
     *
     * @returns {Number} Estimated hours left
     */
    getRemainingEstimatedHoursAtDay(day) {
        let hours = 0;

        for(let issue of this.getRemainingIssuesAtDay(day)) {
            hours += issue.getEstimatedHours();
        }

        return hours;
    }
}

module.exports = Milestone;
