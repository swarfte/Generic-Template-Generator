const { JsonGenerator } = require("./JsonGenerator.js");
const { NdjsonGenerator } = require("./NdjsonGenerator.js");
const { CsvGenerator } = require("./CsvGenerator.js");
const { XlsxGenerator } = require("./XlsxGenerator.js");
const { XmlGenerator } = require("./XmlGenerator.js");
const { AbstractGenerator } = require("./AbstractGenerator.js");

/**
 *  get the generator by the generator name
 * @param {String} generatorName
 * @returns {Object} The specify generator
 */
function getGenerator(generatorName) {
    // used for getting the generator
    switch (generatorName) {
        case "json":
            return JsonGenerator;
        case "ndjson":
            return NdjsonGenerator;
        case "csv":
            return CsvGenerator;
        case "xlsx":
            return XlsxGenerator;
        case "xml":
            return XmlGenerator;
        default:
            throw new Error("The generator is not supported.");
    }
}

module.exports = {
    getGenerator,
};
