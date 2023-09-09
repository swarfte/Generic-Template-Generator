const fs = require("fs");
const { AbstractAdapter } = require("./AbstractAdapter");

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
     *
     * @param {String} filename
     * @returns {Array} the parsed data
     * @override
     */
    transformDate(filename) {
        const fileData = fs.readFileSync(filename, "utf8");
        return JSON.parse(fileData);
    }
}

module.exports.JsonAdapter = JsonAdapter;
