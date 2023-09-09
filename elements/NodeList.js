const { BooleanNode } = require("./FixedNode/BooleanNode");
const { NullNode } = require("./FixedNode/NullNode");
const { StringNode } = require("./FixedNode/StringNode");
const { UndefinedNode } = require("./FixedNode/UndefinedNode");
const { NumberNode } = require("./FixedNode/NumberNode");
const { DateNode } = require("./FixedNode/DateNode");
const { ObjectNode } = require("./StructureNode/ObjectNode");
const { ArrayNode } = require("./StructureNode/ArrayNode");
const { ArithmeticNode } = require("./StructureNode/ArithmeticNode");
const { ConcatenateNode } = require("./StructureNode/ConcatenateNode");
const { DecorateNode } = require("./StructureNode/DecorateNode");

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
};

module.exports.nodeList = nodeList;
