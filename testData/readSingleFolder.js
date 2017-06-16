//Arbitrarily and randomly chosen
const folder = 5;
const readsPerLambda = 1000;
const objectsPerFolder = 1000 * 60 * 60 / 128;
let curPosition = 0
module.exports = function(index) {
	let key = folder;
	let startId = curPosition;
	let numReads = Math.min(objectsPerFolder - startId, readsPerLambda);
	console.log(`Creating JSON: key ${key}, startingId ${startId}, numReads ${numReads}`)
  curPosition += numReads
	return {
		folder: key,
		startingId: startId,
		numReads: numReads
	};
}
