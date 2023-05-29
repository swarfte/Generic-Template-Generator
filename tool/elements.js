class AbstractNode {
    // the abstract class for all nde
    constructor(data) {
        if (this.constructor == AbstractNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.data = data; // the data of the node
    }
    getData() {
        // get the data of the node
        return this.data;
    }
    parseNode(key, value, record, database) {} // the main function of the node , it is used to parse the data according to the node
}

class AbstractFixedNode extends AbstractNode {
    // the abstract class for all fixed node
    constructor(data) {
        super(data);
        if (this.constructor == AbstractFixedNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    parseNode(key, value, record, database) {
        // due to the fixed node has no need to parse the data , so it will return the data directly
        return this.getData();
    }
}

class StringNode extends AbstractFixedNode {
    // the node for string
    constructor(data) {
        super(data);
    }
}

class NumberNode extends AbstractFixedNode {
    // the node for number
    constructor(data) {
        super(data);
    }

    getData() {
        return String(this.data);
    }
}

class BooleanNode extends AbstractFixedNode {
    // the node for boolean
    constructor(data) {
        super(data);
    }
    getData() {
        return String(this.data);
    }
}

class AbstractStructureNode extends AbstractNode {
    // the abstract class for all structure node , it includes another node for parsing the data
    constructor(data) {
        super(data);
        if (this.constructor == AbstractStructureNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
}

class ArrayNode extends AbstractStructureNode {
    // the node for array
    constructor(data) {
        super(data);
    }

    parseNode(key, value, record, database) {
        // use the for loop to parse the data
        const result = [];
        for (const element of this.data) {
            result.push(element.parseNode(key, value, record, database));
        }
        return result;
    }
}

class ObjectNode extends AbstractStructureNode {
    // the node for object
    constructor(data) {
        super(data);
    }
    parseNode(key, value, record, database) {
        // use the [key, value] of the object to parse the data
        const result = {};
        for (const [key, value] of Object.entries(this.data)) {
            result[key] = value.parseNode(key, value, record, database);
        }
        return result;
    }
}

class ConcatenateNode extends AbstractStructureNode {
    // the node for concatenate tow or more nodes as a string
    constructor(data) {
        super(data);
    }
    parseNode(key, value, record, database) {
        // use the for loop to parse the data and concatenate them
        const result = [];
        for (const element of this.data) {
            result.push(element.parseNode(key, value, record, database));
        }
        return result.join("");
    }
}

class ArithmeticNode extends AbstractStructureNode {
    // the node for arithmetic
    constructor(data, operation) {
        super(data);
        this.operation = operation; // the operation of the arithmetic , it is a function that can be used to calculate the data
    }
    parseNode(key, value, record, database) {
        // use the for loop to parse the data and calculate them
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
    // the node for decorate the inner node
    constructor(data, decorator) {
        super(data);
        this.decorator = decorator; // the decorator of the node , it is a function that can be used to decorate the data , such as add a prefix or suffix
    }
    parseNode(key, value, record, database) {
        // use the decorator node as a decorator to parse the data
        return this.decorator(
            this.data.parseNode(key, value, record, database)
        );
    }
}

class AbstractDynamicNode extends AbstractNode {
    // the abstract class for all dynamic node , it will generate the data according to the record and database
    constructor(filename, attributes) {
        super(null);
        if (this.constructor == AbstractDynamicNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.fileName = filename; // the filename of the table
        this.attributes = attributes; // the attributes of the record
    }

    generateData(record, database) {
        // the function for generating the data , it will be implemented in the subclass
    }

    getData() {
        return this.data;
    }

    parseNode(key, value, record, database) {
        // we need to generate the data first before get the data
        this.generateData(record, database);
        return this.getData();
    }
}

class BasicNode extends AbstractDynamicNode {
    // the node for get data from the record directly
    constructor(filename, attributes) {
        super(filename, attributes);
    }

    generateData(record, database) {
        // just get the data from the record
        this.data = record[this.attributes];
    }
}

class OneToOneNode extends AbstractDynamicNode {
    // the node for one to one relationship
    constructor(
        filename,
        attributes,
        foreignFilename,
        foreignAttributes,
        sorted = false
    ) {
        super(filename, attributes);
        this.foreignFileName = foreignFilename; // the filename of the foreign table
        this.foreignAttributes = foreignAttributes; // the attributes of the foreign record
        this.sorted = sorted; // whether the foreign table is sorted
    }

    sequentialSearch(record, database) {
        // the sequentialSearch function for searching the foreign record if the foreign table is not sorted , it is more generic
        const foreignKey = record[this.attributes];
        for (const element of database[this.foreignFileName].getData()) {
            if (element[this.foreignAttributes] == foreignKey) {
                return element;
            }
        }
        return null;
    }

    binarySearch(record, database) {
        // the binarySearch function for searching the foreign record if the foreign table is sorted , it is more efficient than sequentialSearch
        const foreignKey = record[this.attributes];
        const foreignRecords = database[this.foreignFileName].getData();
        let left = 0;
        let right = foreignRecords.length - 1;
        while (left <= right) {
            const middle = Math.floor((left + right) / 2);
            if (foreignRecords[middle][this.foreignAttributes] == foreignKey) {
                return foreignRecords[middle];
            } else if (
                foreignRecords[middle][this.foreignAttributes] < foreignKey
            ) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return null;
    }

    generateData(record, database) {
        // generate the data according to the record and database
        if (this.sorted == false) {
            this.data = this.sequentialSearch(record, database);
        } else {
            this.data = this.binarySearch(record, database);
        }
    }
}

class OneToManyNode extends AbstractDynamicNode {
    // the node for one to many relationship
    constructor(
        filename,
        attributes,
        foreignFilename,
        foreignAttributes,
        sorted = false
    ) {
        super(filename, attributes);
        this.foreignFileName = foreignFilename; // the filename of the foreign table
        this.foreignAttributes = foreignAttributes; // the attributes of the foreign record
        this.sorted = sorted; // whether the foreign table is sorted
    }

    sequentialSearch(record, database) {
        // the sequentialSearch function for searching the foreign record if the foreign table is not sorted , it is more generic
        const foreignKey = record[this.attributes];
        let foreignRecords = [];
        for (const element of database[this.foreignFileName].getData()) {
            if (element[this.foreignAttributes] == foreignKey) {
                foreignRecords.push(element);
            }
        }
        return foreignRecords;
    }

    binarySearch(record, database) {
        //
        // the binarySearch function for searching the foreign record if the foreign table is sorted , it is more efficient than sequentialSearch
        const foreignKey = record[this.attributes];
        const foreignRecords = database[this.foreignFileName].getData();
        let left = 0;
        let right = foreignRecords.length - 1;
        while (left <= right) {
            const middle = Math.floor((left + right) / 2);
            if (foreignRecords[middle][this.foreignAttributes] == foreignKey) {
                let foreignRecordsList = [];
                let current = middle;
                while (
                    current >= 0 &&
                    foreignRecords[current][this.foreignAttributes] ==
                        foreignKey
                ) {
                    foreignRecordsList.push(foreignRecords[current]);
                    current--;
                }
                current = middle + 1;
                while (
                    current < foreignRecords.length &&
                    foreignRecords[current][this.foreignAttributes] ==
                        foreignKey
                ) {
                    foreignRecordsList.push(foreignRecords[current]);
                    current++;
                }
                return foreignRecordsList;
            } else if (
                foreignRecords[middle][this.foreignAttributes] < foreignKey
            ) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return null;
    }

    generateData(record, database) {
        // generate the data according to the record and database
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