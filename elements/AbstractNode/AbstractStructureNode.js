const { AbstractNode } = require("./AbstractNode.js");

/**
 * @class AbstractStructureNode
 * @description the abstract class for all structure node , it includes another node for parsing the data
 * @extends {AbstractNode}
 * @abstract
 */
class AbstractStructureNode extends AbstractNode {
    constructor(data) {
        super(data);
        if (this.constructor === AbstractStructureNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    /**
     * the main function of the node , it is used to parse the data according to the node
     * @override
     * @param {String} key
     * @param {Object} value
     * @param {Object} record
     * @param {Object} database
     * @returns
     */
    parseNode(key, value, record, database) {
        // override this method in subclass to do some thing that before/ after parsing the data, or modify the data
        return this.data.parseNode(key, value, record, database);
    }
}

module.exports.AbstractStructureNode = AbstractStructureNode;
