"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Crawler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _repository_crawl = require("./repository_crawl.js");

var _Rule = require("../io.github.alpha-dev.rules/Rule.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');

var Crawler = exports.Crawler = function () {
  function Crawler(baseURL) {
    _classCallCheck(this, Crawler);

    this.BaseSearchURL = baseURL;
  }

  _createClass(Crawler, [{
    key: "beginCrawl",
    value: function beginCrawl(query) {
      //First step

      var bSurl = this.BaseSearchURL;
      var initialSearch = new Promise(function (resolve, reject) {
        request({
          url: bSurl + "/" + query,
          headers: {
            'User-Agent': 'alpha-dev'
          }
        }, function (error, response, body) {
          if (!error) {
            resolve(body);
          } else {
            reject(error, response.statusCode);
          }
        });
      });

      initialSearch.then(function (body) {
        var searchResponse = JSON.parse(body);
        var itemResponse = searchResponse["items"];
        itemResponse.forEach(function (item) {
          console.log("Repository : " + item["full_name"]);
          new _repository_crawl.repository_crawl(item["full_name"], "", item["default_branch"], new _Rule.Rule()).getRootFiles();
        });
      }, function (error, responseCode) {
        throw new Error(error + " : " + responseCode);
      });
    }
  }]);

  return Crawler;
}();