const numFolders = 128;
const readsPerLambda = 1000;
const objectsPerFolder = 1000 * 60 * 60 / 128;
let nextFolder = 0;
let curPosition = new Map();
module.exports = function(index) {
	let key = nextFolder;
	let startId = curPosition.has(key) ? curPosition.get(key) : 0;
	let numReads = Math.min(objectsPerFolder - startId, readsPerLambda);
	curPosition.set(key, startId + numReads);
	nextFolder = (nextFolder + 1) % numFolders;
	console.log(`Creating JSON: key ${key}, startingId ${startingId}, numWrites ${numWrites}`)
	return {
		folder: key,
		startingId: startId,
		numWrites: numReads
	};
}
