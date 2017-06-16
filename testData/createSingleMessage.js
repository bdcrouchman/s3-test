let skipBy = 0;
let numWrites = 1;
module.exports = function(index) {
	console.log(`Creating JSON: startingId 0, numWrites ${numWrites}, skipBy: ${skipBy}`)
	return {
		startingId: 0,
		numWrites: numWrites,
    skipBy: skipBy
	};
}
