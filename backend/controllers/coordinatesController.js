// import entries from "../database/schema.js";
import pool from '../config/db.js';
import validateCoordinates from '../utils/validateCoordinates.js';
import addCoordinateEntryToDatabase from '../services/coordinatesDatabaseService.js';
import { calcDistance, giveDecision, splitCoordinates, verifyUserToken } from '../utils/index.js';

async function readAllRecords(_req, res) {
	const conn = await pool.getConnection();

	try {
		// const result = await conn.query("SELECT * FROM entries");
		const result = await conn.query(
			'SELECT e.*, u.name FROM geo_news.entries e LEFT JOIN geo_news.users u ON e.user_id = u.id '
		);
		await res.format({
			json() {
				res.send(result);
			},
		});
	} catch (err) {
		console.error('Error reading records:', err);
	} finally {
		conn.end();
	}
}

async function addRecord(req, res) {
	let request = Object.values(req.body);

	if ((request[0] || request[1]) == '' || (request[0] && request[1]) == '') {
		return res.format({
			json() {
				res.send({
					type: 'error',
					message: 'Both input fields must not be empty! Please try again.',
				});
			},
		});
	}

	try {
		let userId = verifyUserToken(req);

		const startLat = splitCoordinates(request[0])[0];
		const startLong = splitCoordinates(request[0])[1];
		const endLat = splitCoordinates(request[1])[0];
		const endLong = splitCoordinates(request[1])[1];

		if (validateCoordinates(startLat, startLong) === true && validateCoordinates(endLat, endLong) === true) {
			const calculatedDistance = calcDistance(startLat, startLong, endLat, endLong);
			const givenDecision = giveDecision(calculatedDistance);

			const entryArray = [userId, startLat, startLong, endLat, endLong, calculatedDistance, givenDecision];

			try {
				await addCoordinateEntryToDatabase(entryArray);
				res.format({
					json() {
						res.send({
							type: 'success',
							message: 'Record Added!',
							entry: `${entryArray}`,
						});
					},
				});
			} catch (error) {
				console.error(error);
			}
		} else {
			res.format({
				json() {
					res.send({
						type: 'error',
						message: "Can't work on calculation as values are in an incorrect format!",
					});
				},
			});
		}
	} catch (err) {
		console.error('Error creating record:', err);
	}
}

export { readAllRecords, addRecord };
