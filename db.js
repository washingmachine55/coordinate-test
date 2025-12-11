const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    port: 3306,
    user: 'coordinate_tester',
    password: 'lat&long',
    database: 'geo_news',
    connectionLimit: 5 // Adjust as needed
});

module.exports = pool;

// console.log("Connection pool created.");