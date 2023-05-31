const templateName = process.argv.slice(2)[0]; // the first argument is the template name (without .js)
let generatorName = process.argv.slice(2)[1]; // the second argument is the generator format name (such as json, ndjson, csv)

if (generatorName === undefined) {
    // the default generator format is json
    generatorName = "json";
}

var Generator = require("./tool/generator.js")[generatorName + "Generator"];

const generator = new Generator(templateName).run();
