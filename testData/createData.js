const numWrites = 1000; // writes per lambda
const skipBy = 3600; // should equal run# for lambda-shearer
//
module.exports = function(index) {
	console.log(`Creating JSON: startingId ${index}, numWrites ${numWrites}, skipBy: ${skipBy}`)
	return {
		startingId: index,
		numWrites: numWrites,
		skipBy: skipBy
	};
}
