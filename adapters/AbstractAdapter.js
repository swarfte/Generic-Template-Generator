/**
 * @fileoverview the abstract class of adapter
 * @abstract
 * @class
 * @package
 */
class AbstractAdapter {
    // the abstract adapter for different file type
    constructor(filename) {
        if (this.constructor === AbstractAdapter) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.fileName = "./source/" + filename; // the full path of the file
        this.data = []; // the parsed data for the file
    }

    /**
     * transform the data to json format
     * @param {String} fileName
     */
    transformDate(fileName) {}

    /**
     *  get the parsed data
     * @returns {Array} the parsed data
     */
    getData() {
        // get the data
        return this.data;
    }

    /**
     *  set the parsed data
     * @param {Array} data
     */
    setData(data) {
        // set the data
        this.data = data;
    }

    /**
     * get the column data by column name
     * @param {String} columnName
     * @returns {Array} the column data
     */
    getColumnData(columnName) {
        let column = [];
        for (const element of this.data) {
            column.push(element[columnName]);
        }
        return column;
    }
    /**
     *  get the row data by index
     * @param {Number} rowIndex
     * @returns
     */
    getRowData(rowIndex) {
        return this.data[rowIndex];
    }
}

module.exports.AbstractAdapter = AbstractAdapter;
