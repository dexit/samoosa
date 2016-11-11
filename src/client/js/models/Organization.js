'use strict';

class Organization {
    constructor(properties) {
        properties = properties || {};

        this.id = properties.id;
        this.index = properties.index;
        this.name = properties.name;
        this.description = properties.description;
    }
}

module.exports = Organization;
