'use strict';

class SettingsHelper {
    static set(type, key, value) {
        localStorage.setItem('settings:' + type + ':' + key, value);
    }
    
    static get(type, key) {
        return localStorage.getItem('settings:' + type + ':' + key);
    }
}

module.exports = SettingsHelper;
