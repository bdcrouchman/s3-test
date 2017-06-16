module.exports = function(index) {
	let skipBy = 0;
	let startId = 0;
	let numReads = 1;
	console.log(`Creating JSON: startingId ${index}, numReads ${numReads}, skipBy: ${skipBy}`)
	return {
		startingId: startId,
		numReads: numReads,
		skipBy: skipBy
	};
}
