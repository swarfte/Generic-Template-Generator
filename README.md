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
