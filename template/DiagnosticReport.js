const {
    DecorateNode,
    StringNode,
    ArrayNode,
    ObjectNode,
    ConcatenateNode,
    BasicNode,
    OneToOneNode,
} = require("../tool/elements.js");

const { AbstractTemplate } = require("../templateEngine/AbstractTemplate.js");

class Template extends AbstractTemplate {
    static templateConfig = {
        source: {
            diagnoses_icd: "diagnoses_icd.csv",
            d_icd_diagnoses: "d_icd_diagnoses.csv",
        },
        primaryTable: "diagnoses_icd",
    };

    constructor() {
        super();
        this.resourceType = new StringNode("DiagnosticReport");
        this.identifier = new ArrayNode([
            new ObjectNode({
                value: new ConcatenateNode([
                    new BasicNode("diagnoses_icd", "subject_id"),
                    new StringNode("-"),
                    new BasicNode("diagnoses_icd", "hadm_id"),
                    new StringNode("-"),
                    new BasicNode("diagnoses_icd", "seq_num"),
                    new StringNode("-"),
                    new BasicNode("diagnoses_icd", "icd_code"),
                    new StringNode("-"),
                    new BasicNode("diagnoses_icd", "icd_version"),
                ]),
            }),
        ]);

        this.category = new DecorateNode(
            new OneToOneNode(
                "diagnoses_icd",
                "icd_code",
                "d_icd_diagnoses",
                "icd_code"
            ),
            (record) => (record ? record["long_title"] : null)
        );

        this.code = new ObjectNode({
            coding: new ArrayNode([
                new ObjectNode({
                    code: new BasicNode("diagnoses_icd", "icd_code"),
                }),
            ]),
        });

        this.subject = new ConcatenateNode([
            new StringNode("Patient"),
            new StringNode("/"),
            new BasicNode("diagnoses_icd", "subject_id"),
        ]);

        this.encounter = new ConcatenateNode([
            new StringNode("Encounter"),
            new StringNode("/"),
            new BasicNode("diagnoses_icd", "hadm_id"),
        ]);

        this.extension = new ObjectNode({});

        this.null = new ArrayNode([
            new StringNode("basedOn"),
            new StringNode("status"),
            new ObjectNode({
                "effective[x]": new ArrayNode([
                    new StringNode("effectiveDateTime"),
                    new StringNode("effectivePeriod"),
                ]),
            }),
            new StringNode("issued"),
            new StringNode("performer"),
            new StringNode("resultsInterpreter"),
            new StringNode("specimen"),
            new StringNode("result"),
            new ObjectNode({
                supportingInfo: new ArrayNode([
                    new StringNode("type"),
                    new StringNode("reference"),
                ]),
            }),
            new ObjectNode({
                media: new ArrayNode([
                    new StringNode("comment"),
                    new StringNode("link"),
                ]),
            }),
            new StringNode("conclusion"),
            new StringNode("conclusionCode"),
            new StringNode("presentedForm"),
        ]);
    }
}

module.exports = {
    Template,
};
