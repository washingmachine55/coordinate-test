import { splitCoordinates } from "../utils/splitCoordinates.js";

const coordinates = /^-?(90|[0-8]?\d)(\.\d+)?, *-?(180|1[0-7]\d|\d?\d)(\.\d+)?$/gi;

let startAnswer = [];
let endAnswer = [];

function validateCoordinates(startReq, endReq) {
	var startCoordinates = structuredClone(coordinates);
	try {
		if ((startCoordinates.test(startReq)) === false) {
			console.error("Not a valid entry for start");
		} else {
			startAnswer = Object.assign(startAnswer, splitCoordinates(answer))
			return resolve(startAnswer)
		}
	} catch (error) {
		console.error(console.error());
	} finally {
		return startAnswer;
	}

	if (endReq !== undefined) {

		try {
			
		} catch (error) {
			
		}
	}
}