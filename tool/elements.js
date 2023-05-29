class AbstractNode {
    constructor(data) {
        if (this.constructor == AbstractNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.data = data;
    }
    getData() {
        return this.data;
    }
}

class AbstractFixedNode extends AbstractNode {
    constructor(data) {
        super(data);
        if (this.constructor == AbstractFixedNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
}

class StringNode extends AbstractFixedNode {
    constructor(data) {
        super(data);
    }
}

class NumberNode extends AbstractFixedNode {
    constructor(data) {
        super(data);
    }

    getData() {
        return String(this.data);
    }
}

class BooleanNode extends AbstractFixedNode {
    constructor(data) {
        super(data);
    }
    getData() {
        return String(this.data);
    }
}

class ArrayNode extends AbstractFixedNode {
    constructor(data) {
        super(data);
    }
}

class ObjectNode extends AbstractFixedNode {
    constructor(data) {
        super(data);
    }
}

class AbstractDynamicNode extends AbstractNode {
    constructor(filename, attributes) {
        super(null);
        if (this.constructor == AbstractDynamicNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.fileName = filename;
        this.attributes = attributes;
    }

    generateData() {}
}

class BasicNode extends AbstractDynamicNode {
    constructor(filename, attributes) {
        super(filename, attributes);
    }

    generateData() {}
}

class OneToOneNode extends AbstractDynamicNode {
    constructor(filename, attributes, foreignFilename, foreignAttributes) {
        super(filename, attributes);
        this.foreignFileName = foreignFilename;
        this.foreignAttributes = foreignAttributes;
    }

    generateData() {}
}

class OneToManyNode extends AbstractDynamicNode {
    constructor(filename, attributes, foreignFilename, foreignAttributes) {
        super(filename, attributes);
        this.foreignFileName = foreignFilename;
        this.foreignAttributes = foreignAttributes;
    }

    generateData() {}
}

module.exports = {
    AbstractNode,
    AbstractFixedNode,
    StringNode,
    NumberNode,
    BooleanNode,
    ArrayNode,
    ObjectNode,
    AbstractDynamicNode,
    BasicNode,
    OneToOneNode,
    OneToManyNode,
};
