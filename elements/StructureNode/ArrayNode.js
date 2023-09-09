const {
    AbstractStructureNode,
} = require("../AbstractNode/AbstractStructureNode.js");

/**
 * @class ArrayNode
 * @description the node for array
 * @extends {AbstractStructureNode}
 */
class ArrayNode extends AbstractStructureNode {
    /**
     * @param {Array} data
     */
    constructor(data) {
        super(data);
    }

    /**
     * it will return the data of the node array
     * @override
     * @param {String} key
     * @param {Object} value
     * @param {Object} record
     * @param {Object} database
     * @returns
     */
    parseNode(key, value, record, database) {
        // use the for loop to parse the data
        const result = [];
        for (const element of this.data) {
            result.push(element.parseNode(key, value, record, database));
        }
        return result;
    }
}

module.exports.ArrayNode = ArrayNode;
