const mysql = require("mysql");

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'VervergComaL123',
    database: 'vacCenter'
});

module.exports = connection;