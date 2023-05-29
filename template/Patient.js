var AbstractTemplate = require("./tool/template.js")["AbstractTemplate"];

var Nodes = require("./tool/elements.js");
var StringNode = Nodes["StringNode"];
var BasicNode = Nodes["BasicNode"];
class Template extends AbstractTemplate {
    static templateConfig = {
        source: {
            patient: "patients.csv",
        },
        primaryKey: "patient",
    };
    constructor() {
        super();
        this.resourceType = new StringNode("Patient");
        this.gender = new BasicNode("patient", "gender");
    }
}

module.exports = {
    Template,
};
