const { AbstractNode } = require("./AbstractNode.js");
/**
 * @abstract
 * @class AbstractFixedNode
 * @description the abstract class for all fixed node
 * @extends {AbstractNode}
 */
class AbstractFixedNode extends AbstractNode {
    constructor(data) {
        super(data);
        if (this.constructor === AbstractFixedNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    /**
     * the main function of the node , it is used to parse the data according to the node
     * @override
     * @param {String} key - the attribute name of the template
     * @param {Object} value - the node of the template
     * @param {Object} record - the record of the primary table
     * @param {Object} database - contains all the records of all tables
     * @returns {Object} the fixed data of the node
     */
    parseNode(key, value, record, database) {
        super.parseNode(key, value, record, database);
        return this.getData();
    }
}

module.exports.AbstractFixedNode = AbstractFixedNode;
