import express from 'express';
import {
	readAllRecords,
	addRecord
} from '../controllers/coordinates.js';
const router = express.Router();

router.get('/all', readAllRecords)
router.post('/add', addRecord)
// router.get('/coordinates/all', readAllRecords)

export default router;