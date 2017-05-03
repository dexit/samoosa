'use strict';

/**
 * A tool for performing Issue related operations
 */
class IssueHelper {
    /**
     * Find an issue by a query
     *
     * @param {Stringi|Object} query
     * @param {Number} max
     *
     * @returns {Array(Issue)}
     */
    static search(query, max) {
        max = max || 999999;

        let results = [];
        let found = 0;

        for(let i = 0; i < resources.issues.length; i++) {
            // String based search
            if(typeof query === 'string') {
                let string = JSON.stringify(resources.issues[i]).toLowerCase();

                if(string.search(query.toLowerCase()) > -1) {
                    results[results.length] = resources.issues[i];
                    found++;
                }
            
            // Object based search
            } else if (typeof query === 'object') {
                let isMatch = true;

                for(let key of Object.keys(query)) {
                    if(resources.issues[i][key] !== query[key]) {
                        isMatch = false;
                        break;
                    }
                }

                if(isMatch) {
                    results[results.length] = resources.issues[i];
                    found++;
                }
            }

            if(found >= max) {
                break;
            }
        }

        return results;
    }
}

module.exports = IssueHelper;
