module.exports = function(index) {
	let key = 0;
	let startId = 0;
	let numReads = 1;
	console.log(`Creating JSON: key ${key}, startingId ${startId}, numReads ${numReads}`)
	return {
		folder: key,
		startingId: startId,
		numReads: numReads
	};
}
