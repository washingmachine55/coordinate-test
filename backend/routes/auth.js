import express from 'express';
import cors from 'cors';
import {
	registerUser,
	loginUser
} from '../controllers/authController.js';
const router = express.Router();

// router.get('/register', cors(), registerUser)
router.post('/register', cors(), registerUser)
router.post('/login', cors(), loginUser)

export default router;