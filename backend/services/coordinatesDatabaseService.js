import pool from "../config/db.js";

export default async function addCoordinateEntryToDatabase(request) {
	// let conn;
	const conn = await pool.getConnection();

	try {
		// conn = await pool.getConnection();

		const saveToDB = await conn.query("INSERT INTO entries(start_lat,start_long,end_lat,end_long,distance_km,decision) VALUES (?, ?, ?, ?, ?, ?)", request);
		await saveToDB;

	} catch (err) {
		console.error("Error creating record:", err)
	} finally {
		conn.end()
	}
}