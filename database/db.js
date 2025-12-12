import { createPool } from 'mariadb';

const pool = createPool({
    host: 'localhost',
    port: 3306,
    user: 'coordinate_tester',
    password: 'lat&long',
    database: 'geo_news',
    connectionLimit: 5 // Adjust as needed
});
const db = await pool.getConnection()
export default db;