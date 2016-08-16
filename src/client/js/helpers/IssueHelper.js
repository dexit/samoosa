'use strict';

/**
 * A tool for performing Issue related operations
 */
class IssueHelper {
    /**
     * Find an issue by a query
     *
     * @param {String} query
     * @param {Number} max
     *
     * @returns {Array(Issue)}
     */
    static search(query, max) {
        let results = [];
        let found = 0;

        for(let i = 0; i < resources.issues.length; i++) {
            let string = JSON.stringify(resources.issues[i]).toLowerCase();

            if(string.search(query.toLowerCase()) > -1) {
                results[results.length] = resources.issues[i];
                found++;

                if(found >= max) {
                    break;
                }
            }
        }

        return results;
    }
}

module.exports = IssueHelper;
