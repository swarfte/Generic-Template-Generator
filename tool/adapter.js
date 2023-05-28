class AbstractAdapter {
    constructor(fileName) {
        if (this.constructor == AbstractAdapter) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.fileName = "./source/" + fileName;
        this.data = [];
    }
    transformDate() {}
    getData() {
        return this.data;
    }
    getColumnData(columnName) {}
    getRowData(rowIndex) {}
}

class csvAdapter extends AbstractAdapter {
    constructor(fileName) {
        super(fileName + ".csv");
        this.data = this.transformDate(this.fileName);
    }

    transformDate(fileName) {
        const fs = require("fs");
        const csv = require("csv-parser");
        const results = [];
        const fileData = fs.readFileSync(fileName, "utf8");
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
    constructor(fileName) {
        super(fileName + ".ndjson");
        this.data = this.transformDate(this.fileName);
    }

    transformDate(fileName) {
        const fs = require("fs");
        const ndjson = require("ndjson");
        const results = [];
        const fileData = fs.readFileSync(fileName, "utf8");
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
