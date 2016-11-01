'use strict';

let currentMilestone = 0;

class ActivityAnalytics extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/ActivityAnalytics');

        this.fetch();
    }

    /**
     * Gets the currently selected milestone
     *
     * @returns {Milestone} Current milestone 
     */
    getCurrentMilestone() {
        return resources.milestones[currentMilestone];
    }

    /**
     * Event: Change milestone picker
     *
     * @param {Number} newIndex
     */
    onChangeMilestonePicker(newIndex) {
        currentMilestone = newIndex;

        this.render();
    }

}

module.exports = ActivityAnalytics;
