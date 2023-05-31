class AbstractTemplate {
    // the abstract class of template

    static nodeModule = require("../tool/elements.js")["ImportModule"].load();
    static templateConfig = {
        // override the config by the custom template
        source: {}, // include all the source files , nickname : filename(only the filename and file extension)
        primaryTable: "", // the primary table of this template
    };

    constructor() {
        if (this.constructor == AbstractTemplate) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        // write the template here (this.attributeName = new Node() ...)
    }
}

module.exports = {
    AbstractTemplate,
};
