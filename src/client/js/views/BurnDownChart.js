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
     * Gets the currently selected milestone
     *
     * @returns {Milestone} Current milestone 
     */
    getCurrentMilestone() {
        return resources.milestones[currentMilestoneIndex];
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
        let divider = totalDays - 1;
        if(divider < 1) { divider = 1; }
        let optimalDecline = totalHours / divider;

        let currentHours = totalHours;

        for(let day = 0; day < totalDays; day++) {
            optimalHours[optimalHours.length] = currentHours;

            currentHours -= optimalDecline;
        }

        return optimalHours;
    }
}

module.exports = BurnDownChart;
