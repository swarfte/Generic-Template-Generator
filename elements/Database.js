/**
 * Database class that used for storing the data
 * @class
 */
class Database {
    static sortedData = {};

    getData() {
        return Database.sortedData;
    }

    setData(data) {
        Database.sortedData = data;
    }
}

module.exports.Database = Database;
