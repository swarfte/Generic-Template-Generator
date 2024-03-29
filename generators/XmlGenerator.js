const { AbstractGenerator } = require("./AbstractGenerator.js");
const fs = require("fs");
const xml2js = require("xml2js");
/**
 * the generator for xml file
 * @class xmlGenerator
 * @extends {AbstractGenerator}
 */
class XmlGenerator extends AbstractGenerator {
    constructor(templateName) {
        super(templateName);
    }

    /**
     * save the output data to the xml file
     * @override
     * @param {String} originalTemplatePath
     * @param {Object[]} output
     */
    saveOutput(originalTemplatePath, output) {
        const builder = new xml2js.Builder();
        const xml = builder.buildObject({
            data: {
                record: output,
            },
        });
        fs.writeFile(
            "./output/" + originalTemplatePath + ".xml",
            xml,
            (err) => {
                if (err) {
                    throw err;
                }
                console.log("XML data is saved.");
            }
        );
    }
}

module.exports.XmlGenerator = XmlGenerator;
