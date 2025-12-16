import { validateLat, validateLong, splitCoordinates } from "../utils/index.js";

const coordinates = /^-?(90|[0-8]?\d)(\.\d+)?, *-?(180|1[0-7]\d|\d?\d)(\.\d+)?$/gi;

let answerArray = [];

export default function validateCoordinates(answer) {

	answerArray = Object.assign(answerArray, splitCoordinates(answer))
	var coordinatesValidationRegex = structuredClone(coordinates);

	// console.log(coordinatesValidationRegex);

	console.log(coordinatesValidationRegex.test((validateLat(answerArray[0]))));


	if ((validateLat(answerArray[0] == coordinatesValidationRegex)) || (validateLong(answerArray[1] == coordinatesValidationRegex))) {
		if (validateLat(answerArray[0] == coordinatesValidationRegex)) {
			return false;
			// return console.log("Invalid Latitude Entry");
		} else if (validateLong(answerArray[1] == coordinatesValidationRegex)) {
			return false;
	// return console.log("Invalid Longitude Entry");
		} else {
			return true
			// return console.log("Invalid Latitude or Longitude Entry");
		}
	} else {
		return true;
	}

	let formattedAnswer = answer
	// console.log(formattedAnswer);


	// var coordinatesValidationRegex = structuredClone(coordinates);
	// try {
	// 	if ((coordinatesValidationRegex.test(formattedAnswer)) === false) {
	// 		console.error("Not a valid entry. Please try again.");
	// 	} else {
	// 		// answerArray = Object.assign(answerArray, splitCoordinates(answer))
	// 		return resolve(JSON.stringify(formattedAnswer))
	// 	}
	// } catch (error) {
	// 	console.error(console.error());
	// } finally {
	// 	return (JSON.stringify(formattedAnswer));
	// }
}
