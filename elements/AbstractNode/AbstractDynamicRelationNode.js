const { AbstractDynamicNode } = require("./AbstractDynamicNode.js");

/**
 * @class AbstractDynamicRelationNode
 * @description the abstract class for all dynamic relation node , it will generate the data according to the record and the reference table (include FK)
 * @extends {AbstractDynamicNode}
 * @abstract
 */
class AbstractDynamicRelationNode extends AbstractDynamicNode {
    // the abstract class for all dynamic relation node , it will generate the data according to the record and the reference table (include FK)

    /**
     *
     * @param {String} filename
     * @param {String} attributes
     */
    constructor(filename, attributes) {
        super(filename, attributes);
        if (this.constructor === AbstractDynamicRelationNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.sorted = false; // whether the table is sorted
    }

    /**
     *  the function for initializing the sorted database
     * @param {String} attribute
     * @returns
     */
    sortMethod(attribute) {
        // the sort method for the sorted database
        return (a, b) => {
            if (typeof a[attribute] == "string") {
                return a[attribute].localeCompare(b[attribute]);
            }
            if (typeof a[attribute] == "number") {
                return a[attribute] - b[attribute];
            }
        };
    }

    /**
     *  the function for initializing the sorted database
     * @param {Object} record
     * @param {Object} database
     * @abstract
     */
    InitializedSortedDatabase(record, database) {
        if (record === undefined || database === undefined) {
            throw new Error("record or database is undefined");
        }
        // the function for initializing the sorted database
    }

    /**
     *  the function for initializing the unsorted database
     * @param {Object} record
     * @param {Object} database
     * @abstract
     */
    unsortedSearch(record, database) {
        if (record === undefined || database === undefined) {
            throw new Error("record or database is undefined");
        }
        // the function for searching the data from the unsorted database
    }

    /**
     *  the function for searching the data from the sorted database
     * @param {Object} record
     * @param {Object} database
     * @abstract
     */
    sortedSearch(record, database) {
        if (record === undefined || database === undefined) {
            throw new Error("record or database is undefined");
        }
        // the function for searching the data from the sorted database
    }

    /**
     *  the function for generating the data
     * @param {Object} record
     * @param {Object} database
     */
    generateData(record, database) {
        // we need to search the data first before get the data
        this.data = this.sorted
            ? this.sortedSearch(record, database)
            : this.unsortedSearch(record, database);
    }
}

module.exports.AbstractDynamicRelationNode = AbstractDynamicRelationNode;
