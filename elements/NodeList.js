const { BooleanNode } = require("./FixedNode/BooleanNode");
const { NullNode } = require("./FixedNode/NullNode");
const { StringNode } = require("./FixedNode/StringNode");
const { UndefinedNode } = require("./FixedNode/UndefinedNode");
const { NumberNode } = require("./FixedNode/NumberNode");
const { DateNode } = require("./FixedNode/DateNode");

const nodeList = {
    BooleanNode,
    NullNode,
    StringNode,
    UndefinedNode,
    NumberNode,
    DateNode,
};

module.exports.nodeList = nodeList;
