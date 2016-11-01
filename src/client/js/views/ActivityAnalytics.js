'use strict';

class ActivityAnalytics extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/ActivityAnalytics');

        this.fetch();
    }
}

module.exports = ActivityAnalytics;
