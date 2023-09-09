const { AbstractTemplate } = require("../templateEngine/AbstractTemplate.js");
const { BasicNode } = require("../elements/NodeList.js");

class Template extends AbstractTemplate {
    // this is the template for Testing purpose
    static templateConfig = {
        source: {
            patient: "Patient_demo.csv",
        },
        primaryTable: "patient",
    };
    constructor() {
        super();
        this.birthDate = new BasicNode("patient", "birthDate");
    }
}

module.exports = {
    Template,
};
