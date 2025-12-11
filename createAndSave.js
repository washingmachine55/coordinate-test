const pool = require("./db")
const process = require('node:process');

async function createRecord(lat1,lon1,lat2,lon2,distance,decision) {
    const conn = await pool.getConnection()
    try {
        const result = await conn.execute(
            "INSERT INTO entries (start_lat, start_long, end_lat, end_long, distance_km, decision) VALUES (?, ?, ?, ?, ?, ?)",
            [lat1,lon1,lat2,lon2,distance,decision]
        )
        return console.log(`Record Added to Database: ${result.insertId}`) + process.abort();
    } catch (err) {
        console.error("Error creating record:", err)
    } finally {
        conn.release();
    }
}

exports.createRecord = createRecord