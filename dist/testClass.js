"use strict";

var _repository_crawl = require("./io.github.alpha-dev.objtemplates/repository_crawl.js");

var _Rule = require("./io.github.alpha-dev.rules/Rule.js");

console.log("meme");
var repoCrawl = new _repository_crawl.repository_crawl("Alpha-Dev/Recodify", "", "master", new _Rule.Rule()).beginCrawl();