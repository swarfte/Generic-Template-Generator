class AbstractTemplate {
    // the abstract class of template
    static templateConfig = {
        // config used by generator
        source: {}, // include all the source files , nickname : filename(only the filename)
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
