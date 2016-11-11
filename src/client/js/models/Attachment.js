'use strict';

class Attachment {
    constructor(properties) {
        properties = properties || {};

        this.timestamp = properties.timestamp || Date.now();
        this.name = properties.name;
        this.base64 = properties.base64;
        this.url = properties.url;
        this.headers = properties.headers;
        this.file = properties.file;
        this.isRedirect = properties.isRedirect || false;
    }

    /**
     * Check is attachment is an image
     *
     * @returns {Boolean} Is image
     */
    isImage() {
        if(this.headers) {
            return this.headers.indexOf('image/') > -1; 
        }

        if(this.url) {
            return this.url.match(/\.(png|jpg|bmp|gif)/) != null;
        }

        return false;
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
     * @returns {String} Base64
     */
    getBase64() {
        return this.base64;
    }
}

module.exports = Attachment;
