const { CsvAdapter } = require("./CsvAdapter");
const { JsonAdapter } = require("./JsonAdapter");
const { XmlAdapter } = require("./XmlAdapter");
const { XlsxAdapter } = require("./XlsxAdapter");
const { NdjsonAdapter } = require("./NdjsonAdapter");

function getAdapter(formatType) {
    switch (formatType) {
        case "csv":
            return CsvAdapter;
        case "json":
            return JsonAdapter;
        case "xml":
            return XmlAdapter;
        case "xlsx":
            return XlsxAdapter;
        case "ndjson":
            return NdjsonAdapter;
        default:
            throw new Error("Invalid adapter name");
    }
}

module.exports.getAdapter = getAdapter;
