class Generator {
    constructor(templateName) {
        this.originalTemplatePath = templateName;
        this.templatePath = "./template/" + this.originalTemplatePath + ".js";
        this.template = require(this.templatePath)["Template"];
        this.templateConfig = this.template.templateConfig;
        this.templatePrimaryKey = this.templateConfig.primaryKey;

        this.database = {};
        this.output = [];
        this.initializeDatabase(this.database, this.templateConfig.source);
    }

    getFilenameExtension(fileName) {
        return fileName.split(".")[1];
    }

    saveOutput() {
        const fs = require("fs");
        fs.writeFileSync(
            "./output/" + this.originalTemplatePath + ".json",
            JSON.stringify(this.output, null, 4)
        );
    }

    initializeDatabase(database, templateSource) {
        for (const [key, value] of Object.entries(templateSource)) {
            let filenameExtension = this.getFilenameExtension(value);
            let adapterName = filenameExtension + "Adapter";
            let adapter = require("./tool/adapters.js")[adapterName];
            database[key] = new adapter(value);
        }
    }

    run() {}
}

module.exports = {
    Generator,
};
