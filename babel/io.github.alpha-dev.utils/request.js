//This is a substitute for the Request.js node module which is incompatible with Babel
//This class is a wrapper for Node's HTTP Module
var http = require('http');

export class Request{
    constructor(hostURL, pathURL, onDataEndCallback){
      //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
      let options = {
        host: hostURL,
        path: pathURL
      };

      let callback = function(response) {
        let str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
          str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
          onDataEndCallback(null, str);
        });
      }

      http.request(options, callback).end();
    }
}
