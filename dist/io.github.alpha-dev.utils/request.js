'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//This is a substitute for the Request.js node module which is incompatible with Babel
//This class is a wrapper for Node's HTTP Module
var http = require('http');

var Request = exports.Request = function Request(hostURL, pathURL, onDataEndCallback) {
  _classCallCheck(this, Request);

  //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
  var options = {
    host: hostURL,
    path: pathURL
  };

  var callback = function callback(response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      onDataEndCallback(null, str);
    });
  };

  http.request(options, callback).end();
};