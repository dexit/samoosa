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
     * Gets the start date
     *
     * @returns {Date} Start date
     */
    getStartDate() {
        let date = new Date(this.startDate);

        if(!this.startDate || !date || isNaN(date.getTime())) {
            return null;
        
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
        let date = new Date(this.endDate);

        if(!this.endDate || !date || isNaN(date.getTime())) {
            return null;
        
        } else {
            return date;
                
        }
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
            
            if(issue.getMilestone() == this) {
                issues[issues.length] = issue;
            }
        }

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

        if(isNaN(start) || isNaN(end)) { return 0; }

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

            total += issue.getEstimate();
        }

        return total;
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

        for(let issue of this.getIssues()) {
            let closedDate = issue.getClosedDate();

            if(!closedDate) {
                issues[issues.length] = issue;
            
            } else {
                let startDate = this.getStartDate();
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
            hours += issue.getEstimate();
        }

        return hours;
    }
}

module.exports = Milestone;
