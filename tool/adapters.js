const fs = require("fs");
const csv = require("csv-parser");
const ndjson = require("ndjson");
const XLSX = require("xlsx");
const xml2js = require("xml2js");

/**
 * @fileoverview the abstract class of adapter
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

/**
 * @fileoverview the adapter for csv file type
 * @package
 */
class csvAdapter extends AbstractAdapter {
    constructor(filename) {
        super(filename);
        this.data = this.transformDate(this.fileName);
    }
    /**
     * transform the data to json format
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

/**
 * @fileoverview the adapter for ndjson file type
 * @package
 */
class ndjsonAdapter extends AbstractAdapter {
    // parse ndjson file
    constructor(filename) {
        super(filename);
        this.data = this.transformDate(this.fileName);
    }

    /**
     *
     * @param {String} filename
     * @returns {Array} the parsed data
     */
    transformDate(filename) {
        const results = [];
        const fileData = fs.readFileSync(filename, "utf8");
        const parser = ndjson.parse();
        parser.on("data", (data) => results.push(data));
        parser.write(fileData);
        return results;
    }
}

/**
 * @fileoverview the adapter for json file type
 * @package
 */
class jsonAdapter extends AbstractAdapter {
    constructor(filename) {
        super(filename);
        this.data = this.transformDate(this.fileName);
    }

    /**
     *
     * @param {String} filename
     * @returns {Array} the parsed data
     */
    transformDate(filename) {
        const fileData = fs.readFileSync(filename, "utf8");
        return JSON.parse(fileData);
    }
}

/**
 * @fileoverview the adapter for xlsx file type
 * @package
 */
class xlsxAdapter extends AbstractAdapter {
    constructor(filename) {
        super(filename);
        this.data = this.transformDate(this.fileName);
    }

    /**
     *
     * @param {String} filename
     * @returns {Array} the parsed data
     */
    transformDate(filename) {
        const workbook = XLSX.readFile(filename);
        const sheet_name_list = workbook.SheetNames;
        const xlsxData = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheet_name_list[0]]
        );
        return xlsxData;
    }
}

/**
 * @fileoverview the adapter for xml file type
 * @package
 */
class xmlAdapter extends AbstractAdapter {
    constructor(filename) {
        super(filename);
        this.data = this.transformDate(this.fileName);
    }

    /**
     *
     * @param {String} filename
     * @returns {Array} the parsed data
     */
    transformDate(filename) {
        // return a array of object
        const data = fs.readFileSync(filename, "utf8");
        const parser = new xml2js.Parser();
        let xmlData = null;
        parser.parseString(data, (err, result) => {
            if (err) {
                throw err;
            }
            xmlData = result;
        });

        if (xmlData === null) {
            throw new Error("xmlData is null");
        }

        const recordName = Object.values(xmlData)[0];
        const array = Object.values(recordName)[0];
        array.forEach((element) => {
            for (const [key, value] of Object.entries(element)) {
                if (value instanceof Array) {
                    // change the value to original type (string)
                    element[key] = value[0];
                }
            }
        });
        return array;
    }
}

module.exports = {
    AbstractAdapter,
    csvAdapter,
    ndjsonAdapter,
    jsonAdapter,
    xlsxAdapter,
    xmlAdapter,
};
