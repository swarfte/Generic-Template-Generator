const {
    AbstractDynamicRelationNode,
} = require("./AbstractDynamicRelationNode.js");

const { Database } = require("../Database.js");
const { AbstractNode } = require("./AbstractNode.js");
const sortedDatabase = Database.sortedData;

/**
 * @class AbstractDynamicRelationSearchNode
 * @description the abstract class for all dynamic relation search node , it will generate the data according to the record and the reference table (include FK) , it will search the data from the foreign table
 * @extends {AbstractDynamicRelationNode}
 */
class AbstractDynamicRelationSearchNode extends AbstractDynamicRelationNode {
    // search the foreign data from the specified data

    /**
     *
     * @param {String} filename
     * @param {String} attributes
     * @param {String | AbstractNode} searchData
     * @param {Boolean} sorted
     */
    constructor(filename, attributes, searchData, sorted = false) {
        super(filename, attributes);
        if (this.constructor === AbstractDynamicRelationSearchNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.searchData = searchData; // the search data that will be used to search the record
        this.sorted = sorted; // whether the table is sorted
    }

    /**
     *  the function for searching the data from the sorted database
     * @override
     * @param {Object} record
     * @param {Object} database
     * @returns {Array} the stored data (array)
     */
    InitializedSortedDatabase(record, database) {
        if (!(this.fileName in sortedDatabase)) {
            // the table is not in the sorted database , we need to sort it first
            sortedDatabase[this.fileName] = {};
        }
        if (!(this.attributes in sortedDatabase[this.fileName])) {
            // the attribute is not in the sorted table , we need to sort it first
            sortedDatabase[this.fileName][this.attributes] = {};
            const sortedTable = structuredClone(
                database[this.fileName].getData()
            );

            sortedTable.sort(this.sortMethod(this.attributes));
            sortedDatabase[this.fileName][this.attributes] = sortedTable; // the sorted table is only for the current attribute , different attribute will have different sorted table
        }
        return sortedDatabase[this.fileName][this.attributes]; // this a sorted table (array)
    }

    /**
     * the function for searching the data from the unsorted database
     * @override
     * @param {Object} record
     * @param {Object} database
     * @returns
     */
    unsortedSearch(record, database) {
        const sortedTable = this.InitializedSortedDatabase(record, database);
        database[this.fileName].setData(sortedTable); // we need to set the sorted table to the foreign table
        return this.sortedSearch(record, database);
    }

    /**
     * the function used to deconstruct the node
     * @param {String} key
     * @param {Object} value
     * @param {Object} record
     * @param {Object} database
     */
    deconstructNode(key, value, record, database) {
        if (this.searchData instanceof AbstractNode) {
            this.searchData = this.searchData.parseNode(
                key,
                value,
                record,
                database
            );
        }
    }

    /**
     *  the function for searching the data from the sorted database
     * @override
     * @param {String} key
     * @param {Object} value
     * @param {Object} record
     * @param {Object} database
     * @returns
     */
    parseNode(key, value, record, database) {
        // we need to generate the data first before get the data
        this.deconstructNode(key, value, record, database);
        this.generateData(record, database);
        return this.getData();
    }
}

module.exports.AbstractDynamicRelationSearchNode =
    AbstractDynamicRelationSearchNode;
