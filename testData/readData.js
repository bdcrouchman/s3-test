const numReads = 1000;
let key = 0;
module.exports = function(index) {
	const startingId = key;
	console.log(`Creating JSON: startingId ${startingId}, numReads ${numReads}`)
	key += numWrites
	return {
		startingId: startingId,
		numReads: numReads
	};
}
