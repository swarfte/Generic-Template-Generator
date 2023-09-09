const { AbstractGenerator } = require("./AbstractGenerator");
const fs = require("fs");

/**
 * the generator for json file
 * @class jsonGenerator
 * @extends {AbstractGenerator}
 * @module
 */
class JsonGenerator extends AbstractGenerator {
    constructor(templateName) {
        super(templateName);
    }

    /**
     * check the size of string , if the size of string is bigger than 500MB , we write the string in a file
     * @param {String} str
     * @param {Number} count
     * @returns {Array}
     */
    validString(str, count) {
        if (str.length < 524288000) {
            return [str, count];
        }

        // remove the last comma and \n in the string , add the right bracket
        str = str.substring(0, str.length - 2);
        str += "]";
        // write the string in the json file
        let filename =
            "./output/" + this.originalTemplatePath + "_" + count + ".json";
        fs.writeFile(filename, str, (err) => {
            if (err) {
                throw err;
            }
        });
        return ["[", count + 1];
    }

    /**
     * save the output data to the json file
     * @param {String} originalTemplatePath
     * @param {Object[]} output
     */
    saveOutput(originalTemplatePath, output) {
        let outputData = "[";
        let count = 0;
        for (let index = 0; index < output.length - 1; index++) {
            if (index % this.console_pre_show === 0) {
                // show the current schedule
                console.log(
                    `current save percentage: ${(index / output.length) * 100}%`
                );
            }
            [outputData, count] = this.validString(outputData, count); // for big data , we write it in a file each 500 MB
            outputData += JSON.stringify(output[index], null, 4) + "," + "\n";
        }
        outputData += JSON.stringify(output[output.length - 1], null, 4) + "]";

        let outputPath =
            count === 0
                ? "./output/" + originalTemplatePath + ".json"
                : "./output/" + originalTemplatePath + "_" + count + ".json";
        fs.writeFile(outputPath, outputData, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });
    }
}

module.exports.JsonGenerator = JsonGenerator;
