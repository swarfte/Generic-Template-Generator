var sortedDatabase = {
    // the sorted database
};
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
    parseNode(key, value, record, database) {
        // the main function of the node , it is used to parse the data according to the node
        // key is the attribute name of the template
        // value is the node of the template
        // record is the record of the primary table
        // database contains all the records of all tables
    }
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
    // the abstract class for all dynamic node , it will generate the data according to database (without FK)
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

class AbstractDynamicRelationNode extends AbstractDynamicNode {
    // the abstract class for all dynamic relation node , it will generate the data according to the record and the reference table (for FK)
    constructor(filename, attributes) {
        super(filename, attributes);
        if (this.constructor == AbstractDynamicRelationNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    sortMethod(attribute) {
        return (a, b) => {
            if (typeof a[attribute] == "string") {
                return a[attribute].localeCompare(b[attribute]);
            }
            if (typeof a[attribute] == "number") {
                return a[attribute] - b[attribute];
            }
        };
    }
    InitializedSortedDatabase(record, database) {}
    unsortedSearch(record, database) {}
    sortedSearch(record, database) {}
    generateData(record, database) {
        // we need to search the data first before get the data
        this.data = this.sorted
            ? this.sortedSearch(record, database)
            : this.unsortedSearch(record, database);
    }
}

class AbstractDynamicRelationReferenceNode extends AbstractDynamicRelationNode {
    constructor(
        filename,
        attributes,
        foreignFilename,
        foreignAttributes,
        sorted = false
    ) {
        super(filename, attributes);
        if (this.constructor == AbstractDynamicRelationReferenceNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.foreignFileName = foreignFilename; // the filename of the foreign table
        this.foreignAttributes = foreignAttributes; // the attributes of the foreign record
        this.sorted = sorted; // whether the foreign table is sorted
    }
    InitializedSortedDatabase(record, database) {
        if (!(this.foreignFileName in sortedDatabase)) {
            // the table is not in the sorted database , we need to sort it first
            sortedDatabase[this.foreignFileName] = {};
        }
        if (!(this.foreignAttributes in sortedDatabase[this.foreignFileName])) {
            // the attribute is not in the sorted table , we need to sort it first
            sortedDatabase[this.foreignFileName][this.foreignAttributes] = {};
            const sortedTable = structuredClone(
                database[this.foreignFileName].getData()
            );
            sortedTable.sort(this.sortMethod(this.foreignAttributes));
            sortedDatabase[this.foreignFileName][this.foreignAttributes] =
                sortedTable; // the sorted table is only for the current attribute , different attribute will have different sorted table
        }

        return sortedDatabase[this.foreignFileName][this.foreignAttributes]; // this a sorted table (array)
    }
    unsortedSearch(record, database) {
        const sortedTable = this.InitializedSortedDatabase(record, database);
        database[this.foreignFileName].setData(sortedTable); // we need to set the sorted table to the foreign table
        return this.sortedSearch(record, database);
    }
}
class OneToOneNode extends AbstractDynamicRelationReferenceNode {
    // the node for one to one relationship
    constructor(
        filename,
        attributes,
        foreignFilename,
        foreignAttributes,
        sorted = false
    ) {
        super(filename, attributes, foreignFilename, foreignAttributes, sorted);
    }

    sortedSearch(record, database) {
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
}

class OneToManyNode extends AbstractDynamicRelationReferenceNode {
    // the node for one to many relationship
    constructor(
        filename,
        attributes,
        foreignFilename,
        foreignAttributes,
        sorted = false
    ) {
        super(filename, attributes, foreignFilename, foreignAttributes, sorted);
    }

    sortedSearch(record, database) {
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
}

class AbstractDynamicRelationSearchNode extends AbstractDynamicRelationNode {
    constructor(filename, attributes, searchData, sorted = false) {
        super(filename, attributes);
        if (this.constructor == AbstractDynamicRelationSearchNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.searchData = searchData; // the search data that will be used to search the record
        this.sorted = sorted; // whether the table is sorted
    }

    InitializedSortedDatabase(record, database) {
        if (!(this.fileName in sortedDatabase)) {
            // the table is not in the sorted database , we need to sort it first
            sortedDatabase[this.fileName] = {};
        }
        if (!(this.attributes in sortedDatabase[this.fileName])) {
            // the attribute is not in the sorted table , we need to sort it first
            sortedDatabase[this.fileName][this.attributes] = {};
            const sortedTable = structuredClone(
                database[this.fileName].getData()
            );

            sortedTable.sort(this.sortMethod(this.attributes));
            sortedDatabase[this.fileName][this.attributes] = sortedTable; // the sorted table is only for the current attribute , different attribute will have different sorted table
        }
        return sortedDatabase[this.fileName][this.attributes]; // this a sorted table (array)
    }

    unsortedSearch(record, database) {
        const sortedTable = this.InitializedSortedDatabase(record, database);
        database[this.fileName].setData(sortedTable); // we need to set the sorted table to the foreign table
        return this.sortedSearch(record, database);
    }

    deconstructNode(key, value, record, database) {
        if (this.searchData instanceof AbstractNode) {
            this.searchData = this.searchData.parseNode(
                key,
                value,
                record,
                database
            );
        }
    }

    parseNode(key, value, record, database) {
        // we need to generate the data first before get the data
        this.deconstructNode(key, value, record, database);
        this.generateData(record, database);
        return this.getData();
    }
}

class SingleSearchNode extends AbstractDynamicRelationSearchNode {
    // return only one record from the specified table via the search data of the specified attributes
    constructor(filename, attributes, searchData, sorted = false) {
        super(filename, attributes, searchData, sorted);
    }

    sortedSearch(record, database) {
        // the binarySearch function for searching the record if the table is sorted , it is more efficient than sequentialSearch
        const records = database[this.fileName].getData();

        let left = 0;
        let right = records.length - 1;
        while (left <= right) {
            const middle = Math.floor((left + right) / 2);
            if (records[middle][this.attributes] == this.searchData) {
                return records[middle];
            } else if (records[middle][this.attributes] < this.searchData) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return null;
    }
}

class MultipleSearchNode extends AbstractDynamicRelationSearchNode {
    // return multiple records as a list from the specified table via the search data of the specified attributes
    constructor(filename, attributes, searchData, sorted = false) {
        super(filename, attributes, searchData, sorted);
    }

    sortedSearch(record, database) {
        // the binarySearch function for searching the record if the table is sorted , it is more efficient than sequentialSearch
        const records = database[this.fileName].getData();
        let left = 0;
        let right = records.length - 1;
        while (left <= right) {
            const middle = Math.floor((left + right) / 2);
            if (records[middle][this.attributes] == this.searchData) {
                let recordsList = [];
                let current = middle;
                while (
                    current >= 0 &&
                    records[current][this.attributes] == this.searchData
                ) {
                    recordsList.push(records[current]);
                    current--;
                }
                current = middle + 1;
                while (
                    current < records.length &&
                    records[current][this.attributes] == this.searchData
                ) {
                    recordsList.push(records[current]);
                    current++;
                }
                return recordsList;
            } else if (records[middle][this.attributes] < this.searchData) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return null;
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
    AbstractDynamicRelationNode,
    AbstractDynamicRelationReferenceNode,
    OneToOneNode,
    OneToManyNode,
    AbstractDynamicRelationSearchNode,
    SingleSearchNode,
    MultipleSearchNode,
};
