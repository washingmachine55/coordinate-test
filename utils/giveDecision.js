export function giveDecision(distance) {
	const distanceToCheck = parseInt(distance);

	if (distanceToCheck >= 50) {
		return ("Invalid").toString()
	} else if (distanceToCheck <= 50 && distanceToCheck >= 30) {
		return ("Out of radius").toString()
	} else if (distanceToCheck >= 10 && distanceToCheck <= 30) {
		return ("Outbound").toString()
	} else {
		return ("Inbound").toString()
	}
}