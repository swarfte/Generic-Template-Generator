const { AbstractFixedNode } = require("./AbstractFixedNode");

/**
 * @class NullNode
 * @description the node for null
 * @extends {AbstractFixedNode}
 */
class NullNode extends AbstractFixedNode {
    /**
     *
     * @param {null} data
     */
    constructor(data) {
        super(data);
    }

    /**
     * @override
     * @returns {null} the fixed data of the node
     */
    getData() {
        return null;
    }
}

module.exports.NullNode = NullNode;
