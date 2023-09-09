const {
    AbstractDynamicRelationSearchNode,
} = require("../AbstractNode/AbstractDynamicRelationSearchNode");

/**
 * @class SingleSearchNode
 * @description the node for searching the single record from the specified table via the search data of the specified attributes
 * @extends {AbstractDynamicRelationSearchNode}
 */
class SingleSearchNode extends AbstractDynamicRelationSearchNode {
    // return only one record from the specified table via the search data of the specified attributes

    /**
     *
     * @param {String} filename
     * @param {String} attributes
     * @param {any} searchData
     * @param {Boolean} sorted
     */
    constructor(filename, attributes, searchData, sorted = false) {
        super(filename, attributes, searchData, sorted);
    }

    /**
     * @override
     * @param {Object} record
     * @param {Object} database
     * @returns {Object} the stored data (object)
     */
    sortedSearch(record, database) {
        // the binarySearch function for searching the record if the table is sorted , it is more efficient than sequentialSearch
        const records = database[this.fileName].getData();

        let left = 0;
        let right = records.length - 1;
        while (left <= right) {
            const middle = Math.floor((left + right) / 2);
            if (records[middle][this.attributes] === this.searchData) {
                return records[middle];
            } else if (records[middle][this.attributes] < this.searchData) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return null;
    }
}

module.exports.SingleSearchNode = SingleSearchNode;
