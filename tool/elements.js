class AbstractNode {
    constructor(fileName, attributes) {
        // let it be abstract class
        if (this.constructor == AbstractNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.fileName = fileName;
        this.attributes = attributes;
        this.data = null;
    }

    getData() {
        return this.data;
    }
}

class BasicNode extends AbstractNode {
    constructor(fileName, attributes) {
        super(fileName, attributes);
    }

    generateData() {}
}

class OneToOneNode extends AbstractNode {
    constructor(fileName, attributes, foreignFileName, foreignAttributes) {
        super(fileName, attributes);
        this.foreignFileName = foreignFileName;
        this.foreignAttributes = foreignAttributes;
    }

    generateData() {}
}

class OneToManyNode extends AbstractNode {
    constructor(fileName, attributes, foreignFileName, foreignAttributes) {
        super(fileName, attributes);
        this.foreignFileName = foreignFileName;
        this.foreignAttributes = foreignAttributes;
    }

    generateData() {}
}

module.exports = {
    AbstractNode,
    BasicNode,
    OneToOneNode,
    OneToManyNode,
};
