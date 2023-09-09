const {
    AbstractDynamicRelationSearchNode,
} = require("../AbstractNode/AbstractDynamicRelationSearchNode");

/**
 * @class MultipleSearchNode
 * @description the node for searching the multiple records from the specified table via the search data of the specified attributes
 * @extends {AbstractDynamicRelationSearchNode}
 */
class MultipleSearchNode extends AbstractDynamicRelationSearchNode {
    // return multiple records as a list from the specified table via the search data of the specified attributes

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
     *
     * @param {Object} record
     * @param {Object} database
     * @returns {Array | null} the stored data (array)
     */
    sortedSearch(record, database) {
        // the binarySearch function for searching the record if the table is sorted , it is more efficient than sequentialSearch
        const records = database[this.fileName].getData();
        let left = 0;
        let right = records.length - 1;
        while (left <= right) {
            const middle = Math.floor((left + right) / 2);
            if (records[middle][this.attributes] === this.searchData) {
                let recordsList = [];
                let current = middle;
                while (
                    current >= 0 &&
                    records[current][this.attributes] === this.searchData
                ) {
                    recordsList.push(records[current]);
                    current--;
                }
                current = middle + 1;
                while (
                    current < records.length &&
                    records[current][this.attributes] === this.searchData
                ) {
                    recordsList.push(records[current]);
                    current++;
                }
                return recordsList;
            } else if (records[middle][this.attributes] < this.searchData) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return null;
    }
}

module.exports.MultipleSearchNode = MultipleSearchNode;
