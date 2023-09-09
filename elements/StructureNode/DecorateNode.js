const {
    AbstractStructureNode,
} = require("../AbstractNode/AbstractStructureNode.js");

/**
 * @class DecorateNode
 * @description the node for decorate the inner node
 * @extends {AbstractStructureNode}
 */
class DecorateNode extends AbstractStructureNode {
    /**
     * @param {Object} Node - the class tha extend AbstractNode
     * @param {function} decorator - the function that can be used to decorate the data
     */
    constructor(Node, decorator) {
        super(Node);
        this.decorator = decorator; // the decorator of the node , it is a function that can be used to decorate the data , such as add a prefix or suffix
    }

    /**
     * it will return the data of the node object after decorating the data
     * @override
     * @param {String} key
     * @param {Object} value
     * @param {Object} record
     * @param {Object} database
     * @returns
     */
    parseNode(key, value, record, database) {
        // use the decorator node as a decorator to parse the data
        return this.decorator(
            this.data.parseNode(key, value, record, database)
        );
    }
}

module.exports.DecorateNode = DecorateNode;
