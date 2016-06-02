'use strict';

class InputHelper {
    static init() {
        // Register keydown events
        $(document).keydown((e) => {
            switch(e.which) {
                case 16:
                    this.isShiftDown = true;
                    break;
            }
        });
        
        // Register keyup events
        $(document).keyup((e) => {
            switch(e.which) {
                case 16:
                    this.isShiftDown = false;
                    break;

                case 27:
                    IssueEditor.cancelMultiSelect();
                    break;
            }
        });
    }
}

InputHelper.init();

module.exports = InputHelper;
