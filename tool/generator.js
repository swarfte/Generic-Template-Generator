const fs = require("fs");

class AbstractGenerator {
    // the abstract class of generator
    constructor(templateName) {
        if (this.constructor === AbstractGenerator) {
            throw new TypeError(
                "Abstract class 'AbstractGenerator' cannot be instantiated directly."
            );
        }
        this.originalTemplatePath = templateName; // the original template path
        this.templatePath = "../template/" + this.originalTemplatePath + ".js"; // the full path of the template
        this.template = require(this.templatePath)["Template"]; // it is a template class , it is used to generate the data
        this.templateConfig = this.template.templateConfig; // the config used by generator
        this.templatePrimaryTable = this.templateConfig.primaryTable; // the primary table of this template

        this.database = {}; // the input data (database) include all the data that within the template source
        this.output = []; // the output data
    }

    getFilenameExtension(fileName) {
        return fileName.split(".")[1];
    }

    initializeDatabase(database, templateSource) {
        // initialize the database according to the template source
        for (const [key, value] of Object.entries(templateSource)) {
            let filenameExtension = this.getFilenameExtension(value);
            const adapterName = filenameExtension + "Adapter";
            const adapter = require("../tool/adapters.js")[adapterName];
            database[key] = new adapter(value);
        }
    }

    generateData(database, templatePrimaryTable, template, output) {
        // generate the data according to the template element
        let currentIndex = 0;
        const primaryData = database[templatePrimaryTable].getData();
        for (const record of primaryData) {
            if (currentIndex % 10000 === 0) {
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

    saveOutput(originalTemplatePath, output) {
        // save the output data to the file
    } 

    run() {
        // the main function of the generator
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

class jsonGenerator extends AbstractGenerator {
    // the generator for json file
    constructor(templateName) {
        super(templateName);
    }

    validString(str, count) {
        if (str.length < 524288000) { //  the maximum size of string is 512MB , so we set the threshold to 500MB
            return [str, count];
        }

        // remove the last comma and \n in the string , add the right bracket
        str = str.substring(0, str.length - 2);
        str += "]";
        // write the string in the json file
        let filename = "./output/" + this.originalTemplatePath + "_" + count + ".json";
        fs.writeFile(filename, str, (err) => {
            if (err) {
                throw err;
            }
        });
        return ["[", count + 1];
    }

    saveOutput(originalTemplatePath, output) {

        let outputData = "[";
        let count = 0;
        for (let index = 0; index < output.length - 1; index++) {
            if (index % 10000 === 0) {
                // show the current schedule
                console.log(
                    `current save percentage: ${
                        (index / output.length) * 100
                    }%`
                );
            }
            [outputData, count] = this.validString(outputData, count);
            outputData += JSON.stringify(output[index], null, 4) + "," + "\n";
        }
        outputData += JSON.stringify(output[output.length - 1], null, 4) + "]";

        let outputPath = count === 0 ? "./output/" + originalTemplatePath + ".json" : "./output/" + originalTemplatePath + "_" + count + ".json";
        fs.writeFile(
            outputPath,
            outputData,
            (err) => {
                if (err) {
                    throw err;
                }
                console.log("JSON data is saved.");
            }
        );

    }
}

class ndjsonGenerator extends AbstractGenerator {
    constructor(templateName) {
        super(templateName);
    }

    saveOutput(originalTemplatePath, output) {
        let outData = "";
        for (const record of output) {
            outData += JSON.stringify(record) + "\n";
        }
        fs.writeFile(
            "./output/" + originalTemplatePath + ".ndjson",
            outData,
            (err) => {
                if (err) {
                    throw err;
                }
                console.log("NDJSON data is saved.");
            }
        );
    }
}

class csvGenerator extends AbstractGenerator {
    constructor(templateName) {
        super(templateName);
    }

    saveOutput(originalTemplatePath, output) {
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

const moduleList = {
    AbstractGenerator,
    jsonGenerator,
    ndjsonGenerator,
    csvGenerator,
};

class ImportModule {
    // this class is used to import the module to the global scope
    static importModuleList = moduleList;

    constructor() {
        throw new Error("This class cannot be instantiated.");
    }

    static load() {
        // use this method when require the elements.js
        for (const [key, value] of Object.entries(
            ImportModule.importModuleList
        )) {
            global[key] = value;
        }
    }
}

module.exports = moduleList;
module.exports.ImportModule = ImportModule;
