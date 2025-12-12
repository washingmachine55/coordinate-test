import express from 'express';
import db from "../database/db.js";
const router = express.Router();

async function readAllRecords(req, res) {	
	try {
		const rows = await db.query("SELECT * FROM entries")
		res.json(rows)
	} catch (err) {
		console.error("Error reading records:", err)
	} finally {
		db.release()
	}
}

async function addRecord(req, res) {
	try {
		const result = await db.execute(
			"INSERT INTO entries (start_lat, start_long, end_lat, end_long, distance_km, decision) VALUES (?, ?, ?, ?, ?, ?)",
			[req.body[0], req.body[1], req.body[2], req.body[3], req.body[4], req.body[5]]
		);
		res.format({
			json() {
				res.send({ message: 'hey', record_id: `${result.insertId}` })
			}
		})
	} catch (err) {
		console.error("Error creating record:", err)
	} finally {
		db.release();
		await db.end();
	}
}

router.get('/all', readAllRecords)
router.post('/add', addRecord)

export default router;