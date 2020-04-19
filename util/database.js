/* const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("ecommerce_node_udemy", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
 */

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://amar:amar@cluster0-6y5wb.mongodb.net/shop?retryWrites=true&w=majority"
  )
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
