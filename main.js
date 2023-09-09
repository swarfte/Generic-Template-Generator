const fs = require("fs");

const { getGenerator } = require("./generators/GeneratorList");

/**
 * the abstract class for the adapter
 */
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

/**
 *  initialize the environment
 * @param {String[]} folderList
 * @returns {Boolean}
 */
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

/**
 * the main function
 */
function start() {
    const folderList = ["template", "source", "output", "demo"];
    if (initializeEnvironment(folderList)) {
        generateTemplate();
    }
}

start();
