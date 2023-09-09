const {
    AbstractStructureNode,
} = require("../AbstractNode/AbstractStructureNode.js");

/**
 * @class ArithmeticNode
 * @description the node for arithmetic
 * @extends {AbstractStructureNode}
 */
class ArithmeticNode extends AbstractStructureNode {
    /**
     *
     * @param {Array} data
     * @param {*} callback -for reduce function
     */
    constructor(data, callback) {
        super(data);
        this.callback = callback; // the operation of the arithmetic , it is a function that can be used to calculate the data
    }

    /**
     * it will return the data after calculating the data of the node array
     * @override
     * @param {String} key
     * @param {Object} value
     * @param {Object} record
     * @param {Object} database
     * @returns {*}
     */
    parseNode(key, value, record, database) {
        // use the for loop to parse the data and calculate them
        const calculationSequence = [];
        for (const element of this.data) {
            calculationSequence.push(
                element.parseNode(key, value, record, database)
            );
        }
        return calculationSequence.reduce(this.callback);
    }
}

module.exports.ArithmeticNode = ArithmeticNode;
