// read the content of the file first
// we do this using 2 library modules fs and path

const path = require ('path');
const fs= require ('fs');
const solc = require('solc');


//dirname is a constant that is defined by nodeJS
// and it always get set to current working directory
//meaning it will take you from your root directory of PC/Linux to the inbox folder
// now that we are at inbox we need to get into contracts then inbox.sol
// hence why there is more arguments afterwards

const inboxPath = path.resolve (__dirname, 'contracts', 'Inbox.sol');

//reading the raw source file using fs

const source = fs.readFileSync(inboxPath, 'utf8');

//we can now actually write the compile statement
//by using the sosc compile that we've installed before
// beginning with sosc from the top.

//using solidity compile, compile what's in constant source
// second parameter asks for how many different contracts that we are attempting to compile

module.exports= solc.compile(source, 1).contracts[':Inbox'];
