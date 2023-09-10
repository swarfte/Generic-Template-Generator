const { AbstractFixedNode } = require("../AbstractNode/AbstractFixedNode.js");

/**
 * @class NumberNode
 * @description the node for number
 * @extends {AbstractFixedNode}
 */
class NumberNode extends AbstractFixedNode {
    /**
     *
     * @param {any} data
     */
    constructor(data) {
        super(data);
    }

    /**
     * @override
     * @returns {Number} the fixed data of the node
     */
    getData() {
        return Number(super.getData());
    }
}

module.exports.NumberNode = NumberNode;
