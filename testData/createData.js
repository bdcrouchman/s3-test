let stuff = 5;
const numFolders = 128;
const writesPerLambda = 1000;
const objectsPerFolder = 1000 * 60 * 60 / 128;
let nextFolder = 0;
let curPosition = new Map();
module.exports = function(index) {
	console.log(`Creating JSON: index ${index}, stuff ${stuff++}`)
	let key = nextFolder;
	let startId = curPosition.has(key) ? curPosition.get(key) : 0;
	let numWrites = Math.min(objectsPerFolder - startId, writesPerLambda);
	curPosition.set(key, startId + numWrites);
	nextFolder = (nextFolder + 1) % numFolders;
	return {
		folder: key,
		startingId: startId,
		numWrites: numWrites
	};
}
