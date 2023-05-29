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
    parseNode(key, value, record, database) {}
}

class AbstractFixedNode extends AbstractNode {
    constructor(data) {
        super(data);
        if (this.constructor == AbstractFixedNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    parseNode(key, value, record, database) {
        return this.getData();
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

class AbstractStructureNode extends AbstractNode {
    constructor(data) {
        super(data);
        if (this.constructor == AbstractStructureNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    parseNode(key, value, record, database) {
        let result = null;
        if (this.data instanceof Array) {
            result = [];
            for (const element of this.data) {
                result.push(element.parseNode(key, value, record, database));
            }
        } else if (this.data instanceof Object) {
            result = {};
            for (const [key, value] of Object.entries(this.data)) {
                result[key] = value.parseNode(key, value, record, database);
            }
        }
        return result;
    }
}

class ArrayNode extends AbstractStructureNode {
    constructor(data) {
        super(data);
    }
}

class ObjectNode extends AbstractStructureNode {
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

    generateData(record, database) {
        // the data is generated here
    }

    getData() {
        return this.data;
    }

    parseNode(key, value, record, database) {
        this.generateData(record, database);
        return this.getData();
    }
}

class BasicNode extends AbstractDynamicNode {
    constructor(filename, attributes) {
        super(filename, attributes);
    }

    generateData(record, database) {}
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
    AbstractStructureNode,
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
