/**
 * @class AbstractNode
 * @description the abstract class for all node
 * @abstract
 */
class AbstractNode {
    constructor(data) {
        if (this.constructor === AbstractNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.data = data; // the data of the node
    }

    /**
     * get the data of the node
     * @returns {Object} the data of the node
     */
    getData() {
        return this.data;
    }
    /**
     * the main function of the node , it is used to parse the data according to the node
     * @param {String} key - the attribute name of the template
     * @param {Object} value - the node of the template
     * @param {Object} record - the record of the primary table
     * @param {Object} database - contains all the records of all tables
     * @abstract
     * @returns {any} the data which is parsed by the node
     */
    parseNode(key, value, record, database) {
        if (
            key === undefined ||
            value === undefined ||
            record === undefined ||
            database === undefined
        ) {
            throw new Error("You have to implement the method parseNode!");
        }
    }
}

module.exports.AbstractNode = AbstractNode;
