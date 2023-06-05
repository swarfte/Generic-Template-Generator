var AbstractTemplate = require("../tool/template.js")["AbstractTemplate"];

class Template extends AbstractTemplate {
    // this is the template for Testing purpose
    static templateConfig = {
        source: {
            book: "books.xml",
        },
        primaryTable: "book",
    };
    constructor() {
        super();
        this.author = new BasicNode("book", "author");
        this.title = new BasicNode("book", "title");
        this.genre = new BasicNode("book", "genre");
        this.price = new BasicNode("book", "price");
        this.priceEvaluation = new DecorateNode(this.price, (price) =>
            price < 10 ? "cheap" : "expensive"
        );
    }
}

module.exports = {
    Template,
};
