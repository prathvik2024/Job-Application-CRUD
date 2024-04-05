const mysql = require('mysql');
const dotenv = require('dotenv').config();

try {
    const con = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.SQL_USER,
        password: process.env.PASS,
        database: process.env.DATABASE
    });
    con.connect(function (err) {
        if (err) {
            throw err;
        } else {
            console.log("Database connected!");
        }
    });

    module.exports = con;
} catch (error) {
    console.log(error);
}
