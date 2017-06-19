'use strict';
const
	Promise = require('bluebird'),
	bunyan = require('bunyan'),
	lambdaHandler = require('lambda-handler-as-promised'),
//	_ = require('lodash'),
	cryptoJS = require("crypto-js"),
	retry = require("retry-bluebird"),
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
	Bucket = 'bcrouchman-s3-test';

let s3 = Promise.promisifyAll(new AWS.S3({region}));

module.exports.handler = lambdaHandler((event) => {
	logger.debug({event}, 'Starting to process');
	if (event.startingId === undefined || event.numWrites === undefined) {
		throw new Error('Missing a parameter');
	}
	logger.debug({event}, 'Creating Object');

	const object = Array(1024000).fill('a').join('');
	let id = event.startingId;
	let writes = [];
	for (let i = 0; i < event.numWrites; i++) {
		// 4 digit hex prefix. according to docs, can scale to "millions per sec"
		writes.push(id);
		id++;
	}
	return Promise.map(writes, (id) => {
		let folder = cryptoJS.MD5(id.toString()).toString(cryptoJS.enc.Hex).substring(0, 4);
		return retry({backoff: 200, max: 100}, (() => {
			return s3.putObjectAsync({Body: object, Bucket, Key: `${folder}/${id}`});
		})).then(() => {
			logger.debug({folder, id}, 'write successful')
		});
	}, {concurrency: 10}).then(() => {
		logger.debug({Length: writes.length}, 'wrote');
	});
}, {errorStack: true});
