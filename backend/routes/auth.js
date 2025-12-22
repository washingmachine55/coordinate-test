import express from 'express';
import {
	registerUser,
	loginUser
} from '../controllers/authController.js';
const router = express.Router();

// import verifyToken from '../middlewares/verifyToken.js';

// router.get('/register', cors(), registerUser)
router.post('/register', registerUser)
router.post('/login', loginUser)

export default router;