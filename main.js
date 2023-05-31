var Generator = require("./tool/generator.js")["ImportModule"].load();

const args = process.argv.slice(2)[0];
const generator = new jsonGenerator(args).run();
