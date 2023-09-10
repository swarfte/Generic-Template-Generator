const { AbstractFixedNode } = require("../AbstractNode/AbstractFixedNode.js");
/**
 * @class StringNode
 * @description the node for string
 * @extends {AbstractFixedNode}
 */
class StringNode extends AbstractFixedNode {
    /**
     *
     * @param { any } data
     */
    constructor(data) {
        super(data);
    }
    /**
     * @override
     * @returns {String} the fixed data of the node
     */
    getData() {
        return String(super.getData());
    }
}

module.exports.StringNode = StringNode;
