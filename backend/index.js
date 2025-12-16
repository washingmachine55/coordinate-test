import { createInterface } from "node:readline";
import db from "./database/db.js";

const rl = createInterface({ 
	input: process.stdin,
	output: process.stdout,
});

const coordinates = /^-?(90|[0-8]?\d)(\.\d+)?, *-?(180|1[0-7]\d|\d?\d)(\.\d+)?$/gi;

let startAnswer = [];
let endAnswer = [];

async function q1() {
	let promise = new Promise((resolve) => {
		// https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
		var startCoordinates = structuredClone(coordinates);
		try {	
			rl.question("Enter your start position: ", (answer) => {
				if ((startCoordinates.test(answer))===false) {
					console.error("Not a valid entry for start");
					rl.close();
				} else {
					rl.pause();
					startAnswer = Object.assign(startAnswer,splitCoordinates(answer))
					return resolve(startAnswer)
				}
			});
		} catch (e) {
			console.error(e);
		}
	});
	return await promise;
}

async function q2() {
	let promise = new Promise((resolve) => {
		var endCoordinates = structuredClone(coordinates);
		try {
			rl.question("Enter your end position: ", (answer) => {
				if ((endCoordinates.test(answer)) === false) {
					console.error("Not a valid entry for end");
					rl.close();
				} else {
					rl.pause();
					endAnswer = Object.assign(endAnswer,splitCoordinates(answer))
					return resolve(endAnswer)
				}
			});
		} catch (e) {
			console.error(e)
		}
	});
	return await promise;
}

function splitCoordinates(answer) {
	// tested regex on https://www.regextester.com/
	// finds a comma, or a comma that is followed by 0 or more spaces
	return answer.split(/s?[,]\s*/g)
}

// https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
// This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcDistance(startAnswer,endAnswer) 
{	
	var lat1 = startAnswer[0];
	var lon1 = startAnswer[1];
	var lat2 = endAnswer[0];
	var lon2 = endAnswer[1];
	
	var R = 6371; // km
	var dLat = toRad(lat2-lat1);
	var dLon = toRad(lon2-lon1);
	var lat1 = toRad(lat1);
	var lat2 = toRad(lat2);
	
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	
	// await createAndSave.createRecord(startAnswer[0],startAnswer[1],endAnswer[0],endAnswer[1],parseInt(d));
	
	return d.toFixed(2)
}

// Converts numeric degrees to radians
function toRad(Value) {
	return Value * Math.PI / 180;
}

function showDistance(distance) {
	return console.log(`The distance between your start location and end location is: ${distance} KM(s)`);
}

function decision(distance) {
	const distanceToCheck = parseInt(distance);
	
	if (distanceToCheck>=50) {
		return ("Invalid").toString()
	} else if (distanceToCheck<=50 && distanceToCheck>=30) {
		return ("Out of radius").toString()
	} else if (distanceToCheck>=10 && distanceToCheck<=30) {
		return ("Outbound").toString()
	} else {
		return ("Inbound").toString()
	}
}

function distAndDecision(distance) {
	return showDistance(distance) + console.log(decision(distance));
}

async function saveToDB()
{	
	var lat1 = startAnswer[0];
	var lon1 = startAnswer[1];
	var lat2 = endAnswer[0];
	var lon2 = endAnswer[1];
	
	var R = 6371; // km
	var dLat = toRad(lat2-lat1);
	var dLon = toRad(lon2-lon1);
	var lat1 = toRad(lat1);
	var lat2 = toRad(lat2);
	
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;

	const recordToAdd = [startAnswer[0], startAnswer[1], endAnswer[0], endAnswer[1], parseInt(d), decision(d)];

	// await test1(recordToAdd);
	// return addRecord(startAnswer[0], startAnswer[1], endAnswer[0], endAnswer[1], parseInt(d), decision(d));
	await fetch('http://localhost:3000/coordinates/add', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(recordToAdd)
	});
}

async function main() {	
	await q1()
	await q2()
	distAndDecision(calcDistance(startAnswer,endAnswer))
	await saveToDB();
	rl.close()
}

main();