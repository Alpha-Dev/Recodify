"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    key: "getRootFiles",
    value: function getRootFiles() {
      var findRootFiles = new Promise(function (resolve, reject) {
        request(BASE_URL + full_name + PATH + filePath, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            resolve(body);
          } else {
            reject(error, response.statusCode);
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
          if (item["type"] === "file") {
            getFileBody.then(function (body) {
              //TODO
              var file = filePath.split("/");
              var fileSplit = file[file.length - 1].split(".");
              var fileName = fileSplit[fileSplit.length - 1];

              crawlRule.parseFile(body, fileName);
            });
          } else {
            repository_crawl(full_name, filePath, branch, crawlRule);
          }
        });
      }, function (error, responseCode) {
        console.log(error + " : " + responseCode);
      });
    }
  }, {
    key: "beginCrawl",
    value: function beginCrawl() {}
  }]);

  return repository_crawl;
}();