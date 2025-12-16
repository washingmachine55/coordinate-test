import pool from "../config/db.js";

export default async function addCoordinateEntryToDataBase(request) {
	let conn;
	try {
		conn = await pool.getConnection();

		const entryArray = request
		console.log(entryArray);

		// const entry = [entryArray[0], entryArray[1], entryArray[2], entryArray[3], entryArray[4], entryArray[5]]
		// const saveToDB = conn.query("INSERT INTO entries(start_lat,start_long,end_lat,end_long,distance_km,decision) VALUES (?, ?, ?, ?, ?, ?)", entry);
		// await saveToDB;
	} catch (err) {
		console.error("Error creating record:", err)
	}
}

// export default {
// 	addCoordinateEntryToDataBase
// };