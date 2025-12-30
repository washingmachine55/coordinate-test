import { sendVerificationEmail, compareValidOTP, userIsVerifiedCheck } from '../services/sendAndSaveVerificationEmailDatabaseService.js';
import verifyToken from '../middlewares/verifyToken.js';
import { getUserId, isCredentialsMatching } from '../services/authenticateUserDatabaseService.js';
import checkExistingEmail from '../services/checkExistingEmailDatabaseService.js';
import registerUserToDatabase from '../services/registerDatabaseService.js';
import { confirmPassword } from '../utils/index.js';

import jwt from 'jsonwebtoken';
import verifyUserAccessFromDatabase from '../services/verifyUserAccessDatabaseService.js';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

async function registerUser(req, res) {
	let request = Object.values(req.body);
	let userName = request[0];
	let userEmail = request[1];
	let userPassword = request[2];

	if (userName == null || userEmail == null || userPassword == null) {
		return res.format({
			json() {
				res.send({
					type: 'error',
					message: "One or more input fields are empty. Please fill up all the input fields before submitting.",
				});
			},
		});
	} else {

	// --------------------------------------------------------------------------- //
	// Check if email exists in database already
		// --------------------------------------------------------------------------- //
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
	let userConfirmedPassword = request[3];
		let confirmPasswordCheck = confirmPassword(userPassword, userConfirmedPassword);

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

			const token = jwt.sign({ id: userId }, JWT_SECRET_KEY, { expiresIn: '1h' });
			return res.format({
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

async function resendOTP(req, res) {

	const token = req.header('Authorization');
	if (!token) return res.status(401).send('Access Denied');

	try {
		const verified = jwt.verify(token, JWT_SECRET_KEY);
		const userId = verified.id;

		const userIsVerified = await userIsVerifiedCheck(userId)

		if (userIsVerified == true) {
			return res.status(200).json([
				{
					type: 'error',
					message: 'You are already verified',
				},
				{ user_id: userId },
				{ Authorization: token },
			]);
		}

		let emailSent = await sendVerificationEmail(userId);

		if (emailSent == true) {
			return res.status(200).json([
				{
					type: 'success',
					message: 'OTP has been resent to your email. Please check your inbox',
				},
				{ user_id: userId },
				{ Authorization: token },
			]);
		} else {
			return res.status(200).json([
				{
					type: 'error',
					message: 'An error has occurred. Please try again later.',
				},
				{ user_id: userId },
				{ Authorization: token },
			]);
		}
	} catch (error) {
		res.status(400).send('Invalid Token. Please login.');
	}

}

async function verifyOTP(req, res) {

	const token = req.header('Authorization');
	if (!token) return res.status(401).send('Access Denied');

	const requestOTP = req.body.otp

	try {
		const verified = jwt.verify(token, JWT_SECRET_KEY);
		const userId = verified.id;

		const userIsVerified = await userIsVerifiedCheck(userId)

		if (requestOTP.length < 6) {
			return await res.format({
				json() {
					res.send([
						{
							type: 'error',
							message: "OTP is not complete",
						},
					]);
				},
			});
		} else {
			if (userIsVerified == true) {
				return res.status(200).json([
					{
						type: 'error',
						message: 'You are already verified',
					},
					{ user_id: userId },
					{ Authorization: token },
				]);
			} else {

				let result = await compareValidOTP(userId, requestOTP)

				if (result == true) {
					return await res.format({
						json() {
							res.send([
								{
									type: 'success',
									message: "OTP is correct. Your account is successfully verified!",
								},
							]);
						},
					});
				} else {
					return await res.format({
						json() {
							res.send([
								{
									type: 'error',
									message: "OTP is not correct. Please re-enter OTP.",
								},
							]);
						},
					});
				}
			}
		}

	} catch (error) {
		res.status(400).send('Invalid Token. Please login.');
	}
}

async function verifyUserAccess(req, res) {
	const token = req.header('Authorization');
	if (!token) return res.status(401).send('Access Denied');

	try {
		const verified = jwt.verify(token, JWT_SECRET_KEY);
		const userId = verified.id;

		const isVerified = await verifyUserAccessFromDatabase(userId)

		if (isVerified == true) {
			return res.status(200).json([
				{
					type: 'success',
					message: 'Verified Token',
					is_verified: 'true',
				},
				{ user_id: userId },
				{ Authorization: token },
			]);
		} else {
			return res.status(200).json([
				{
					type: 'error',
					message: 'You have not verified your account. Please verify your account before trying again.',
					is_verified: 'false',
				},
				{ user_id: userId },
				{ Authorization: token },
			]);
		}
	} catch (err) {
		res.status(400).send('Invalid Token. Please login.');
	}

}

export { registerUser, loginUser, logoutUser, verifyUserToken, resendOTP, verifyOTP, verifyUserAccess };
