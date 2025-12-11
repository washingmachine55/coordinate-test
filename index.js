const readline = require("node:readline");

const rl = readline.createInterface({ 
	input: process.stdin,
	output: process.stdout,
});

const coordinates = /^-?(90|[0-8]?\d)(\.\d+)?, *-?(180|1[0-7]\d|\d?\d)(\.\d+)?$/gi;
const lat = /^-?(90|[0-8]?\d)(\.\d+)?/gi;
const long = / *-?(180|1[0-7]\d|\d?\d)(\.\d+)?$/gi;

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
					resolve(console.log(`your start location is ${answer}`));
					rl.pause();
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
					resolve(console.log(`your end location is ${answer}`));
					rl.pause();
				}
			});
		} catch (e) {
			console.error(e)
		}
	});
	return await promise;
}

async function main() {
	await q1();
	await q2();
	rl.close();
}

main();