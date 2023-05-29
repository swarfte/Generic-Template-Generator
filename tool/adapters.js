class AbstractAdapter {
    constructor(filename) {
        if (this.constructor == AbstractAdapter) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.fileName = "./source/" + filename;
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
    constructor(filename) {
        super(filename);
        this.data = this.transformDate(this.fileName);
    }

    transformDate(filename) {
        const fs = require("fs");
        const csv = require("csv-parser");
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
    constructor(filename) {
        super(filename);
        this.data = this.transformDate(this.fileName);
    }

    transformDate(filename) {
        const fs = require("fs");
        const ndjson = require("ndjson");
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
