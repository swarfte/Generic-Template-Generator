var AbstractTemplate = require("../tool/template.js")["AbstractTemplate"];

var Nodes = require("../tool/elements.js");
var StringNode = Nodes["StringNode"];
var BasicNode = Nodes["BasicNode"];
var ObjectNode = Nodes["ObjectNode"];
var ArrayNode = Nodes["ArrayNode"];
class Template extends AbstractTemplate {
    static templateConfig = {
        source: {
            patient: "patients.csv",
        },
        primaryTable: "patient",
    };
    constructor() {
        super();
        this.resourceType = new StringNode("Patient");
        this.identifier = new ObjectNode({
            value: new BasicNode("patient", "subject_id"),
        });
        this.gender = new BasicNode("patient", "gender");
        this.managingOrganization = new ObjectNode({
            reference: new StringNode("Organization_1194052720"),
        });
    }
}

module.exports = {
    Template,
};
