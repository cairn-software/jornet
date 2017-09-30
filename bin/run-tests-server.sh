# Script to find all server test files to run
TESTS=`find src/server -name "*.test*"`
NODE_PATH=./src mocha $TESTS --compilers js:babel-core/register --recursive
