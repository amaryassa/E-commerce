const mongodb = require("mongodb");
const CONFIG = require("./config.json");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(CONFIG.MONGODB_URI)
        .then((client) => {
            console.log("connected !");
            _db = client.db();
            callback();
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw "No Database Found";
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;