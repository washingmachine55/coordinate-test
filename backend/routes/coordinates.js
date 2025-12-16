import express from 'express';
import cors from 'cors';
import {
	readAllRecords,
	addRecord
} from '../controllers/coordinatesController.js';
const router = express.Router();

router.get('/all', cors(), readAllRecords)
router.post('/add', cors(), addRecord)

export default router;