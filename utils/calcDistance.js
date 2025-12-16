import { toRad } from "./index.js";

export function calcDistance(startLat, startLong, endLat, endLong) {
	// var lat1 = startAnswer[0];
	// var lon1 = startAnswer[1];
	// var lat2 = endAnswer[0];
	// var lon2 = endAnswer[1];
	var lat1 = startLat;
	var lon1 = startLong;
	var lat2 = endLat;
	var lon2 = endLong;


	var R = 6371; // km
	var dLat = toRad(lat2 - lat1);
	var dLon = toRad(lon2 - lon1);
	var lat1 = toRad(lat1);
	var lat2 = toRad(lat2);

	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;

	return d.toFixed(2)
}