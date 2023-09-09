const { AbstractFixedNode } = require("../AbstractNode/AbstractFixedNode.js");

/**
 * @class DateNode
 * @description the node for date
 * @extends {AbstractFixedNode}
 */
class DateNode extends AbstractFixedNode {
    /**
     * @param {Date} data
     */
    constructor(data) {
        super(data);
    }

    /**
     * @override
     * @returns {Date} the fixed data of the node
     */
    getData() {
        return new Date(super.getData());
    }
}

module.exports.DateNode = DateNode;
