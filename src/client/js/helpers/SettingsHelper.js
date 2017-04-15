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

    /**
     * Adds a repository to the "latest" setting
     *
     * @param {String} user
     * @param {String} repo
     */
    static addToLatestRepositories(user, repo) {
        let latest = SettingsHelper.getLatestRepositories();

        // The repo was already in the "latest" list
        if(latest.indexOf(user + '/' + repo) > -1) { return; }

        latest.unshift(user + '/' + repo);

        // If there is more than 3 repos in the list, remove the last one
        if(latest.length > 3) {
            latest.splice(-1, 1);
        }

        SettingsHelper.set('repositories', 'latest', latest.join(':'));
    }
    
    /**
     * Clears the latest repositories
     */
    static clearLatestRepositories() {
        return SettingsHelper.set('repositories', 'latest', '');
    }

    /**
     * Gets an array of the latest repositories
     *
     * @returns {Array} Latest repositories
     */
    static getLatestRepositories() {
        let latest = (SettingsHelper.get('repositories', 'latest') || '');

        if(!latest) { return []; }

        return latest.split(':');
    }
}

module.exports = SettingsHelper;
