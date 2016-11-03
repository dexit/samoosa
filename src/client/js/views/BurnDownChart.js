'use strict';

// Private
let currentMilestoneIndex = 0;

class BurnDownChart extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/BurnDownChart');

        this.fetch();
    }

    /**
     * Event: Change milestone picker
     *
     * @param {Number} newIndex
     */
    onChangeMilestonePicker(newIndex) {
        currentMilestoneIndex = newIndex;

        this.render();
    }

    /**
     * Sorts milestones by end date
     *
     * @param {Milestone} a
     * @param {Milestone} b
     */
    sortMilestones(a, b) {
        if(a.getEndDate() > b.getEndDate()) {
            return 1;
        }
        
        if(a.getEndDate() < b.getEndDate()) {
            return -1;
        }

        return 0;
    }


    /**
     * Gets the currently selected milestone
     *
     * @returns {Milestone} Current milestone 
     */
    getCurrentMilestone() {
        return resources.milestones[currentMilestoneIndex];
    }

    /**
     * Gets the actual hours remaining
     *
     * @returns {Array} Actual hours by day
     */
    getActualHours() {
        let milestone = this.getCurrentMilestone();
        let actualHours = [];

        if(!milestone) { return actualHours; }

        let totalDays = milestone.getTotalDays();

        for(let day = 0; day <= totalDays; day++) {
            actualHours[actualHours.length] = milestone.getRemainingEstimatedHoursAtDay(day);
        }

        return actualHours;
    }

    /**
     * Gets the optimal hours remaining
     *
     * @returns {Array} Optimal hours by day
     */
    getOptimalHours() {
        let milestone = this.getCurrentMilestone();
        let optimalHours = [];

        if(!milestone) { return optimalHours; }

        let totalDays = milestone.getTotalDays();
        let totalHours = milestone.getTotalEstimatedHours();
        let divider = totalDays;
        if(divider < 1) { divider = 1; }
        let optimalDecline = totalHours / divider;

        let currentHours = totalHours;

        for(let day = 0; day <= totalDays; day++) {
            optimalHours[optimalHours.length] = currentHours;

            currentHours -= optimalDecline;
        }

        return optimalHours;
    }
}

module.exports = BurnDownChart;
