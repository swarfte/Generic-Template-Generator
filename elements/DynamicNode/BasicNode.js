const { AbstractDynamicNode } = require("./AbstractDynamicNode");

/**
 * @class BasicNode
 * @description the node for get data from the record directly
 * @extends {AbstractDynamicNode}
 */
class BasicNode extends AbstractDynamicNode {
    /**
     * @param {String} filename
     * @param {String} attributes
     */
    constructor(filename, attributes) {
        super(filename, attributes);
    }

    /**
     * generate the data according to the record and database
     * @override
     * @param {Object} record
     * @param {Object} database
     */
    generateData(record, database) {
        super.generateData(record, database);
        this.data = record[this.attributes];
    }
}

module.exports.BasicNode = BasicNode;
