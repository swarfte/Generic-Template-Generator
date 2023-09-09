const {
    AbstractStructureNode,
} = require("../AbstractNode/AbstractStructureNode.js");

/**
 * @class ConcatenateNode
 * @description the node for concatenate tow or more nodes as a string
 * @extends {AbstractStructureNode}
 */
class ConcatenateNode extends AbstractStructureNode {
    /**
     * @param {Array} data
     */
    constructor(data) {
        super(data);
    }

    /**
     * it will return the data that combine the data of the node array
     * @override
     * @param {String} key
     * @param {Object} value
     * @param {Object} record
     * @param {Object} database
     * @returns
     */
    parseNode(key, value, record, database) {
        // use the for loop to parse the data and concatenate them
        const result = [];
        for (const element of this.data) {
            result.push(element.parseNode(key, value, record, database));
        }
        return result.join("");
    }
}

module.exports.ConcatenateNode = ConcatenateNode;
