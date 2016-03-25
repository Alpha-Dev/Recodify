'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');
var fs = require('fs');

var CLIENT_ID = "";
var CLIENT_SECRET = "";

var contents = fs.readFileSync('creds.txt', 'utf8');
CLIENT_ID = arr[0];
CLIENT_SECRET = arr[1];

console.log("CLIENT_ID: " + CLIENT_ID);

var AUTH_STRING = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET;

//Crawls the repo

var repository_crawl = exports.repository_crawl = function () {
  function repository_crawl(name, path, default_branch, rule) {
    _classCallCheck(this, repository_crawl);

    this.full_name = name;
    this.crawlRule = rule;
    this.filePath = path;
    this.branch = default_branch;
    this.BASE_URL = "https://api.github.com/repos/";
    this.PATH = "/contents/";
  }

  //Searches root of repository to get a list of files and directories


  _createClass(repository_crawl, [{
    key: 'getRootFiles',
    value: function getRootFiles() {
      var BASE_URL = this.BASE_URL;
      var full_name = this.full_name;
      var PATH = this.PATH;
      var branch = this.branch;
      var filePath = this.filePath;
      var crawlRule = this.crawlRule;

      var findRootFiles = new Promise(function (resolve, reject) {
        request({
          url: BASE_URL + full_name + PATH + filePath + AUTH_STRING,
          headers: {
            'User-Agent': 'alpha-dev'
          }
        }, function (error, response, body) {

          if (!error && response.statusCode == 200) {
            resolve(body);
          } else {
            reject(error + response.statusCode);
          }
        });
      });

      var getFileBody = new Promise(function (resolve, reject) {

        request("https://raw.githubusercontent.com/" + full_name + "/" + branch + "/" + filePath, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            resolve(body);
          } else {
            reject(error, response.statusCode);
          }
        });
      });

      findRootFiles.then(function (body) {
        var searchResponse = JSON.parse(body);
        searchResponse.forEach(function (item) {

          //If this file has content then download content
          if (item["type"] === "file") {
            getFileBody.then(function (body) {
              //TODO
              var file = filePath.split("/");
              console.log(file);

              var fileSplit = file[file.length - 1].split(".");
              var fileName = fileSplit[fileSplit.length - 1];
              crawlRule.parseFile(body, fileName);
            });
          } else {
            //Otherwise crawl through the directory
            console.log(item["name"]);
            new repository_crawl(full_name, "/" + item["name"], branch, crawlRule).beginDirectoryCrawl(item["name"] + "/");
          }
        });
      }, function (error) {
        console.log(error);
        throw new Error(error);
      });
    }
  }, {
    key: 'beginDirectoryCrawl',
    value: function beginDirectoryCrawl(dir) {
      var currentDir = dir;
      var BASE_URL = this.BASE_URL;
      var full_name = this.full_name;
      var PATH = this.PATH;
      var branch = this.branch;
      var filePath = this.filePath;
      var crawlRule = this.crawlRule;

      var findRootFiles = new Promise(function (resolve, reject) {
        request({
          url: BASE_URL + full_name + PATH + filePath + AUTH_STRING,
          headers: {
            'User-Agent': 'alpha-dev'
          }
        }, function (error, response, body) {

          if (!error && response.statusCode == 200) {
            resolve(body);
          } else {
            reject(error + response.statusCode);
          }
        });
      });

      findRootFiles.then(function (body) {
        var searchResponse = JSON.parse(body);
        searchResponse.forEach(function (item) {

          //If this file has content then download content
          if (item["type"] === "file") {
            getFileBody.then(function (body) {
              //TODO
              var file = filePath.split("/");

              var fileSplit = file[file.length - 1].split(".");
              var fileName = fileSplit[fileSplit.length - 1];
              crawlRule.parseFile(body, fileName);
            });
          } else {
            //Otherwise crawl through the directory
            console.log(currentDir + item["name"]);

            new repository_crawl(full_name, "/" + currentDir + item["name"], branch, crawlRule).beginDirectoryCrawl(currentDir + item["name"] + "/");
          }
        });
      }, function (error) {
        console.log(error);
        throw new Error(error);
      });
    }
  }]);

  return repository_crawl;
}();