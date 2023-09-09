const fs = require("fs");
const {
    jsonGenerator,
    ndjsonGenerator,
    csvGenerator,
    xlsxGenerator,
    xmlGenerator,
} = require("./tool/generator.js");

function getGenerator(generatorName) {
    // used for getting the generator
    switch (generatorName) {
        case "json":
            return jsonGenerator;
        case "ndjson":
            return ndjsonGenerator;
        case "csv":
            return csvGenerator;
        case "xlsx":
            return xlsxGenerator;
        case "xml":
            return xmlGenerator;
        default:
            throw new Error("Invalid generator name.");
    }
}

function generateTemplate() {
    // used for generating a template
    const templateName = process.argv.slice(2)[0]; // the first argument is the template name (without .js)
    let generatorName = process.argv.slice(2)[1]; // the second argument is the generator format name (such as json,xlsx, csv)

    // dynamically import the generator
    const GeneratorType = getGenerator(generatorName);

    // run the generator
    const Generator = new GeneratorType(templateName);
    Generator.run();
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
