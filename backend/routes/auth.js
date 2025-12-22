import express from 'express';
import {
	registerUser,
	loginUser,
	logoutUser,
	verifyUserToken
} from '../controllers/authController.js';
const router = express.Router();

import verifyToken from '../middlewares/verifyToken.js';

// router.get('/register', cors(), registerUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/verify-token', verifyToken, verifyUserToken)

export default router;