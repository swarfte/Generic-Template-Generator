# Generic Template Generator

## How to use

### setup

> -   npm install
> -   node main.js

### create template

> -   create a new .js file in the template folder
> -   import the node modules from tool/element.js
> -   create a new class named "Template"
> -   set the config in templateConfig ( reference to the template.js)
> -   use the node to construct the template according to your customer need

### run

> -   node main.js {your Template name} {output file extension}
> -   e.g. node main.js Location json

### run for big file

> -   node --max-old-space-size=8192 main.js {your Template name} {output file extension}
> -   e.g. node --max-old-space-size=8192 main.js Location json

### merge partion file

> -   python merge.py {you partion file name} {file extension}
> -   e.g. python merge.py Location json

### get demo from full file (default number_of_demo = 3)

> -   python demo.py {your full file name} {file extension} [number of demo]
> -   e.g. python demo.py Location json

### node function

#### AbstractNode

-   the abstract class of all node

#### AbstractFixedNode (extends AbstractNode)

-   the abstract class of all fixed node , the fixed node is the node that has a fixed value in the template
    > -   StringNode(data) -> String
    > -   NumberNode(data) -> Number
    > -   BooleanNode(data) -> Boolean
    > -   DateNode(data) -> Date
    > -   NullNode(data) -> Null
    > -   UndefinedNode(data) -> Undefined

#### AbstractStructureNode (extends AbstractNode)

-   the abstract class of all structure node , the structure node is the node that contain other node in the template
    > -   ArrayNode(array) -> Array
    > -   ObjectNode(object) -> Object
    > -   ConcatenationNode(array) -> String
    > -   ArithmeticNode(array) -> Number
    > -   DecorateNode(node) -> AbstractNode

#### AbstractDynamicNode (extends AbstractNode)

-   the abstract class of all dynamic node , the dynamic node is the node that has a dynamic value base on the database in the template

-   > BasicNode(table, column) -> String

#### AbstractDynamicRelationNode (extends AbstractDynamicNode)

-   the abstract class of all dynamic relation node , the dynamic relation node is the node that has a dynamic value base on the database and have the foreign key in another table in the template

#### AbstractDynamicRelationSearchNode (extends AbstractDynamicRelationNode)

-   the abstract class of all dynamic relation search node , the dynamic relation search node is the node that has a dynamic value base on the database and have the foreign key in another table , it search the value by the givin(exist) value and foreign key in another table in the template
    > -   SingleSearchNode(table, column, searchData) -> String
    > -   MultipleSearchNode (table, column, searchData) -> Array
    > -   OneToOneNode (table, column , foreigntTable, foreignColumn) -> Array
    > -   OneToManyNode (table, column , foreigntTable, foreignColumn) -> 2DArray
