import { validateLat, validateLong, splitCoordinates } from "./index.js";

// const coordinates = /^-?(90|[0-8]?\d)(\.\d+)?, *-?(180|1[0-7]\d|\d?\d)(\.\d+)?$/gi;

export default function validateCoordinates(start, end) {
	if (((validateLat(start)) === true) && ((validateLong(end)) === true)) {
		return true;
	} else {
		return false;
	}
}
