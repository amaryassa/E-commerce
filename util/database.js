const mysql = require('mysql2');

const pool = mysql.createPool(({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce_node_udemy'
}));

module.exports = pool.promise(); 