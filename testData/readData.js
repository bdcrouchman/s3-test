const numReads = 1000;
const skipBy = 3600;
module.exports = function(index) {
	console.log(`Creating JSON: startingId ${index}, numReads ${numReads}, skipBy: ${skipBy}`)
	return {
		startingId: startId,
		numReads: numReads,
    skipBy: skipBy
	};
}
