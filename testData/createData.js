const numWrites = 100; // writes per lambda
let key = 0;
module.exports = function(index) {
	const startingId = key;
	console.log(`Creating JSON: startingId ${startingId}, numWrites ${numWrites}`)
	key += numWrites;
	return {
		startingId: startingId,
		numWrites: numWrites
	};
}
