const { AbstractTemplate } = require("../templateEngine/AbstractTemplate.js");
const {
    StringNode,
    ObjectNode,
    BasicNode,
    ConcatenateNode,
    DecorateNode,
    ArithmeticNode,
    OneToOneNode,
    ArrayNode,
} = require("../tool/elements.js");
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
                            "subject_id" // the key for foreign table to join with primary table
                            // true // it mean the foreign table is sorted by the key , so the script can run faster
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
        this.extension = new ObjectNode({
            anchor_year: new BasicNode("patient", "anchor_year"),
            anchor_year_group: new BasicNode("patient", "anchor_year_group"),
        });
        this.null = new ArrayNode([
            new StringNode("active"),
            new StringNode("telecom"),
            new ObjectNode({
                "deceased[x]": new ArrayNode([
                    new StringNode("deceasedBoolean"),
                    new StringNode("deceasedDateTime"),
                ]),
            }),
            new StringNode("address"),
            new StringNode("maritalStatus"),
            new ObjectNode({
                "multipleBirth[x]": new ArrayNode([
                    new StringNode("multipleBirthBoolean"),
                    new StringNode("multipleBirthInteger"),
                ]),
            }),
            new StringNode("photo"),
            new ObjectNode({
                communication: new ArrayNode([
                    new StringNode("language"),
                    new StringNode("preferred"),
                ]),
            }),
            new StringNode("generalPractitioner"),
            new ObjectNode({
                link: new ArrayNode([
                    new StringNode("other"),
                    new StringNode("type"),
                ]),
            }),
        ]);
    }
}

module.exports = {
    Template,
};
