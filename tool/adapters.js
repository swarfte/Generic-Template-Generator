var fs = require("fs");
var csv = require("csv-parser");
var ndjson = require("ndjson");

class AbstractAdapter {
    // the abstract adapter for different file type
    constructor(filename) {
        if (this.constructor == AbstractAdapter) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.fileName = "./source/" + filename; // the full path of the file
        this.data = []; // the parsed data for the file
    }
    transformDate() {} // transform data to json format
    getData() {
        // get the full data
        return this.data;
    }
    getColumnData(columnName) {} // get the data of a column
    getRowData(rowIndex) {} // get the data of a row
}

class csvAdapter extends AbstractAdapter {
    // parse csv file
    constructor(filename) {
        super(filename);
        this.data = this.transformDate(this.fileName);
    }

    transformDate(filename) {
        const results = [];
        const fileData = fs.readFileSync(filename, "utf8");
        csv()
            .on("data", (data) => results.push(data))
            .write(fileData);

        return results;
    }

    getColumnData(columnName) {
        let column = [];
        for (let i = 0; i < this.data.length; i++) {
            column.push(this.data[i][columnName]);
        }
        return column;
    }

    getRowData(rowIndex) {
        return this.data[rowIndex];
    }
}

class ndjsonAdapter extends AbstractAdapter {
    // parse ndjson file
    constructor(filename) {
        super(filename);
        this.data = this.transformDate(this.fileName);
    }

    transformDate(filename) {
        const results = [];
        const fileData = fs.readFileSync(filename, "utf8");
        const parser = ndjson.parse();
        parser.on("data", (data) => results.push(data));
        parser.write(fileData);
        return results;
    }

    getColumnData(columnName) {
        let column = [];
        for (let i = 0; i < this.data.length; i++) {
            column.push(this.data[i][columnName]);
        }
        return column;
    }

    getRowData(rowIndex) {
        return this.data[rowIndex];
    }
}

module.exports = {
    AbstractAdapter,
    csvAdapter,
    ndjsonAdapter,
};
