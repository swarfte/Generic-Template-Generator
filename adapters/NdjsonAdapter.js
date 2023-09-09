const fs = require("fs");
const ndjson = require("ndjson");
const { AbstractAdapter } = require("./AbstractAdapter");

/**
 * the adapter for ndjson file type
 * @class NdjsonAdapter
 * @extends {AbstractAdapter}
 */
class NdjsonAdapter extends AbstractAdapter {
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

module.exports.NdjsonAdapter = NdjsonAdapter;
