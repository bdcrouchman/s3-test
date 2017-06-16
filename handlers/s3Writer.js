'use strict';
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
	folderNumber = Math.pow(16, 4);

let s3 = Promise.promisifyAll(new AWS.S3({region}));

module.exports.handler = lambdaHandler((event) => {
	logger.debug({event}, 'Starting to process');
	if (event.startingId === undefined || event.numWrites === undefined || event.skipBy === undefined) {
		throw new Error('Missing a parameter');
	}
	logger.debug({event}, 'Creating Object');

	const object = Array(1024000).fill('a').join('');
	let id = event.startingId;
	let writes = [];
	for (let i = 0; i < event.numWrites; i++) {
		// 4 digit hex prefix. according to docs, can scale to "millions per sec"
		let folder = id % folderNumber;
		let folderString = folder.toString(16);
		while (folderString.length < 4) {
			folderString = '0'.concat(folderString);
		}
		logger.debug({folder: folderString}, 'creatingFolder')
		writes.push(s3.putObjectAsync({Body: object, Bucket, Key: `${folderString}/${id}`}));
		id += event.skipBy;
	}
	return Promise.all(writes).then(() => {
		logger.debug({Length: writes.length}, 'wrote');
	});
});
