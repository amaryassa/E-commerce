const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("ecommerce_node_udemy", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;

// const mysql = require("mysql2");
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "ecommerce_node_udemy",
// });

// module.exports = pool.promise();
