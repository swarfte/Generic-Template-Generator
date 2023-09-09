const { AbstractGenerator } = require("./AbstractGenerator");
const fs = require("fs");
/**
 * the generator for ndjson file
 * @class ndjsonGenerator
 * @extends {AbstractGenerator}
 */
class NdjsonGenerator extends AbstractGenerator {
    constructor(templateName) {
        super(templateName);
    }

    /**
     *  check the size of string , if the size of string is bigger than 500MB , we write the string in a file
     * @param {String} str
     * @param {Number} count
     * @returns {Array}
     */
    validString(str, count) {
        if (str.length < 524288000) {
            //  the maximum size of string is 512MB , so we set the threshold to 500MB
            return [str, count];
        } else {
            let filename =
                "./output/" +
                this.originalTemplatePath +
                "_" +
                count +
                ".ndjson";
            fs.writeFile(filename, str, (err) => {
                if (err) {
                    throw err;
                }
            });
            return ["", count + 1];
        }
    }

    /**
     * save the output data to the ndjson file
     * @override
     * @param {String} originalTemplatePath
     * @param {Object[]} output
     */
    saveOutput(originalTemplatePath, output) {
        let outData = "";
        let count = 0;
        for (const record of output) {
            [outData, count] = this.validString(outData, count); // for big data , we need to save the data in the file when the size of string is bigger than 500MB
            outData += JSON.stringify(record) + "\n";
        }
        let outputPath =
            count === 0
                ? "./output/" + originalTemplatePath + ".ndjson"
                : "./output/" + originalTemplatePath + "_" + count + ".ndjson";
        fs.writeFile(outputPath, outData, (err) => {
            if (err) {
                throw err;
            }
            console.log("NDJSON data is saved.");
        });
    }
}

module.exports.NdjsonGenerator = NdjsonGenerator;
