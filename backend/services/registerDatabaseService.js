import pool from "../config/db.js";

export default async function registerUserToDatabase(request) {
	const conn = await pool.getConnection();
	try {
		const saveToDB = await conn.query("INSERT INTO users(name,email,password) VALUES (?, ?, ?)", request);
		await saveToDB;
	} catch (err) {
		console.error("Error creating record:", err)
	} finally {
		conn.end()
	}
}