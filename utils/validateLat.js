const coordinates = /^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/

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