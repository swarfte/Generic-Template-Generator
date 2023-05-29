var Generator = require("./tool/generator.js")["Generator"];

const args = process.argv.slice(2)[0];
const generator = new Generator(args).run();
