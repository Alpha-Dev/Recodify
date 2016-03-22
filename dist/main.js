"use strict";

var _crawler = require("./io.github.alpha-dev.objtemplates/crawler.js");

console.log("Running crawling..."); //import {Tester} from "./testClass.js";
//let testerthing = new Tester();
//testerthing.sayX();
//let x = 0;

new _crawler.Crawler("https://api.github.com/search").beginCrawl("repositories?q=tetris+language:assembly&sort=stars&order=desc");