const { getAdapter } = require("../adapters/AdapterList.js");

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
            const adapter = getAdapter(filenameExtension);
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

module.exports.AbstractGenerator = AbstractGenerator;
