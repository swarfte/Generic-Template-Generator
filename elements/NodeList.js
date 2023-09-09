const { BooleanNode } = require("./FixedNode/BooleanNode.js");
const { NullNode } = require("./FixedNode/NullNode.js");
const { StringNode } = require("./FixedNode/StringNode.js");
const { UndefinedNode } = require("./FixedNode/UndefinedNode.js");
const { NumberNode } = require("./FixedNode/NumberNode.js");
const { DateNode } = require("./FixedNode/DateNode.js");
const { ObjectNode } = require("./StructureNode/ObjectNode.js");
const { ArrayNode } = require("./StructureNode/ArrayNode.js");
const { ArithmeticNode } = require("./StructureNode/ArithmeticNode.js");
const { ConcatenateNode } = require("./StructureNode/ConcatenateNode.js");
const { DecorateNode } = require("./StructureNode/DecorateNode.js");
const { OneToOneNode } = require("./DynamicNode/OneToOneNode.js");
const { OneToManyNode } = require("./DynamicNode/OneToManyNode.js");
const { MultipleSearchNode } = require("./DynamicNode/MultipleSearchNode.js");
const { SingleSearchNode } = require("./DynamicNode/SingleSearchNode.js");
const { BasicNode } = require("./DynamicNode/BasicNode.js");

const nodeList = {
    BooleanNode,
    NullNode,
    StringNode,
    UndefinedNode,
    NumberNode,
    DateNode,
    ObjectNode,
    ArrayNode,
    ArithmeticNode,
    DecorateNode,
    ConcatenateNode,
    OneToOneNode,
    OneToManyNode,
    MultipleSearchNode,
    SingleSearchNode,
    BasicNode,
};

module.exports = nodeList;
