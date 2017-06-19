let numWrites = 1;
module.exports = function(index) {
	console.log(`Creating JSON: startingId 0, numWrites ${numWrites}`)
	return {
		startingId: 0,
		numWrites: numWrites
	};
}
