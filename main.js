const fs = require("fs");

function generateTemplate() {
    // used for generating a template
    const templateName = process.argv.slice(2)[0]; // the first argument is the template name (without .js)
    let generatorName = process.argv.slice(2)[1]; // the second argument is the generator format name (such as json, ndjson, csv)

    if (generatorName === undefined) {
        // the default generator format is json
        generatorName = "json";
    }

    // dynamically import the generator
    const Generator = require("./tool/generator.js")[
        generatorName + "Generator"
    ];

    new Generator(templateName).run();
}

function initializeEnvironment(folderList) {
    let isInitialized = true;
    // used for create the directories if they don't exist
    for (const folder of folderList) {
        if (!fs.existsSync("./" + folder)) {
            fs.mkdirSync("./" + folder);
            isInitialized = false;
        }
    }

    return isInitialized;
}

const folderList = ["template", "source", "output", "demo"];
if (initializeEnvironment(folderList)) {
    generateTemplate();
}
