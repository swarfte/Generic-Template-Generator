const { SingleSearchNode } = require("./SingleSearchNode.js");
const { BasicNode } = require("./BasicNode.js");

/**
 * @class OneToOneNode
 * @description the node for searching the single record from the specified table via the search data of the specified attributes
 * @extends {SingleSearchNode}
 */
class OneToOneNode extends SingleSearchNode {
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

module.exports.OneToOneNode = OneToOneNode;
