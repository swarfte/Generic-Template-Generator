var Generator = require("./tool/generator.js")["ImportModule"].load();

const templateName = process.argv.slice(2)[0];
const generator = new jsonGenerator(templateName).run();
