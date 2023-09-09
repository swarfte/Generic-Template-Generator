const { AbstractGenerator } = require("./AbstractGenerator");
const fs = require("fs");

/**
 * the generator for csv file
 * @class csvGenerator
 * @extends {AbstractGenerator}
 */
class CsvGenerator extends AbstractGenerator {
    constructor(templateName) {
        super(templateName);
    }

    /**
     *  save the output data to the csv file
     * @param {String} originalTemplatePath
     * @param {Object[]} output
     */
    saveOutput(originalTemplatePath, output) {
        // There are areas where this function can be optimized
        let csvData = [];
        let columnName = [];
        for (const key of Object.keys(output[0])) {
            columnName.push(key);
        }
        csvData.push(columnName);
        for (const record of output) {
            let row = [];
            for (const value of Object.values(record)) {
                row.push(JSON.stringify(value));
            }
            csvData.push(row);
        }
        let csvContent = "";
        csvData.forEach(function (rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
        fs.writeFile(
            "./output/" + originalTemplatePath + ".csv",
            csvContent,
            (err) => {
                if (err) {
                    throw err;
                }
                console.log("CSV data is saved.");
            }
        );
    }
}

module.exports.CsvGenerator = CsvGenerator;
