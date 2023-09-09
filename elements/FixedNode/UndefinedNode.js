const { AbstractFixedNode } = require("./AbstractFixedNode");

/**
 * @class UndefinedNode
 * @description the node for undefined
 * @extends {AbstractFixedNode}
 */
class UndefinedNode extends AbstractFixedNode {
    /**
     *
     * @param {undefined} data
     */
    constructor(data) {
        super(data);
    }

    /**
     * @override
     * @returns {undefined} the fixed data of the node
     */
    getData() {
        return undefined;
    }
}

module.exports.UndefinedNode = UndefinedNode;
