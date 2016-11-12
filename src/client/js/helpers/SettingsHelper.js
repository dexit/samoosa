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
     * @param {Boolean} stringify
     */
    static set(type, key, value, stringify) {
        let prefix = 'settings';

        // Exceptions for types not managed on a repository basis
        if(type != 'repositories') { 
            prefix = localStorage.getItem('settings:repositories:current') + prefix + ':';
        }

        if(stringify) {
            value = JSON.stringify(value);
        }

        localStorage.setItem(prefix + ':' + type + ':' + key, value);
    }
    
    /**
     * Get value
     *
     * @param {String} type
     * @param {String} key
     * @param {String} defaultValue
     * @param {Boolean} parse
     *
     * @returns {String} value
     */
    static get(type, key, defaultValue, parse) {
        let prefix = 'settings';

        // Exceptions for types not managed on a repository basis
        if(type != 'repositories') { 
            prefix = localStorage.getItem('settings:repositories:current') + prefix + ':';
        }

        let result = localStorage.getItem(prefix + ':' + type + ':' + key);

        if(
            result === 'null' ||
            result === null ||
            result === undefined ||
            result === 'undefined' ||
            typeof result === 'undefined'
        ) {
            SettingsHelper.set(type, key, defaultValue, parse);

            result = defaultValue || false;
        }
        
        if(parse) {
            try {
                result = JSON.parse(result);
            } catch(e) {
                debug.log(e.message, this);
            }
        }

        return result;
    }
}

module.exports = SettingsHelper;
