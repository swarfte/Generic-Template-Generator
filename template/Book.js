const { StringNode, DecorateNode, BasicNode } = require("../tool/elements.js");
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
    }
}

module.exports = {
    Template,
};
