const XLSX = require("xlsx");
const { AbstractAdapter } = require("./AbstractAdapter");

/**
 * @fileoverview the adapter for xlsx file type
 * @package
 */
class XlsxAdapter extends AbstractAdapter {
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
        const workbook = XLSX.readFile(filename);
        const sheet_name_list = workbook.SheetNames;
        const xlsxData = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheet_name_list[0]]
        );
        return xlsxData;
    }
}

module.exports.XlsxAdapter = XlsxAdapter;
