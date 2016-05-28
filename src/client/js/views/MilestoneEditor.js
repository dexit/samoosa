'use strict';

class MilestoneEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/MilestoneEditor');

        this.fetch();
    }

    onClickToggle() {
        this.$element.toggleClass('collapsed');
    }
}

module.exports = MilestoneEditor;
