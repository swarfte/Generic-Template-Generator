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
var SingleSearchNode = Nodes["SingleSearchNode"];

class Template extends AbstractTemplate {
    static templateConfig = {
        source: {
            admission: "admissions.csv",
            location: "Location.ndjson",
            transfer: "transfers.csv",
        },
        primaryTable: "admission",
    };
    constructor() {
        super();
        this.resourceType = new StringNode("Encounter");
        this.identifier = new ObjectNode({
            value: new BasicNode("admission", "hadm_id"),
            assigner: new ObjectNode({
                reference: new StringNode("Organization_1194052720"),
            }),
        });
        this.class = new ObjectNode({
            code: new BasicNode("admission", "admission_type"),
        });
        this.priority = new ObjectNode({
            coding: new ObjectNode({
                code: new BasicNode("admission", "admission_type"),
            }),
        });
        this.subject = new ObjectNode({
            reference: new ConcatenateNode([
                new StringNode("Patient_"),
                new BasicNode("admission", "subject_id"),
            ]),
        });
        this.period = new ObjectNode({
            start: new BasicNode("admission", "admittime"),
            end: new BasicNode("admission", "dischtime"),
        });
        this.hospitalization = new ObjectNode({
            admitSource: new ObjectNode({
                coding: new ObjectNode({
                    code: new BasicNode("admission", "admission_location"),
                }),
            }),
            dischargeDisposition: new ObjectNode({
                coding: new ObjectNode({
                    code: new BasicNode("admission", "discharge_location"),
                }),
            }),
            location: new ObjectNode({
                location: new ObjectNode({
                    reference: new DecorateNode(
                        new ConcatenateNode([
                            new StringNode("Location_"),
                            new DecorateNode(
                                new SingleSearchNode(
                                    "location",
                                    "name",
                                    new DecorateNode(
                                        new OneToOneNode(
                                            "admission",
                                            "hadm_id",
                                            "transfer",
                                            "hadm_id"
                                        ),
                                        (record) => record["careunit"]
                                    )
                                ),
                                (record) => (record ? record["id"] : null)
                            ),
                        ]),
                        (result) => (result == "Location_" ? null : result)
                    ),
                    period: new ObjectNode({
                        start: new DecorateNode(
                            new OneToOneNode(
                                "admission",
                                "hadm_id",
                                "transfer",
                                "hadm_id"
                            ),
                            (record) => record["intime"]
                        ),
                        end: new DecorateNode(
                            new OneToOneNode(
                                "admission",
                                "hadm_id",
                                "transfer",
                                "hadm_id"
                            ),
                            (record) => record["outtime"]
                        ),
                    }),
                }),
            }),
        });
        this.serviceProvider = new ObjectNode({
            reference: new StringNode("Organization_1194052720"),
        });
    }
}

module.exports = {
    Template,
};
