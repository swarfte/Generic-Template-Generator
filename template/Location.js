const { AbstractTemplate } = require("../tool/template.js");
const {
    StringNode,
    ObjectNode,
    BasicNode,
    DecorateNode,
    OneToOneNode,
    ArrayNode,
} = require("../tool/elements.js");

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
        this.extension = new ObjectNode({
            subject_id: new BasicNode("transfer", "subject_id"),
            hadm_id: new BasicNode("transfer", "hadm_id"),
            transfer_id: new BasicNode("transfer", "transfer_id"),
            eventtype: new BasicNode("transfer", "eventtype"),
            intime: new BasicNode("transfer", "intime"),
            outtime: new BasicNode("transfer", "outtime"),
        });

        this.null = new ArrayNode([
            new StringNode("status"),
            new StringNode("operationalStatus"),
            new StringNode("alias"),
            new StringNode("description"),
            new StringNode("mode"),
            new StringNode("type"),
            new StringNode("contact"),
            new StringNode("address"),
            new StringNode("form"),
            new ObjectNode({
                position: new ArrayNode([
                    new StringNode("longitude"),
                    new StringNode("latitude"),
                    new StringNode("altitude"),
                ]),
            }),
            new StringNode("partOf"),
            new StringNode("characteristic"),
            new StringNode("hoursOfOperation"),
            new StringNode("virtualService"),
            new StringNode("endpoint"),
        ]);
    }
}

module.exports = {
    Template,
};
