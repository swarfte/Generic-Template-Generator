const { JsonGenerator } = require("./JsonGenerator.js");
const { NdjsonGenerator } = require("./NdjsonGenerator.js");
const { CsvGenerator } = require("./CsvGenerator.js");
const { XlsxGenerator } = require("./XlsxGenerator.js");
const { XmlGenerator } = require("./XmlGenerator.js");

const generatorList = {
    json: JsonGenerator,
    ndjson: NdjsonGenerator,
    csv: CsvGenerator,
    xlsx: XlsxGenerator,
    xml: XmlGenerator,
};

/**
 *  get the generator by the generator name
 * @param {String} formatType
 * @returns {Object} The specify generator
 */
function getGenerator(formatType) {
    // used for getting the generator
    return generatorList[formatType];
}

module.exports = {
    getGenerator,
};
