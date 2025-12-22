import pool from "../config/db.js";
import { getUserId, isCredentialsMatching } from "../services/authenicateUserDatabaseService.js";
import checkExistingEmail from "../services/checkExistingEmailDatabaseService.js";
import registerUserToDatabase from "../services/registerDatabaseService.js";
import { confirmPassword } from "../utils/index.js";

import jwt from 'jsonwebtoken';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

async function registerUser(req, res) {
	let request = Object.values(req.body)
	let userName = request[0]
	
	// --------------------------------------------------------------------------- //
	// Check if email exists in database already
	// --------------------------------------------------------------------------- //
	let userEmail = request[1]
	let existingEmailCheck = await checkExistingEmail(userEmail)
	
	if ((existingEmailCheck) == false) {
		return await res.format({
			json() {
				res.send({
					type: 'error',
					message: 'Email already exists. Please sign in instead.'
				})
			}
		})
	}
	// --------------------------------------------------------------------------- //
	// Password Confirmation Check
	// --------------------------------------------------------------------------- //
	let userPassword = request[2]
	let userConfirmedPassword = request[3]
	let confirmPasswordCheck = await confirmPassword(userPassword, userConfirmedPassword)
	
	if ((confirmPasswordCheck) == false) {
		return await res.format({
			json() {
				res.send({
					type: 'error',
					message: 'Passwords don\'t match. Please try again instead.'
				})
			}
		})
	}
	
	// --------------------------------------------------------------------------- //
	// Save User details to Database if all checks are cleared
	// --------------------------------------------------------------------------- //
	const entryArray = [userName, userEmail, userPassword]
	try {
		await registerUserToDatabase(entryArray);
		res.format({
			json() {
				res.send({
					type: 'success',
					message: 'Registered Successfully!',
				})
			}
		})
	} catch (error) {
		console.error("Error creating record:", error)
	}
}

async function loginUser(req, res) {
	let request = Object.values(req.body)
	let userEmail = request[0]
	let userPassword = request[1]
	
	try {
		// --------------------------------------------------------------------------- //
		// Check if email doesn't exist in database already
		// --------------------------------------------------------------------------- //
		let existingEmailCheck = await checkExistingEmail(userEmail)
		if ((existingEmailCheck) == true) {
			return await res.format({
				json() {
					res.send({
						type: 'error',
						message: 'Email doesn\'t exist. Please sign up instead.'
					})
				}
			})
		} else if ((existingEmailCheck) == false) {
			// --------------------------------------------------------------------------- //
			// Email and Password Combination Check
			// --------------------------------------------------------------------------- //
			let credentialMatchingResult = await isCredentialsMatching(userEmail, userPassword)
			if ((credentialMatchingResult) == true) {
				let userId = await getUserId(userEmail, userPassword);
				const token = jwt.sign({ id: userId }, JWT_SECRET_KEY, { expiresIn: '1h' });

				return await res.format({
					json() {
						res.send([{
							type: 'success',
							message: 'Sign in successful!'
						}, { token }])
					}
				})
			} else {
				return await res.format({
					json() {
						res.send({
							type: 'error',
							message: 'Credentials Don\'t match. Please try again.'
						})
					}
				})
			}
		}
	} catch (error) {
		console.error("Error creating record:", error)
	}
}

export {
	registerUser,
	loginUser
};