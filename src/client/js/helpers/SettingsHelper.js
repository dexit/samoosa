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
        let prefix = 'settings';

        // Exceptions for types not managed on a project basis
        if(type != 'projects') { 
            prefix = localStorage.getItem('settings:projects:current') + prefix + ':';
        }

        localStorage.setItem(prefix + ':' + type + ':' + key, value);
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
        let prefix = 'settings';

        // Exceptions for types not managed on a project basis
        if(type != 'projects') { 
            prefix = localStorage.getItem('settings:projects:current') + prefix + ':';
        }

        let result = localStorage.getItem(prefix + ':' + type + ':' + key);

        if(
            result === 'null' ||
            result === null ||
            result === undefined ||
            result === 'undefined' ||
            typeof result === 'undefined'
        ) {
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
        // If for some reason no project is specified, return to the projects panel
        if(!SettingsHelper.get('projects','current') && !Router.params.project) {
            location.hash = '/projects/';
            return false;
        }

        // Set current view to preferred
        SettingsHelper.set(
            'view',
            'default',
            location.hash
                .replace('/' + Router.params.project, '')
                .replace('#', '')
        );

        // Clear resource cache if needed
        if(SettingsHelper.get('projects', 'current') != Router.params.project) {
            resources = {};
        }

        // Set current project setting
        SettingsHelper.set('projects', 'current', Router.params.project);
        
        // Set head title tag
        $('head title').html(Router.params.project + ' - Mondai');

        return true;
    }
}

module.exports = SettingsHelper;
