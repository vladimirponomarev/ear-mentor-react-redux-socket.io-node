Ear Mentor
==========================

[![Build Status](https://travis-ci.org/vladimirponomarev/ear-mentor-react-redux-socket.io-node.svg?branch=master)](https://travis-ci.org/vladimirponomarev/ear-mentor-react-redux-socket.io-node)
[![Dependency Status](https://david-dm.org/vladimirponomarev/ear-mentor-react-redux-socket.io-node.svg?theme=shields.io)](https://david-dm.org/vladimirponomarev/ear-mentor-react-redux-socket.io-node)
[![devDependency Status](https://david-dm.org/vladimirponomarev/ear-mentor-react-redux-socket.io-node/dev-status.svg?theme=shields.io)](https://david-dm.org/vladimirponomarev/ear-mentor-react-redux-socket.io-node#info=devDependencies)

Ear Mentor is an application for training relative pitch in a game form. The application built on React + Redux and uses Socket.IO for communication between the web client and server. SQLite is used as a database.

![Ear Mentor](https://raw.github.com/vladimirponomarev/ear-mentor-react-redux-socket.io-node/master/screenshot.png)

## Installation
Rename the config file and configure it as you need:

```
$ mv src/config/index.js.dist src/config/index.js
```

Install the dependencies:

```
$ npm install
```
    
To run in the development mode (React Hot Loader included):

```
$ npm run start:dev
```

To build for production and then serve:
    

```
$ npm run build
$ npm run start
```

## Tests
At first, install the dependencies.

To run only unit tests (testing React components, Redux reducers, utils):

```
$ npm run test:unit
```
    
To run only integration tests (testing socket events with a real database):

```
$ npm run test:integration 
```
    
To run the full test suite:

```
$ npm test
```

## Licence
MIT

