const { AbstractFixedNode } = require("../AbstractNode/AbstractFixedNode");

/**
 * @class RandomIntNode
 * @description the node for random int
 * @extends {AbstractFixedNode}
 */
class RandomIntNode extends AbstractFixedNode {
    /**
     * @override
     * @param {Number} min
     * @param {Number} max
     */
    constructor(min, max) {
        super([min, max]);
        this.data = Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * @override
     * @returns {Number} the fixed data of the node
     */
    getData() {
        return Number(super.getData());
    }
}

module.exports.RandomIntNode = RandomIntNode;
