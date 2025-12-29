import pool from "../config/db.js";
import bcrypt from "bcryptjs";


export default async function registerUserToDatabase(request) {
	const conn = await pool.getConnection();

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(request[2], salt);

		const detailsToSave = [request[0], request[1], hashedPassword]

		const saveToDB = await conn.query("INSERT INTO users(name,email,password) VALUES (?, ?, ?)", detailsToSave);
		await saveToDB;
	} catch (err) {
		console.error("Error creating record:", err)
	} finally {
		conn.end()
	}
}