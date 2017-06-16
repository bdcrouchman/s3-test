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
	if (event.startingId === undefined || event.numReads === undefined || event.skipBy === undefined) {
		throw new Error('Missing a parameter');
	}
  let numSuccessful = 0;
  let numFailed = 0;
	let id = event.startingId;
	let reads = [];
  logger.debug('starting to read')
	for (let i = 0; i < event.numReads; i++) {
		let folder = id % folderNumber;
		let folderString = folder.toString(16);
		reads.push(s3.getObjectAsync({Bucket, Key: `${folderString}/${id}`}).then(() => {
      numSuccessful++;
    }).catch((error) => {
      //Couple of missing messages due to poor planning during writing. Just don't fail an entire batch
      numFailed++;
    }));
		id += event.skipBy;
	}
	return Promise.all(reads).then((results) => {
    // Parse one message to ensure no funny business is happening
		logger.debug({Length: reads.length, Success: numSuccessful, Failed: numFailed}, 'Successfully read');
    if (numFailed > 100) {
      // Shouldn't ever happen
      throw new Error('Failed count too large');
    }
	});
});
