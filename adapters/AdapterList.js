const { CsvAdapter } = require("./CsvAdapter.js");
const { JsonAdapter } = require("./JsonAdapter.js");
const { XmlAdapter } = require("./XmlAdapter.js");
const { XlsxAdapter } = require("./XlsxAdapter.js");
const { NdjsonAdapter } = require("./NdjsonAdapter.js");

const adapterList = {
    csv: CsvAdapter,
    json: JsonAdapter,
    xml: XmlAdapter,
    xlsx: XlsxAdapter,
    ndjson: NdjsonAdapter,
};

/**
 *
 * @param {String} formatType
 * @returns {Object} The specify adapter
 */
function getAdapter(formatType) {
    return adapterList[formatType];
}

module.exports.getAdapter = getAdapter;
