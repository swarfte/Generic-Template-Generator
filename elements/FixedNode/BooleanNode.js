const { AbstractFixedNode } = require("../AbstractNode/AbstractFixedNode.js");

/**
 * @class BooleanNode
 * @description the node for boolean
 * @extends {AbstractFixedNode}
 */
class BooleanNode extends AbstractFixedNode {
    /**
     *
     * @param {any} data
     */
    constructor(data) {
        super(data);
    }
    /**
     * @override
     * @returns {Boolean} the fixed data of the node
     */
    getData() {
        return Boolean(super.getData());
    }
}

module.exports.BooleanNode = BooleanNode;
