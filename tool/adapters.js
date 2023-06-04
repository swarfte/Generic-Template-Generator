const fs = require("fs");
const csv = require("csv-parser");
const ndjson = require("ndjson");
const XLSX = require("xlsx");
const xml2js = require("xml2js");

class AbstractAdapter {
    // the abstract adapter for different file type
    constructor(filename) {
        if (this.constructor === AbstractAdapter) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.fileName = "./source/" + filename; // the full path of the file
        this.data = []; // the parsed data for the file
    }

    transformDate() {
        //  transform data to json format
    }

    getData() {
        // get the data
        return this.data;
    }

    setData(data) {
        // set the data
        this.data = data;
    }

    getColumnData(columnName) {
        let column = [];
        for (const element of this.data) {
            column.push(element[columnName]);
        }
        return column;
    }

    getRowData(rowIndex) {
        return this.data[rowIndex];
    }
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
}

class jsonAdapter extends AbstractAdapter {
    // parse json file
    constructor(filename) {
        super(filename);
        this.data = this.transformDate(this.fileName);
    }

    transformDate(filename) {
        const fileData = fs.readFileSync(filename, "utf8");
        return JSON.parse(fileData);
    }
}

class xlsxAdapter extends AbstractAdapter {
    constructor(filename) {
        super(filename);
        this.data = this.transformDate(this.fileName);
    }

    transformDate(filename) {
        const workbook = XLSX.readFile(filename);
        const sheet_name_list = workbook.SheetNames;
        const xlsxData = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheet_name_list[0]]
        );
        return xlsxData;
    }
}

class xmlAdapter extends AbstractAdapter {
    constructor(filename) {
        super(filename);
        this.data = this.transformDate(this.fileName);
    }

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
