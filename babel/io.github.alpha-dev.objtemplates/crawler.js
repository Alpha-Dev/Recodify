import {repository_crawl} from "./repository_crawl.js";
import {Rule} from "../io.github.alpha-dev.rules/Rule.js";
var request = require('request');

export class Crawler{

  constructor(baseURL){
    this.BaseSearchURL = baseURL;
  }
  beginCrawl(query){
    //First step

    var bSurl = this.BaseSearchURL;

    let initialSearch = new Promise(function(resolve, reject, urlQuery){

      request(bSurl + "/" + urlQuery, function(error, body){
        if (!error) {
          resolve(body);
        }
        else{
          reject(error, response.statusCode);
        }
      });
    });

    let repositorySearch = new Promise(function(resolve, reject, url){

      request(url, function(error, body){
        if (!error) {
          resolve(body);
        }
        else{
          reject(error, response.statusCode);
        }
      });
    });


    initialSearch.then(function(body){
      console.log("meme");
      let searchResponse = JSON.parse(body);
      let itemResponse = searchResponse["items"];
      itemResponse.forEach(function (item){
        new repository_crawl(item["full_name"], "", item["default_branch"], new Rule());
      });
    },
    function(error, responseCode){

      console.log(error + " : " + responseCode);
    }, query);

  }
}
