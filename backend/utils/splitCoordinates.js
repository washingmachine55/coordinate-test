export function splitCoordinates(answer) {
	// tested regex on https://www.regextester.com/
	// finds a comma, or a comma that is followed by 0 or more spaces
	return answer.split(/s?[,]\s*/g)
}