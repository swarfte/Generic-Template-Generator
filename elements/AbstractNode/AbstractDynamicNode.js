const { AbstractNode } = require("./AbstractNode.js");

/**
 * @class AbstractDynamicNode
 * @description the abstract class for all dynamic node , it will generate the data according to database (without FK)
 * @extends {AbstractNode}
 * @abstract
 */
class AbstractDynamicNode extends AbstractNode {
    // the abstract class for all dynamic node , it will generate the data according to database (without FK)

    /**
     *
     * @param {String} filename
     * @param {String} attributes
     */
    constructor(filename, attributes) {
        super(null);
        if (this.constructor === AbstractDynamicNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.fileName = filename; // the filename of the table
        this.attributes = attributes; // the attributes of the record
    }

    /**
     *  generate the data according to the record and database
     * @param {Object} record
     * @param {Object} database
     * @abstract
     */
    generateData(record, database) {
        // the function for generating the data , it will be implemented in the subclass
        if (record === undefined || database === undefined) {
            throw new Error("You have to implement the method generateData!");
        }
    }

    /**
     *
     * @param {String} key
     * @param {Object} value
     * @param {Object} record
     * @param {Object} database
     * @returns
     */
    parseNode(key, value, record, database) {
        // we need to generate the data first before get the data
        this.generateData(record, database);
        return this.getData();
    }
}

module.exports.AbstractDynamicNode = AbstractDynamicNode;
