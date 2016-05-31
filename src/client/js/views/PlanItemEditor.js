'use strict';

class PlanItemEditor extends View {
    constructor(params) {
        super(params);

        this.template = require('../templates/PlanItemEditor');

        this.fetch();

        setTimeout(() => {
            this.updatePosition();
        }, 1);
    }

    updatePosition() {
        let date = new Date(this.model.due_on);
        let yearString = date.getFullYear().toString();
        let monthString = ((date.getMonth() + 1).toString().length == 1 ? '0' : '') + (date.getMonth() + 1);
        let dayString = (date.getDate().toString().length == 1 ? '0' : '') + date.getDate();
        let dateString = yearString + '-' + monthString + '-' + dayString;

        $('.date[data-date="' + dateString + '"]').append(this.$element);
        
        console.log($('.date[data-date="' + dateString + '"]').length);
    }
}

module.exports = PlanItemEditor;
