const { AbstractGenerator } = require("./AbstractGenerator");
const fs = require("fs");
const xml2js = require("xml2js");
/**
 * the generator for xml file
 * @class xmlGenerator
 * @extends {AbstractGenerator}
 * @package
 */
class XmlGenerator extends AbstractGenerator {
    constructor(templateName) {
        super(templateName);
    }

    /**
     * save the output data to the xml file
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
