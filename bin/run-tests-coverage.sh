# Script to find all test files to run
TESTS=`find src -name "*.test*"`
NODE_PATH=./src ./node_modules/.bin/nyc mocha $TESTS --require babel-polyfill --compilers js:babel-register --require src/test/helper.js --require ignore-styles --recursive
