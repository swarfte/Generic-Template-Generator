const { AbstractGenerator } = require("./AbstractGenerator");
const XLSX = require("xlsx");

/**
 * the generator for xlsx file
 * @class xlsxGenerator
 * @extends {AbstractGenerator}
 */
class XlsxGenerator extends AbstractGenerator {
    constructor(templateName) {
        super(templateName);
    }

    /**
     * save the output data to the xlsx file
     * @override
     * @param {String} originalTemplatePath
     * @param {Object[]} output
     */
    saveOutput(originalTemplatePath, output) {
        console.log("saving xlsx file");
        const workbook = XLSX.utils.book_new();
        const columnName = [];
        const worksheetData = [];
        for (const key of Object.keys(output[0])) {
            columnName.push(key);
        }
        worksheetData.push(columnName);
        for (const record of output) {
            let row = [];
            for (const value of Object.values(record)) {
                row.push(JSON.stringify(value));
            }
            worksheetData.push(row);
        }
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "./output/" + originalTemplatePath + ".xlsx");
        console.log("XLSX data is saved.");
    }
}

module.exports.XlsxGenerator = XlsxGenerator;
