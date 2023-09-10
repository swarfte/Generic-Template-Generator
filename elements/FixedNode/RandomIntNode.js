const { AbstractFixedNode } = require("../AbstractNode/AbstractFixedNode");
const { AbstractNode } = require("../AbstractNode/AbstractNode");

/**
 * @class RandomIntNode
 * @description the node for random int
 * @extends {AbstractFixedNode}
 */
class RandomIntNode extends AbstractFixedNode {
    /**
     * @override
     * @param {Number | AbstractNode} min
     * @param {Number | AbstractNode} max
     */
    constructor(min, max) {
        super([min, max]);
        let tempMin = min;
        let tempMax = max;

        if (tempMin instanceof AbstractNode) {
            tempMin = tempMin.parseNode("fixed", tempMin, {}, {});
        }
        if (tempMax instanceof AbstractNode) {
            tempMax = tempMax.parseNode("fixed", tempMax, {}, {});
        }
        tempMin = Number(tempMin);
        tempMax = Number(tempMax);

        if (typeof tempMin !== "number" || typeof tempMax !== "number") {
            throw new Error("RandomFloatNode: the min and max must be number");
        }
        this.data =
            Math.floor(Math.random() * (tempMax - tempMin + 1)) + tempMin;
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
