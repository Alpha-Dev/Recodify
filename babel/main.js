//----------------------------------------------------
var fs = require('fs');

var CLIENT_ID = "";
var CLIENT_SECRET = "";

//Reads Client ID and Secret from a credential file
//credentials are from registered the app on github
var contents = fs.readFileSync('creds.txt', 'utf8');
var arr = contents.split(":");
CLIENT_ID = arr[0];
CLIENT_SECRET = arr[1];

console.log("CLIENT_ID: " + CLIENT_ID);

var AUTH_STRING = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET;
//---------------Read Credentials from file-----------------

import {Crawler} from "./io.github.alpha-dev.objtemplates/crawler.js";

console.log("Running crawling...");

new Crawler("https://api.github.com/search", AUTH_STRING).beginCrawl("repositories?q=recodify");
