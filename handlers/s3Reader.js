const
	Promise = require('bluebird'),
	bunyan = require('bunyan'),
	lambdaHandler = require('lambda-handler-as-promised'),
//	_ = require('lodash'),
	AWS = require('aws-sdk');

const logger = bunyan.createLogger({
	name: 'BcrouchmanS3Test',
	level: 'debug',
	serializers: {
		err: bunyan.stdSerializers.err
	},
});

const region = 'us-east-1',
//	numFolders = 128,
	Bucket = 'bcrouchman-s3-test',

let s3 = Promise.promisifyAll(new AWS.S3({region}));

module.exports.handler = lambdaHandler((event) => {
	logger.debug({event}, 'Starting to process');
	if (event.folder === undefined || event.startingId === undefined || event.numReads === undefined) {
		throw new Error('Missing a parameter');
	}
	let id = event.startingId;
	let reads = [];
	for (let i = 0; i < event.numReads; i++) {
		reads.push(s3.readObjectAsync({Bucket, Key: `folder${event.folder}/${id}`}));
		id++;
	}
	return Promise.all(reads).then(() => {
		logger.debug({Length: reads.length}, 'Successfully read');
	});

}
