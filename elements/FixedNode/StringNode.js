const { AbstractFixedNode } = require("./AbstractFixedNode");

class StringNode extends AbstractFixedNode {
    // the node for string
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
