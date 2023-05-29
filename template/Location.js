var AbstractTemplate = require("../tool/template.js")["AbstractTemplate"];
var Nodes = require("../tool/elements.js");
var StringNode = Nodes["StringNode"];
var BasicNode = Nodes["BasicNode"];
var ObjectNode = Nodes["ObjectNode"];
var ArrayNode = Nodes["ArrayNode"];
var ConcatenateNode = Nodes["ConcatenateNode"];
var ArithmeticNode = Nodes["ArithmeticNode"];
var OneToOneNode = Nodes["OneToOneNode"];
var DecorateNode = Nodes["DecorateNode"];

class Template extends AbstractTemplate {
    static templateConfig = {
        source: {
            location: "location.ndjson",
            transfer: "transfers.csv",
        },
        primaryTable: "transfer",
    };
    constructor() {
        super();
        this.resourceType = new StringNode("Location");
        this.id = new DecorateNode(
            new OneToOneNode("transfer", "careunit", "location", "name"),
            (record) => (record ? record["id"] : null)
        );
        this.name = new BasicNode("transfer", "careunit");
        this.managingOrganization = new ObjectNode({
            reference: new StringNode("Organization_1194052720"),
        });
    }
}

module.exports = {
    Template,
};
