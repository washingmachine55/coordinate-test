const coordinates = /(90|[0-8]?\d)(\.\d+)?\s*,/gi;

export function validateLat(answer) {
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