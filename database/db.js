const mysql = require('mysql');

exports.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'joidb',
    tls: {
        rejectUnauthorized: true
    }
})