const { AbstractStructureNode } = require("./AbstractStructureNode.js");

/**
 * @class ObjectNode
 * @description the node for object
 * @extends {AbstractStructureNode}
 */
class ObjectNode extends AbstractStructureNode {
    /**
     * @param {Object} data
     */
    constructor(data) {
        super(data);
    }
    /**
     * it will return the data of the node object
     * @override
     * @param {String} key
     * @param {Object} value
     * @param {Object} record
     * @param {Object} database
     * @returns
     */
    parseNode(key, value, record, database) {
        // use the [key, value] of the object to parse the data
        const result = {};
        for (const [key, value] of Object.entries(this.data)) {
            result[key] = value.parseNode(key, value, record, database);
        }
        return result;
    }
}

module.exports.ObjectNode = ObjectNode;
