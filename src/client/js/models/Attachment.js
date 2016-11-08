'use strict';

class Attachment {
    constructor(properties) {
        properties = properties || {};

        this.timestamp = properties.timestamp || Date.now();
        this.name = properties.name;
        this.base64 = properties.base64;
        this.data = properties.data;
        this.url = properties.url;
    }

    /**
     * Gets the timestamp
     *
     * @returns {Date} Timestamp
     */
    getTimestamp() {
        if(!this.timestamp) { return null; }

        let date;

        if(!isNaN(this.timestamp)) {
            date = new Date(parseInt(this.timestamp));
        
        } else {
            date = new Date(this.timestamp);

        }

        if(!date || isNaN(date.getTime())) { return null; }

        return date;
    }

    /**
     * Gets the name
     *
     * @returns {String} Name
     */
    getName() {
        return this.name;
    }
    
    /**
     * Gets the URL
     *
     * @returns {String} URL
     */
    getURL() {
        return this.url;
    }
    
    /**
     * Gets the base64 string
     *
     * @returns {String} Name
     */
    getBase64() {
        if(!this.data && !this.base64) { return null; }
        
        if(this.base64) { return this.base64; }
        
        return btoa(this.data);
    }
}

module.exports = Attachment;