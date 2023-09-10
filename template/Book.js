const {
    StringNode,
    DecorateNode,
    BasicNode,
    RandomIntNode,
    RandomFloatNode,
    NumberNode,
} = require("../elements/NodeList.js");

const { AbstractTemplate } = require("../templateEngine/AbstractTemplate.js");

class Template extends AbstractTemplate {
    // this is the template for Testing purpose
    static templateConfig = {
        source: {
            book: "books.json",
        },
        primaryTable: "book",
    };

    constructor() {
        super();
        this.resourceType = new StringNode("Book");
        this.title = new BasicNode("book", "title");
        this.type = new DecorateNode(new BasicNode("book", "page"), (page) =>
            page > 100 ? "long" : "short"
        );
        this.author = new BasicNode("book", "author");
        this.country = new BasicNode("book", "country");
        this.language = new BasicNode("book", "language");
        this.existYear = new DecorateNode(
            new BasicNode("book", "year"),
            (year) => (2023 - year).toString()
        );
        this.score = new DecorateNode(
            new RandomFloatNode(
                new RandomIntNode(new NumberNode(10), new NumberNode(45)),
                new RandomIntNode(45, 100)
            ),
            (score) => score.toFixed(1)
        );
        this.numberOfViews = new StringNode(new RandomIntNode(0, 10000));
    }
}

module.exports = {
    Template,
};
