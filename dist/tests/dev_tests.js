"use strict";

var _crawler = require("../io.github.alpha-dev.objtemplates/crawler.js");

var _repository_crawl = require("../io.github.alpha-dev.objtemplates/repository_crawl.js");

var _Rule = require("../io.github.alpha-dev.rules/Rule.js");

var test = require('unit.js');

describe('Main Crawler', function () {
  //Tests to make sure the initial crawl runs properly
  it('Test main fetch', function () {
    var crawler = new _crawler.Crawler("https://api.github.com/search").beginCrawl("repositories?q=tetris+language:assembly&sort=stars&order=desc");
  });
});

describe('Repository Crawler', function () {
  it('Test repository crawler', function () {
    var repoCrawl = new _repository_crawl.repository_crawl("Alpha-Dev/Recodify", "", "master", new _Rule.Rule()).getRootFiles();
  });
});