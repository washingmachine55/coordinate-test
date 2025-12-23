import { randomInt } from 'node:crypto';

export function getRandomOTP() {
	// let randomNumber = randomInt(0, 999999);
	// let min = 0;

	// let tempStringCurrent = randomNumber.toString().length

	// // return Math.floor(Math.random() * (tempStringCurrent - 6))


	// // if (tempStringCurrent > 6) {
	// // 	return randomNumber = Math.floor(Math.random() * (tempStringCurrent-6));
	// // }

	// do {
	// 	min = Math.floor(Math.random() * (tempStringCurrent - 6))
	// 	let randomNumber = Math.floor(Math.random() * min+10)
	// } while (tempStringCurrent > 6);

	
	const min = 0;
	const max = 10 ** 6;

	const randomNum = randomInt(min, max);

	return randomNum.toString().padStart(6, '0');
};