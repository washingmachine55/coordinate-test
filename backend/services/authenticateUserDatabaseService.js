import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export async function isCredentialsMatching(userEmail, userPassword) {
	const conn = await pool.getConnection();

	try {
		// const credentialsCheck = await conn.query("SELECT CASE WHEN EXISTS(SELECT email FROM geo_news.users WHERE email = ? AND password = ?) THEN 1 ELSE 0 END AS ExistsCheck;", [userEmail, hashedPassword]);
		const credentialsCheck = await conn.query("SELECT CASE WHEN EXISTS(SELECT email FROM geo_news.users WHERE email = ?) THEN 1 ELSE 0 END AS ExistsCheck;", userEmail);

		let result = credentialsCheck[0].ExistsCheck.toString();

		try {
			if (result == 1) {
				const getHashedPasswordFromDB = await conn.query("SELECT password FROM geo_news.users WHERE email = ?;", [userEmail]);

				const hashedPasswordFromDB = Object.values(getHashedPasswordFromDB[0])[0];

				const bcryptResult = await bcrypt.compare(userPassword, hashedPasswordFromDB);

				console.log('bcryptResult: ', bcryptResult);


				if (bcryptResult == true) {
					return true;
				} else {
					return false;
				}

				// return true;
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

export async function getUserId(userEmail, userPassword) {
	const conn = await pool.getConnection();

	try {
		// const credentialsCheck = await conn.query("SELECT id FROM geo_news.users WHERE email = ? AND password = ?;", [userEmail, userPassword]);
		const credentialsCheck = await conn.query("SELECT CASE WHEN EXISTS(SELECT email FROM geo_news.users WHERE email = ?) THEN 1 ELSE 0 END AS ExistsCheck;", userEmail);

		let result = credentialsCheck[0].ExistsCheck.toString();

		try {
			if (result == 1) {
				const getHashedPasswordFromDB = await conn.query("SELECT password FROM geo_news.users WHERE email = ?;", [userEmail]);

				const hashedPasswordFromDB = Object.values(getHashedPasswordFromDB[0])[0];

				const bcryptResult = await bcrypt.compare(userPassword, hashedPasswordFromDB);

				if (bcryptResult == true) {
					const credentialsCheck = await conn.query("SELECT id FROM geo_news.users WHERE email = ?;", userEmail);

					let result = Object.values(credentialsCheck[0]).toString()
					return result;
				} else {
					return false;
				}
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