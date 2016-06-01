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
            }
        });
    }
}

InputHelper.init();

module.exports = InputHelper;
