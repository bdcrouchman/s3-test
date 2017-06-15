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
let eventId = 0;
let messageId = 0;

module.exports.handler = lambdaHandler((event) => {
	logger.debug({event}, 'Starting to process');
	if (event.folder === undefined || event.startingId === undefined || event.numWrites === undefined) {
		throw new Error('Missing a parameter');
	}
	logger.debug({event}, 'Creating Object');

	const object = Array(1024000).fill('a').join('');
	let id = event.startingId;
	let writes = [];
	for (let i = 0; i < event.numWrites; i++) {
		writes.push(s3.putObjectAsync({Body: object, Bucket, Key: `folder${event.folder}/${id}`}));
		id++;
	}
	return Promise.all(writes).then(() => {
		logger.debug({Length: writes.length}, 'wrote');
	});
});
