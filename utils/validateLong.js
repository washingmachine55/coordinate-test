const coordinates = /(\-?\s?[,]\s?)+(\-?([1]?[0-7]?[0-9](\.\d+)?|180((.[0]+)?)))$/;

export function validateLong(answer) {
	var coordinatesValidationRegex = structuredClone(coordinates);

	try {
		if ((coordinatesValidationRegex.test(answer)) === false) {
			return false;
		} else {
			return true;
		}
	} catch (error) {
		console.error(error);
	}
}