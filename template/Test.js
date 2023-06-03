var AbstractTemplate = require("../tool/template.js")["AbstractTemplate"];

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
