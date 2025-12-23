import pool from '../config/db.js';
import sendVerificationEmail from '../mail/verifyEmailAddress.js';
import verifyToken from '../middlewares/verifyToken.js';
import { getUserId, isCredentialsMatching } from '../services/authenticateUserDatabaseService.js';
import checkExistingEmail from '../services/checkExistingEmailDatabaseService.js';
import registerUserToDatabase from '../services/registerDatabaseService.js';
import { confirmPassword } from '../utils/index.js';

import jwt from 'jsonwebtoken';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

async function registerUser(req, res) {
	let request = Object.values(req.body);
	let userName = request[0];

	// --------------------------------------------------------------------------- //
	// Check if email exists in database already
	// --------------------------------------------------------------------------- //
	let userEmail = request[1];
	let existingEmailCheck = await checkExistingEmail(userEmail);

	if (existingEmailCheck == false) {
		return await res.format({
			json() {
				res.send({
					type: 'error',
					message: 'Email already exists. Please sign in instead.',
				});
			},
		});
	}
	// --------------------------------------------------------------------------- //
	// Password Confirmation Check
	// --------------------------------------------------------------------------- //
	let userPassword = request[2];
	let userConfirmedPassword = request[3];
	let confirmPasswordCheck = await confirmPassword(userPassword, userConfirmedPassword);

	if (confirmPasswordCheck == false) {
		return await res.format({
			json() {
				res.send({
					type: 'error',
					message: "Passwords don't match. Please try again instead.",
				});
			},
		});
	}

	// --------------------------------------------------------------------------- //
	// Save User details to Database if all checks are cleared
	// --------------------------------------------------------------------------- //
	const entryArray = [userName, userEmail, userPassword];
	try {
		await registerUserToDatabase(entryArray);
		let userId = await getUserId(userEmail, userPassword);

		let emailSent = await sendVerificationEmail(userId);
		console.debug(emailSent);

		const token = jwt.sign({ id: userId }, JWT_SECRET_KEY, { expiresIn: '1h' });
		res.format({
			json() {
				res.send([
					{
						type: 'success',
						message: 'Registered Successfully!',
					},
					{ token },
				]);
			},
		});
	} catch (error) {
		console.error('Error creating record:', error);
	}
}

async function loginUser(req, res) {
	let request = Object.values(req.body);
	let userEmail = request[0];
	let userPassword = request[1];

	try {
		// --------------------------------------------------------------------------- //
		// Check if email doesn't exist in database already
		// --------------------------------------------------------------------------- //
		let existingEmailCheck = await checkExistingEmail(userEmail);
		console.log(existingEmailCheck);

		if (existingEmailCheck == true) {
			return await res.format({
				json() {
					res.send([
						{
							type: 'error',
							message: "Email doesn't exist. Please sign up instead.",
						},
						{ Token: 'Invalid Token' },
					]);
				},
			});
		} else if (existingEmailCheck == false) {
			// --------------------------------------------------------------------------- //
			// Email and Password Combination Check
			// --------------------------------------------------------------------------- //
			let credentialMatchingResult = await isCredentialsMatching(userEmail, userPassword);
			if (credentialMatchingResult == true) {
				let userId = await getUserId(userEmail, userPassword);
				const token = jwt.sign({ id: userId }, JWT_SECRET_KEY, { expiresIn: '1h' });

				return await res.format({
					json() {
						res.send([
							{
								type: 'success',
								message: 'Sign in successful!',
							},
							{ token },
						]);
					},
				});
			} else {
				return await res.format({
					json() {
						res.send([
							{
								type: 'error',
								message: "Credentials Don't match. Please try again.",
							},
							{ Token: 'Invalid Token' },
						]);
					},
				});
			}
		}
	} catch (error) {
		console.error('Error creating record:', error);
	}
}

async function logoutUser(req, res) {
	const token = req.header('authorization');
	try {
		const decoded = jwt.verify(token, JWT_SECRET_KEY);
		// const userId = decoded.id;
		res.status(200).json({
			type: 'success',
			message: 'Logged out successfully',
		});
		// next();
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
}

async function verifyUserToken(req, res) {
	const token = req.header('Authorization');

	if (!token) return res.status(401).send('Access Denied');

	try {
		const verified = jwt.verify(token, JWT_SECRET_KEY);
		const userId = verified.id;
		res.status(200).json([
			{
				type: 'success',
				message: 'Verified Token',
			},
			{ user_id: userId },
			{ Authorization: token },
		]);
	} catch (err) {
		res.status(400).send('Invalid Token. Please login.');
	}
}

export { registerUser, loginUser, logoutUser, verifyUserToken };
