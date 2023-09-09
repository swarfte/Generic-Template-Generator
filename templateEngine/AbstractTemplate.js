/**
 * the abstract class of template
 * @class
 * @abstract
 */
class AbstractTemplate {
    // the abstract class of template
    /**
     * the template config
     * @type {Object}
     * @property {Object} source - the source files
     * @property {string} primaryTable - the primary table of this template
     * @static
     * @memberof AbstractTemplate
     * @example
     * static templateConfig = {
        source: {
            patient: "patients.csv",
            transfer: "transfers.csv",
        },
        primaryTable: "patient",
    };
     */
    static templateConfig = {
        // override the config by the custom template
        source: {}, // include all the source files , nickname : filename(only the filename and file extension)
        primaryTable: "", // the primary table of this template
    };

    static sortedDatabase = {
        // the sorted database
    };

    constructor() {
        if (this.constructor === AbstractTemplate) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        // write the template here (this.attributeName = new Node() ...)
    }
}

module.exports = {
    AbstractTemplate,
};
