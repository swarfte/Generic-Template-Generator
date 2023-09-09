const fs = require("fs");
const xml2js = require("xml2js");
const { AbstractAdapter } = require("./AbstractAdapter");

/**
 * @fileoverview the adapter for xml file type
 * @package
 */
class XmlAdapter extends AbstractAdapter {
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

module.exports.XmlAdapter = XmlAdapter;
