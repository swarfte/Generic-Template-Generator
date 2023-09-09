const { AbstractAdapter } = require("./AbstractAdapter");
const csv = require("csv-parser");
const fs = require("fs");

/**
 *  the adapter for csv file type
 * @class CsvAdapter
 * @extends {AbstractAdapter}
 */
class CsvAdapter extends AbstractAdapter {
    constructor(filename) {
        super(filename);
        this.data = this.transformDate(this.fileName);
    }
    /**
     * transform the data to json format
     * @override
     * @param {String} filename
     * @returns {Array} the parsed data
     */
    transformDate(filename) {
        const results = [];
        const fileData = fs.readFileSync(filename, "utf8");
        csv()
            .on("data", (data) => results.push(data))
            .write(fileData);
        return results;
    }
}

module.exports.CsvAdapter = CsvAdapter;
