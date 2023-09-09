const { MultipleSearchNode } = require("./MultipleSearchNode.js");
const { BasicNode } = require("./BasicNode");
/**
 * @class OneToManyNode
 * @description the node for searching the multiple records from the specified table via the search data of the specified attributes
 * @extends {MultipleSearchNode}
 */
class OneToManyNode extends MultipleSearchNode {
    /**
     *
     * @param {String} filename
     * @param {String} attributes
     * @param {String} foreignFilename
     * @param {String} foreignAttributes
     * @param {Boolean} sorted
     */
    constructor(
        filename,
        attributes,
        foreignFilename,
        foreignAttributes,
        sorted = false
    ) {
        super(
            foreignFilename,
            foreignAttributes,
            new BasicNode(filename, attributes),
            sorted
        );
    }
}

module.exports.OneToManyNode = OneToManyNode;
