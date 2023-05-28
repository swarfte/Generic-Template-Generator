var csvAdapter = require("./tool/adapter.js")["csvAdapter"];
var ndjsonAdapter = require("./tool/adapter.js")["ndjsonAdapter"];

const args = process.argv.slice(2);

let adapter = new ndjsonAdapter(args[0]);

//console.log(adapter.getRowData(0));
console.log(adapter.getColumnData("id"));
