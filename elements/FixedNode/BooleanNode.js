const { AbstractFixedNode } = require("./AbstractFixedNode");

class BooleanNode extends AbstractFixedNode {
    // the node for boolean
    constructor(data) {
        super(data);
    }
    /**
     *  @override
     * @returns {Boolean} the fixed data of the node
     */
    getData() {
        return Boolean(super.getData());
    }
}

module.exports.BooleanNode = BooleanNode;
