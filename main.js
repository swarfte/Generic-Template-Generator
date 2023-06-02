const fs = require("fs");

function generateTemplate() {
    // used for generating a template
    if (
        // check if the template, source and output directories exist
        fs.existsSync("./template") &&
        fs.existsSync("./source") &&
        fs.existsSync("./output")
    ) {
        const templateName = process.argv.slice(2)[0]; // the first argument is the template name (without .js)
        let generatorName = process.argv.slice(2)[1]; // the second argument is the generator format name (such as json, ndjson, csv)

        if (generatorName === undefined) {
            // the default generator format is json
            generatorName = "json";
        }

        const Generator = require("./tool/generator.js")[
            generatorName + "Generator"
        ];

        new Generator(templateName).run();
    }
}

function initializeEnvironment() {
    // used for create the directories if they don't exist
    if (!fs.existsSync("./template")) {
        // create the template directory if it doesn't exist
        fs.mkdirSync("./template");
        return false;
    }

    if (!fs.existsSync("./source")) {
        // create the source directory if it doesn't exist
        fs.mkdirSync("./source");
        return false;
    }

    if (!fs.existsSync("./output")) {
        // create the output directory if it doesn't exist
        fs.mkdirSync("./output");
        return false;
    }
    return true;
}

if (initializeEnvironment()) {
    generateTemplate();
}
