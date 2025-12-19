import pool from "../config/db.js";

export default async function checkExistingEmail(request) {
	const conn = await pool.getConnection();

	try {
		// const emailCheck = await conn.query("SELECT email FROM users WHERE email = ?", request);
		const emailCheck = await conn.query("SELECT CASE WHEN EXISTS(SELECT email FROM geo_news.users WHERE email = ?) THEN 1 ELSE 0 END AS ExistsCheck;", request);

		let result = emailCheck[0].ExistsCheck.toString();

		try {
			if (result == 0) {
				return true;
			} else {
				return false;
			}			
		} catch (error) {
			console.log(error);
		}

	} catch (err) {
		console.error("Error creating record:", err)
	} finally {
		conn.end()
	}	
}