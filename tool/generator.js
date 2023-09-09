const fs = require("fs");
const XLSX = require("xlsx");
const xml2js = require("xml2js");

const {
    csvAdapter,
    xlsxAdapter,
    xmlAdapter,
    jsonAdapter,
    ndjsonAdapter,
} = require("./adapters.js");

/**
 * the abstract class of generator
 * @abstract
 * @class AbstractGenerator
 */
class AbstractGenerator {
    constructor(templateName) {
        if (this.constructor === AbstractGenerator) {
            throw new TypeError(
                "Abstract class 'AbstractGenerator' cannot be instantiated directly."
            );
        }

        this.AdaptersList = {
            csv: csvAdapter,
            xlsx: xlsxAdapter,
            xml: xmlAdapter,
            json: jsonAdapter,
            ndjson: ndjsonAdapter,
        };

        this.originalTemplatePath = templateName; // the original template path
        this.templatePath = "../template/" + this.originalTemplatePath + ".js"; // the full path of the template
        this.template = require(this.templatePath)["Template"]; // it is a template class , it is used to generate the data
        this.templateConfig = this.template.templateConfig; // the config used by generator
        this.templatePrimaryTable = this.templateConfig.primaryTable; // the primary table of this template

        this.database = {}; // the input data (database) include all the data that within the template source
        this.output = []; // the output data
        this.console_pre_show = 20000; // each {console_pre_show} time show the schedule in the console
    }

    /**
     * get the file extension of the file
     * @param {String} fileName
     * @returns {String}
     */
    getFilenameExtension(fileName) {
        return fileName.split(".")[1];
    }

    /**
     *
     * @param {Object} database - the database
     * @param {Object} templateSource - the template source
     */
    initializeDatabase(database, templateSource) {
        // initialize the database according to the template source
        for (const [key, value] of Object.entries(templateSource)) {
            let filenameExtension = this.getFilenameExtension(value);

            // static import the adapter
            const adapter = this.AdaptersList[filenameExtension];
            database[key] = new adapter(value);
        }
    }

    /**
     *  generate the data according to the template element
     * @param {Object} database - the database
     * @param {String} templatePrimaryTable - the primary table of custom template config
     * @param {Object} template - the template which defined in the custom template
     * @param {Object[]} output - the output data
     */
    generateData(database, templatePrimaryTable, template, output) {
        let currentIndex = 0;
        const primaryData = database[templatePrimaryTable].getData();
        for (const record of primaryData) {
            if (currentIndex % this.console_pre_show === 0) {
                // show the current schedule
                console.log(
                    `current generate percentage: ${
                        (currentIndex / primaryData.length) * 100
                    }%`
                );
            }
            const templateInstance = new template();
            for (const [key, value] of Object.entries(templateInstance)) {
                templateInstance[key] = value.parseNode(
                    key,
                    value,
                    record,
                    database
                );
            }
            output.push(templateInstance);
            currentIndex += 1;
        }
    }

    /**
     *
     *  save the output data to the file
     * @param {String} originalTemplatePath
     * @param {Array} output
     * @abstract
     * @memberof AbstractGenerator
     */
    saveOutput(originalTemplatePath, output) {}

    /**
     * the main function of the generator
     * @abstract
     */
    run() {
        this.initializeDatabase(this.database, this.templateConfig.source);
        this.generateData(
            this.database,
            this.templatePrimaryTable,
            this.template,
            this.output
        );
        this.saveOutput(this.originalTemplatePath, this.output);
    }
}

/**
 * the generator for json file
 * @class jsonGenerator
 * @extends {AbstractGenerator}
 */
class jsonGenerator extends AbstractGenerator {
    constructor(templateName) {
        super(templateName);
    }

    /**
     * check the size of string , if the size of string is bigger than 500MB , we write the string in a file
     * @param {String} str
     * @param {Number} count
     * @returns {Array}
     */
    validString(str, count) {
        if (str.length < 524288000) {
            return [str, count];
        }

        // remove the last comma and \n in the string , add the right bracket
        str = str.substring(0, str.length - 2);
        str += "]";
        // write the string in the json file
        let filename =
            "./output/" + this.originalTemplatePath + "_" + count + ".json";
        fs.writeFile(filename, str, (err) => {
            if (err) {
                throw err;
            }
        });
        return ["[", count + 1];
    }

