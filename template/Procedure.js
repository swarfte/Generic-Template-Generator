const { AbstractTemplate } = require("../templateEngine/AbstractTemplate.js");
const {
    StringNode,
    ObjectNode,
    BasicNode,
    ConcatenateNode,
    DecorateNode,
    OneToOneNode,
    ArrayNode,
} = require("../tool/elements.js");

class Template extends AbstractTemplate {
    static templateConfig = {
        source: {
            procedure_icd: "procedures_icd.csv",
            procedureevents: "procedureevents.csv",
        },
        primaryTable: "procedure_icd",
    };

    constructor() {
        super();
        this.resourceType = new StringNode("Procedure");
        this.identifier = new ArrayNode([
            new ObjectNode({
                system: new StringNode(
                    "http://fhir.mimic.mit.edu/identifier/procedure"
                ),
                value: new ConcatenateNode([
                    new BasicNode("procedure_icd", "hadm_id"),
                    new StringNode("-"),
                    new BasicNode("procedure_icd", "seq_num"),
                    new StringNode("-"),
                    new BasicNode("procedure_icd", "icd_code"),
                ]),
            }),
        ]);
        this.status = new StringNode("completed");

        this.statusReason = new DecorateNode(
            new OneToOneNode(
                "procedure_icd",
                "subject_id",
                "procedureevents",
                "subject_id"
            ),
            (record) => (record ? record["statusdescription"] : null)
        );

        this.category = new DecorateNode(
            new OneToOneNode(
                "procedure_icd",
                "subject_id",
                "procedureevents",
                "subject_id"
            ),
            (record) => (record ? record["ordercategoryname"] : null)
        );

        this.code = new ObjectNode({
            coding: new ArrayNode([
                new ObjectNode({
                    system: new ConcatenateNode([
                        new StringNode(
                            "http://fhir.mimic.mit.edu/CodeSystem/procedure"
                        ),
                        new StringNode("-"),
                        new StringNode("icd"),
                        new BasicNode("procedure_icd", "icd_version"),
                    ]),
                    code: new BasicNode("procedure_icd", "icd_code"),
                }),
            ]),
        });
        this.subject = new ObjectNode({
            reference: new ConcatenateNode([
                new StringNode("Patient"),
                new StringNode("_"),
                new BasicNode("procedure_icd", "subject_id"),
            ]),
        });
        this.encounter = new ObjectNode({
            reference: new ConcatenateNode([
                new StringNode("Encounter"),
                new StringNode("_"),
                new BasicNode("procedure_icd", "hadm_id"),
            ]),
        });

        this.location = new BasicNode("procedureevents", "location");

        this.location = new DecorateNode(
            new OneToOneNode(
                "procedure_icd",
                "subject_id",
                "procedureevents",
                "subject_id"
            ),
            (record) => (record ? record["location"] : null)
        );

        this.extension = new ObjectNode({
            chartdate: new BasicNode("procedure_icd", "chartdate"),
        });

        this.null = new ArrayNode([
            new StringNode("instantiatesCanonical"),
            new StringNode("instantiatesUri"),
            new StringNode("basedOn"),
            new StringNode("partOf"),
            new StringNode("focus"),
            new ObjectNode({
                occurrence: new ArrayNode([
                    new StringNode("occurrenceDateTime"),
                    new StringNode("occurrencePeriod"),
                    new StringNode("occurrenceString"),
                    new StringNode("occurrenceAge"),
                    new StringNode("occurrenceRange"),
                    new StringNode("occurrenceTiming"),
                ]),
            }),
            new StringNode("recorded"),
            new StringNode("recorder"),
            new ObjectNode({
                reported: new ArrayNode([
                    new StringNode("reportedBoolean"),
                    new StringNode("reportedReference"),
                ]),
            }),
            new ObjectNode({
                performer: new ArrayNode([
                    new StringNode("function"),
                    new StringNode("actor"),
                    new StringNode("onBehalfOf"),
                    new StringNode("period"),
                ]),
            }),
            new StringNode("reason"),
            new StringNode("bodySite"),
            new StringNode("outcome"),
            new StringNode("complication"),
            new StringNode("followUp"),
            new StringNode("note"),
            new ObjectNode({
                focalDevice: new ArrayNode([
                    new StringNode("action"),
                    new StringNode("manipulated"),
                ]),
            }),
            new StringNode("used"),
            new StringNode("supportingInfo"),
        ]);
    }
}

module.exports = {
    Template,
};
