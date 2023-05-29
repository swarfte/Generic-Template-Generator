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
            patient: "patients.csv",
            transfer: "transfers.csv",
        },
        primaryTable: "patient",
    };
    constructor() {
        super();
        this.resourceType = new StringNode("Patient");
        this.identifier = new ArrayNode([
            new ObjectNode({
                value: new BasicNode("patient", "subject_id"),
            }),
        ]);
        this.name = new ArrayNode([
            new ObjectNode({
                family: new ConcatenateNode([
                    new StringNode("Patient_"),
                    new BasicNode("patient", "subject_id"),
                ]),
            }),
        ]);
        this.gender = new BasicNode("patient", "gender");
        this.birthDate = new DecorateNode(
            new ArithmeticNode(
                [
                    new DecorateNode(
                        new OneToOneNode(
                            "patient", // the primary table
                            "subject_id", // the key for primary table to join with foreign table
                            "transfer", // the foreign table
                            "subject_id", // the key for foreign table to join with primary table
                            true // it mean the foreign table is sorted
                        ),
                        (record) => record["intime"]
                    ),
                    new BasicNode("patient", "anchor_age"),
                ],
                (intime, anchor_age) =>
                    new Date(intime).setFullYear(
                        new Date(intime).getFullYear() - anchor_age
                    )
            ),
            (date) => new Date(date).toISOString().split("T")[0]
        );
        this.deceasedDateTime = new BasicNode("patient", "dod");
        this.managingOrganization = new ArrayNode([
            new ObjectNode({
                reference: new StringNode("Organization_1194052720"),
            }),
        ]);
    }
}

module.exports = {
    Template,
};
