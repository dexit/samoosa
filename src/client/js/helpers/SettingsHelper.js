'use strict';

/**
 * A manager for local storage settings
 */
class SettingsHelper {
    /**
     * Set value
     *
     * @param {String} type
     * @param {String} key
     * @param {String} value
     */
    static set(type, key, value) {
        localStorage.setItem('settings:' + type + ':' + key, value);
    }
    
    /**
     * Get value
     *
     * @param {String} type
     * @param {String} key
     * @param {String} defaultValue
     *
     * @returns {String} value
     */
    static get(type, key, defaultValue) {
        let result = localStorage.getItem('settings:' + type + ':' + key);

        if(result === 'null' || result === null || result === undefined) {
            SettingsHelper.set(type, key, defaultValue);

            result = defaultValue || false;
        }
        
        return result;
    }

    /**
     * Sanity check
     *
     * @returns {Boolean} isValid
     */
    static check() {
        if(!SettingsHelper.get('projects','current')) {
            location.hash = '/projects/';
            return false;
        }

        return true;
    }
}

module.exports = SettingsHelper;
