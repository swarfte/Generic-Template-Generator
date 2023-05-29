var jsonGenerator = require("./tool/generator.js")["jsonGenerator"];

const args = process.argv.slice(2)[0];
const generator = new jsonGenerator(args).run();
