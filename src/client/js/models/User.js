'use strict';

let current;

/**
 * The data model for the user
 */
class User {
    constructor(properties) {
        properties = properties || {};
        
        // Essential properties
        this.name = properties.name;
        this.id = properties.id;
        this.avatar = properties.avatar;

        current = this;
    }

    /**
     * Gets the current user
     *
     * @return {User} Current user
     */
    static getCurrent() {
        return current;
    }
}

module.exports = User;
