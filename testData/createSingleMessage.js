module.exports = function(index) {
	let key = 0;
	let startId = 0;
	let numWrites = 1;
	console.log(`Creating JSON: key ${key}, startingId ${startId}, numWrites ${numWrites}`)
	return {
		folder: key,
		startingId: startId,
		numWrites: numWrites
	};
}
