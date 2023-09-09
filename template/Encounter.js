const { AbstractTemplate } = require("../templateEngine/AbstractTemplate.js");
const {
    StringNode,
    ObjectNode,
    BasicNode,
    ConcatenateNode,
    DecorateNode,
    SingleSearchNode,
    OneToOneNode,
    ArrayNode,
} = require("../tool/elements.js");

class Template extends AbstractTemplate {
    static templateConfig = {
        source: {
            admission: "admissions.csv",
            location: "location.ndjson",
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
        this.extension = new ObjectNode({
            deathtime: new BasicNode("admission", "deathtime"),
            insurance: new BasicNode("admission", "insurance"),
            language: new BasicNode("admission", "language"),
            marital_status: new BasicNode("admission", "marital_status"),
            race: new BasicNode("admission", "race"),
            edregtime: new BasicNode("admission", "edregtime"),
            edouttime: new BasicNode("admission", "edouttime"),
            hospital_expire_flag: new BasicNode(
                "admission",
                "hospital_expire_flag"
            ),
        });
        this.null = new ArrayNode([
            new StringNode("status"),
            new StringNode("type"),
            new StringNode("serviceType"),
            new StringNode("subjectStatus"),
            new StringNode("episodeOfCare"),
            new StringNode("basedOn"),
            new ObjectNode({
                participant: new ArrayNode([
                    new StringNode("type"),
                    new StringNode("period"),
                    new StringNode("actor"),
                ]),
            }),
            new StringNode("appointment"),
            new StringNode("virtualService"),
            new StringNode("actualPeriod"),
            new StringNode("plannedStartDate"),
            new StringNode("plannedEndDate"),
            new StringNode("length"),
            new ObjectNode({
                reason: new ArrayNode([
                    new StringNode("use"),
                    new StringNode("value"),
                ]),
            }),
            new ObjectNode({
                diagonsis: new ArrayNode([
                    new StringNode("condition"),
                    new StringNode("use"),
                ]),
            }),
            new StringNode("account"),
            new StringNode("dietPreference"),
            new StringNode("specialArrangement"),
            new StringNode("specialCourtesy"),
            new ObjectNode({
                admission: new ArrayNode([
                    new StringNode("preAdmissionIdentifier"),
                    new StringNode("origin"),
                    new StringNode("reAdmission"),
                    new StringNode("destination"),
                    new StringNode("dischargeDisposition"),
                ]),
            }),
        ]);
    }
}

module.exports = {
    Template,
};
