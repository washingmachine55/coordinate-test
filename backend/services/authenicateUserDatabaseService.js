import pool from "../config/db.js";

export async function isCredentialsMatching(userEmail, userPassword) {
	const conn = await pool.getConnection();

	try {
		const credentialsCheck = await conn.query("SELECT CASE WHEN EXISTS(SELECT email FROM geo_news.users WHERE email = ? AND password = ?) THEN 1 ELSE 0 END AS ExistsCheck;", [userEmail, userPassword]);

		let result = credentialsCheck[0].ExistsCheck.toString();

		try {
			if (result == 1) {
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