This repository is for personal s3 performance testing

To run, use the npm scripts (and make sure to run npm install first!)

To deploy, set up serverless and run:

npm run deploy

Any of the actual test scripts (currently writeSingleMessage, readSingleMessage, writePerfTest and readPerfTest) require an additional argument. You can run these scripts by doing (for example):

npm run writeSingleMessage -- <ARN_OF_WRITER_LAMBDA>
npm run writePerfTest -- <ARN_OF_WRITER_LAMBDA>
npm run readSingleMessage -- <ARN_OF_READER_LAMBDA>
npm run readPerfTest -- <ARN_OF_READER_LAMBDA>