    /**
     * save the output data to the json file
     * @param {String} originalTemplatePath
     * @param {Object[]} output
     */
    saveOutput(originalTemplatePath, output) {
        let outputData = "[";
        let count = 0;
        for (let index = 0; index < output.length - 1; index++) {
            if (index % this.console_pre_show === 0) {
                // show the current schedule
                console.log(
                    `current save percentage: ${(index / output.length) * 100}%`
                );
            }
            [outputData, count] = this.validString(outputData, count); // for big data , we write it in a file each 500 MB
            outputData += JSON.stringify(output[index], null, 4) + "," + "\n";
        }
        outputData += JSON.stringify(output[output.length - 1], null, 4) + "]";

        let outputPath =
            count === 0
                ? "./output/" + originalTemplatePath + ".json"
                : "./output/" + originalTemplatePath + "_" + count + ".json";
        fs.writeFile(outputPath, outputData, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });
    }
}

/**
 * the generator for ndjson file
 * @class ndjsonGenerator
 * @extends {AbstractGenerator}
 */
class ndjsonGenerator extends AbstractGenerator {
    constructor(templateName) {
        super(templateName);
    }

    /**
     *  check the size of string , if the size of string is bigger than 500MB , we write the string in a file
     * @param {String} str
     * @param {Number} count
     * @returns {Array}
     */
    validString(str, count) {
        if (str.length < 524288000) {
            //  the maximum size of string is 512MB , so we set the threshold to 500MB
            return [str, count];
        } else {
            let filename =
                "./output/" +
                this.originalTemplatePath +
                "_" +
                count +
                ".ndjson";
            fs.writeFile(filename, str, (err) => {
                if (err) {
                    throw err;
                }
            });
            return ["", count + 1];
        }
    }

    /**
     * save the output data to the ndjson file
     * @param {String} originalTemplatePath
     * @param {Object[]} output
     */
    saveOutput(originalTemplatePath, output) {
        let outData = "";
        let count = 0;
        for (const record of output) {
            [outData, count] = this.validString(outData, count); // for big data , we need to save the data in the file when the size of string is bigger than 500MB
            outData += JSON.stringify(record) + "\n";
        }
        let outputPath =
            count === 0
                ? "./output/" + originalTemplatePath + ".ndjson"
                : "./output/" + originalTemplatePath + "_" + count + ".ndjson";
        fs.writeFile(outputPath, outData, (err) => {
            if (err) {
                throw err;
            }
            console.log("NDJSON data is saved.");
        });
    }
}

/**
 * the generator for csv file
 * @class csvGenerator
 * @extends {AbstractGenerator}
 */
class csvGenerator extends AbstractGenerator {
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

/**
 * the generator for xlsx file
 * @class xlsxGenerator
 * @extends {AbstractGenerator}
 */
class xlsxGenerator extends AbstractGenerator {
    constructor(templateName) {
        super(templateName);
    }

    /**
     *
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

/**
 * the generator for xml file
 * @class xmlGenerator
 * @extends {AbstractGenerator}
 */
class xmlGenerator extends AbstractGenerator {
    constructor(templateName) {
        super(templateName);
    }

    /**
     * save the output data to the xml file
     * @param {String} originalTemplatePath
     * @param {Object[]} output
     */
    saveOutput(originalTemplatePath, output) {
        const builder = new xml2js.Builder();
        const xml = builder.buildObject({
            data: {
                record: output,
            },
        });
        fs.writeFile(
            "./output/" + originalTemplatePath + ".xml",
            xml,
            (err) => {
                if (err) {
                    throw err;
                }
                console.log("XML data is saved.");
            }
        );
    }
}

const moduleList = {
    AbstractGenerator,
    jsonGenerator,
    ndjsonGenerator,
    csvGenerator,
    xlsxGenerator,
    xmlGenerator,
};

module.exports = moduleList;
