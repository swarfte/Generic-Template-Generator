var AbstractTemplate = require("../tool/template.js")["AbstractTemplate"];

var Nodes = require("../tool/elements.js");
var StringNode = Nodes["StringNode"];
var BasicNode = Nodes["BasicNode"];
var ObjectNode = Nodes["ObjectNode"];
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
        //this.gender = new BasicNode("patient", "gender");
        // this.identifier = new ObjectNode({
        //     value: new BasicNode("patient", "id"),
        // });
        this.managingOrganization = new ObjectNode({
            reference: new StringNode("Organization_1194052720"),
        });
    }
}

module.exports = {
    Template,
};
