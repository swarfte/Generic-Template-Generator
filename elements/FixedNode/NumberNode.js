const { AbstractFixedNode } = require("./AbstractFixedNode");

class NumberNode extends AbstractFixedNode {
    // the node for number
    constructor(data) {
        super(data);
    }

    /**
     * @returns {Number} the fixed data of the node
     */
    getData() {
        return Number(super.getData());
    }
}

module.exports.NumberNode = NumberNode;
