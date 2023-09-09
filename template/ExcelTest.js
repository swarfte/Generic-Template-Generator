const { AbstractTemplate } = require("../templateEngine/AbstractTemplate.js");
const {
    BasicNode,
    DecorateNode,
    ArithmeticNode,
} = require("../elements/NodeList.js");

class Template extends AbstractTemplate {
    // this is the template for Testing purpose
    static templateConfig = {
        source: {
            sample: "mydata.xlsx",
        },
        primaryTable: "sample",
    };
    constructor() {
        super();
        this.region = new BasicNode("sample", "Region");
        this.rep = new BasicNode("sample", "Rep");
        this.item = new BasicNode("sample", "Item");
        this.units = new BasicNode("sample", "Units");
        this.unitCost = new BasicNode("sample", "UnitCost");
        this.totalCost = new BasicNode("sample", "Total");
        this.whetherToDeal = new DecorateNode(
            new ArithmeticNode(
                [
                    new BasicNode("sample", "Units"),
                    new BasicNode("sample", "UnitCost"),
                ],
                (a, b) => a * b
            ),
            (value) => (Number(value.toFixed(2)) > 500 ? "Yes" : "No")
        );
    }
}

module.exports = {
    Template,
};
