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
}

class ArrayNode extends AbstractStructureNode {
    constructor(data) {
        super(data);
    }

    parseNode(key, value, record, database) {
        const result = [];
        for (const element of this.data) {
            result.push(element.parseNode(key, value, record, database));
        }
        return result;
    }
}

class ObjectNode extends AbstractStructureNode {
    constructor(data) {
        super(data);
    }
    parseNode(key, value, record, database) {
        const result = {};
        for (const [key, value] of Object.entries(this.data)) {
            result[key] = value.parseNode(key, value, record, database);
        }
        return result;
    }
}

class ConcatenateNode extends AbstractStructureNode {
    constructor(data) {
        super(data);
    }
    parseNode(key, value, record, database) {
        const result = [];
        for (const element of this.data) {
            result.push(element.parseNode(key, value, record, database));
        }
        return result.join("");
    }
}

class ArithmeticNode extends AbstractStructureNode {
    constructor(data, operation) {
        super(data);
        this.operation = operation;
    }
    parseNode(key, value, record, database) {
        const calculationSequence = [];
        for (const element of this.data) {
            calculationSequence.push(
                element.parseNode(key, value, record, database)
            );
        }
        return calculationSequence.reduce(this.operation);
    }
}

class DecorateNode extends AbstractStructureNode {
    constructor(data, decorator) {
        super(data);
        this.decorator = decorator;
    }
    parseNode(key, value, record, database) {
        return this.decorator(
            this.data.parseNode(key, value, record, database)
        );
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

    generateData(record, database) {
        this.data = record[this.attributes];
    }
}

class OneToOneNode extends AbstractDynamicNode {
    constructor(
        filename,
        attributes,
        foreignFilename,
        foreignAttributes,
        sorted = false
    ) {
        super(filename, attributes);
        this.foreignFileName = foreignFilename;
        this.foreignAttributes = foreignAttributes;
        this.sorted = sorted;
    }

    sequentialSearch(record, database) {
        const foreignKey = record[this.attributes];
        let foreignRecord = null;
        for (const element of database[this.foreignFileName].getData()) {
            if (element[this.attributes] == foreignKey) {
                foreignRecord = element;
                break;
            }
        }
        return foreignRecord[this.foreignAttributes];
    }

    binarySearch(record, database) {
        const foreignKey = record[this.attributes];
        const foreignRecords = database[this.foreignFileName].getData();
        let left = 0;
        let right = foreignRecords.length - 1;
        let middle = Math.floor((left + right) / 2);
        while (left <= right) {
            if (foreignKey == foreignRecords[middle][this.attributes]) {
                return foreignRecords[middle][this.foreignAttributes];
            } else if (foreignKey < foreignRecords[middle][this.attributes]) {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
            middle = Math.floor((left + right) / 2);
        }
        return null;
    }

    generateData(record, database) {
        if (this.sorted == false) {
            this.data = this.sequentialSearch(record, database);
        } else {
            this.data = this.binarySearch(record, database);
        }
    }
}

class OneToManyNode extends AbstractDynamicNode {
    constructor(
        filename,
        attributes,
        foreignFilename,
        foreignAttributes,
        sorted = false
    ) {
        super(filename, attributes);
        this.foreignFileName = foreignFilename;
        this.foreignAttributes = foreignAttributes;
    }

    sequentialSearch(record, database) {
        const foreignKey = record[this.attributes];
        let foreignRecords = [];
        for (const element of database[this.foreignFileName].getData()) {
            if (element[this.attributes] == foreignKey) {
                foreignRecords.push(element[this.foreignAttributes]);
            }
        }
        return foreignRecords;
    }

    binarySearch(record, database) {
        const foreignKey = record[this.attributes];
        const foreignRecords = database[this.foreignFileName].getData();
        let left = 0;
        let right = foreignRecords.length - 1;
        let middle = Math.floor((left + right) / 2);
        while (left <= right) {
            if (foreignKey == foreignRecords[middle][this.attributes]) {
                let foreignRecordsArray = [];
                let i = middle;
                while (
                    i >= 0 &&
                    foreignKey == foreignRecords[i][this.attributes]
                ) {
                    foreignRecordsArray.push(
                        foreignRecords[i][this.foreignAttributes]
                    );
                    i--;
                }
                i = middle + 1;
                while (
                    i < foreignRecords.length &&
                    foreignKey == foreignRecords[i][this.attributes]
                ) {
                    foreignRecordsArray.push(
                        foreignRecords[i][this.foreignAttributes]
                    );
                    i++;
                }
                return foreignRecordsArray;
            } else if (foreignKey < foreignRecords[middle][this.attributes]) {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
            middle = Math.floor((left + right) / 2);
        }
        return null;
    }

    generateData(record, database) {
        if (this.sorted == false) {
            this.data = this.sequentialSearch(record, database);
        } else {
            this.data = this.binarySearch(record, database);
        }
    }
}

module.exports = {
    AbstractNode,
    AbstractFixedNode,
    StringNode,
    NumberNode,
    BooleanNode,
    AbstractStructureNode,
    ArrayNode,
    ObjectNode,
    ConcatenateNode,
    ArithmeticNode,
    DecorateNode,
    AbstractDynamicNode,
    BasicNode,
    OneToOneNode,
    OneToManyNode,
};
