const { AbstractFixedNode } = require("../AbstractNode/AbstractFixedNode");

/**
 * @class RandomFloatNode
 * @description the node for random float
 * @extends {AbstractFixedNode}
 */
class RandomFloatNode extends AbstractFixedNode {
    /**
     * @override
     * @param {Number} min
     * @param {Number} max
     */
    constructor(min, max) {
        super([min, max]);
        this.data = Math.random() * (max - min) + min;
    }

    /**
     * @override
     * @returns {Number} the fixed data of the node
     */
    getData() {
        return Number(super.getData());
    }
}

module.exports.RandomFloatNode = RandomFloatNode;
