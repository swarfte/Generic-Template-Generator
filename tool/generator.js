var fs = require("fs");
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

        this.database = {}; // the database include all the data that within the template source
        this.output = []; // the output data
    }

    initializeDatabase(database, templateSource) {} // initialize the database according to the template source
    generateData(database, templatePrimaryTable, template, output) {} // generate the data according to the template element
    saveOutput(originalTemplatePath, output) {} // save the output data to the file

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

    getFilenameExtension(fileName) {
        return fileName.split(".")[1];
    }

    saveOutput(originalTemplatePath, output) {
        let outData = "[";
        for (let indx = 0; indx < this.output.length - 1; indx++) {
            outData += JSON.stringify(this.output[indx], null, 4) + ",";
        }
        outData +=
            JSON.stringify(this.output[this.output.length - 1], null, 4) + "]";
        fs.writeFile(
            "./output/" + originalTemplatePath + ".json",
            outData,
            (err) => {
                if (err) {
                    throw err;
                }
                console.log("JSON data is saved.");
            }
        );
    }

    initializeDatabase(database, templateSource) {
        for (const [key, value] of Object.entries(templateSource)) {
            let filenameExtension = this.getFilenameExtension(value);
            let adapterName = filenameExtension + "Adapter";
            let adapter = require("../tool/adapters.js")[adapterName];
            database[key] = new adapter(value);
        }
    }

    generateData(database, templatePrimaryTable, template, output) {
        let currentIndex = 0;
        const primaryData = database[templatePrimaryTable].getData();
        for (const record of primaryData) {
            if (currentIndex % 10000 == 0) {
                // show the current schedule
                console.log(
                    `current percentage: ${
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
}

module.exports = {
    AbstractGenerator,
    jsonGenerator,
};
