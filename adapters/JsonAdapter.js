const fs = require("fs");
const { AbstractAdapter } = require("./AbstractAdapter.js");

/**
 *  the adapter for json file type
 * @class JsonAdapter
 * @extends {AbstractAdapter}
 */
class JsonAdapter extends AbstractAdapter {
    constructor(filename) {
        super(filename);
        this.data = this.transformDate(this.fileName);
    }

    /**
     * it will parse the json file
     * @override
     * @param {String} filename
     * @returns {Array} the parsed data
     */
    transformDate(filename) {
        const fileData = fs.readFileSync(filename, "utf8");
        return JSON.parse(fileData);
    }
}

module.exports.JsonAdapter = JsonAdapter;
