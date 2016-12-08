'use strict';

// The idle timeout is 10 minutes
const IDLE_TIMEOUT = 600;

let idleTimer = 0;

/**
 * A helper module for input events
 *
 * @class InputHelper
 */
class InputHelper {
    static init() {
        // Register keydown events
        $(document).keydown((e) => {
            InputHelper.poke(); 
        });
        
        // Register keyup events
        $(document).keyup((e) => {
            switch(e.which) {
                case 27:
                    IssueEditor.cancelMultiSelect();
                    break;
            }
        });

        // Register mousedown event
        $(document).mousedown((e) => {
            let $target = $(e.target);

            // Handle multi-select cancel event
            if($target.parents('.issue-editor').length < 1 && !$target.hasClass('issue-editor')) {
                IssueEditor.cancelMultiSelect();
            }

            // Reset the idle timer
            InputHelper.poke(); 
        });

        // Register idle timer
        setInterval(() => {
            this.incrementIdleTimer();
        }, 1000);
    }

    /**
     * Increments the idle timer
     */
    static incrementIdleTimer() {
        idleTimer++;

        if(idleTimer >= IDLE_TIMEOUT) {
            idleTimer = 0;

            // Do something after idle timeout
        }
    }
    
    /**
     * Resets the idle timer
     */
    static poke() {
        idleTimer = 0;
    }

    /**
     * Gets the current idle timer
     *
     * @returns {Number} timer
     */
    static getIdleTimer() {
        return idleTimer;
    }
}

InputHelper.init();

module.exports = InputHelper;
