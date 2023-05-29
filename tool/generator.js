var Nodes = require("../tool/elements.js");
var AbstractFixedNode = Nodes["AbstractFixedNode"];
var AbstractDynamicNode = Nodes["AbstractDynamicNode"];
var AbstractStructureNode = Nodes["AbstractStructureNode"];

class Generator {
    constructor(templateName) {
        this.originalTemplatePath = templateName;
        this.templatePath = "../template/" + this.originalTemplatePath + ".js";
        this.template = require(this.templatePath)["Template"]; // it is a class
        this.templateConfig = this.template.templateConfig;
        this.templatePrimaryKey = this.templateConfig.primaryKey;

        this.database = {};
        this.output = [];
    }

    getFilenameExtension(fileName) {
        return fileName.split(".")[1];
    }

    saveOutput() {
        const fs = require("fs");
        const jsonfile = JSON.stringify(this.output, null, 4);
        fs.writeFile(
            "./output/" + this.originalTemplatePath + ".json",
            JSON.stringify(this.output, null, 4),
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

    generateData() {
        let currentIndex = 0;
        const database = this.database;
        const primaryKey = this.templatePrimaryKey;
        const primaryData = database[primaryKey].getData();
        for (const record of primaryData) {
            if (currentIndex % 1000 == 0) {
                console.log(
                    `current percentage: ${
                        (currentIndex / primaryData.length) * 100
                    }%`
                );
            }
            const templateInstance = new this.template();
            for (const [key, value] of Object.entries(templateInstance)) {
                templateInstance[key] = this.parseNode(
                    key,
                    value,
                    record,
                    database
                );
            }
            this.output.push(templateInstance);
            currentIndex += 1;
        }
    }

    parseNode(key, value, record, database) {
        return value.parseNode(key, value, record, database);
    }

    run() {
        this.initializeDatabase(this.database, this.templateConfig.source);
        this.generateData();
        this.saveOutput();
    }
}

module.exports = {
    Generator,
};
