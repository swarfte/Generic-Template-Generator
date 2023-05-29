class AbstractTemplate {
    static templateConfig = {
        source: {},
        primaryKey: "",
        row: 0,
    };

    constructor() {
        if (this.constructor == AbstractTemplate) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
}

module.exports = {
    AbstractTemplate,
};
