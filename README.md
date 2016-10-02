Ear Mentor
==========================

[![Build Status](https://travis-ci.org/vladimirponomarev/ear-mentor-react-redux-socket.io-node.svg?branch=master)](https://travis-ci.org/vladimirponomarev/ear-mentor-react-redux-socket.io-node)
[![Dependency Status](https://david-dm.org/vladimirponomarev/ear-mentor-react-redux-socket.io-node.svg?theme=shields.io)](https://david-dm.org/vladimirponomarev/ear-mentor-react-redux-socket.io-node)
[![devDependency Status](https://david-dm.org/vladimirponomarev/ear-mentor-react-redux-socket.io-node/dev-status.svg?theme=shields.io)](https://david-dm.org/vladimirponomarev/ear-mentor-react-redux-socket.io-node#info=devDependencies)

An application for training the relative pitch.

![Ear Mentor](https://raw.github.com/vladimirponomarev/ear-mentor-react-redux-socket.io-node/master/screenshot.png)

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
