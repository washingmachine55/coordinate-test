import express from 'express';
// import cors from 'cors';
import {
	readAllRecords,
	addRecord
} from '../controllers/coordinatesController.js';
const router = express.Router();

import verifyToken from '../middlewares/verifyToken.js';

router.get('/all', verifyToken, readAllRecords)
router.post('/add', verifyToken, addRecord)

export default router;