process.env.NODE_ENV = 'test';

// register Babel to transpile code
require("babel-polyfill");
require('babel-register')();
