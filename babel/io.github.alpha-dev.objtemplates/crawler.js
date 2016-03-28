import {repo_crawl} from "./repo_crawl.js";

//TODO: Comment this stuff

var request = require('request');

export class Crawler{

  constructor(baseURL, authString){
    this.BaseSearchURL = baseURL;
    this.authString = authString;
  }
  beginCrawl(query){
    //First step
    var bSurl = this.BaseSearchURL;
    let initialSearch = new Promise(function(resolve, reject){
      request({
        url: bSurl + "/" + query,
        headers: {
          'User-Agent': 'alpha-dev'
        }
      }, function(error, response, body){
        if (!error) {
          resolve(body);
        }
        else{
          reject(error, response.statusCode);
        }
      });
    });

    let authString = this.authString;

    initialSearch.then(function(body){
      let searchResponse = JSON.parse(body);
      let itemResponse = searchResponse["items"];
      itemResponse.forEach(function (item){
        console.log("Repository : " + item["full_name"]);
        new repo_crawl(item["full_name"], "/", item["default_branch"], authString).startCrawl();
      });
    },
    function(error, responseCode){
      throw new Error(error + " : " + responseCode);
    });

  }
}
