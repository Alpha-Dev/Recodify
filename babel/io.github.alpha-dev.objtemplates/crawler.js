import {repository_crawl} from "./repository_crawl.js";
import {Rule} from "../io.github.alpha-dev.rules/Rule.js";
import {Request} from "../io.github.alpha-dev.utils/request.js"
var URL = require('url-parse');

export class Crawler{

  constructor(baseURL){
    this.BaseSearchURL = baseURL;
  }
  beginCrawl(query){
    //First step
    let initialSearch = new Promise(function(resolve, reject, urlQuery){

      let url = new URL(BaseSearchURL + "/" + urlQuery);

      new request(url.hostname, url.pathname, function(error, body){
        if (!error) {
          resolve(body);
        }
        else{
          reject(error, response.statusCode);
        }
      });
    });

    let repositorySearch = new Promise(function(resolve, reject, url){

      let urlParse = new URL(url);

      new request(urlParse.hostname, urlParse.pathname, function(error, body){
        if (!error) {
          resolve(body);
        }
        else{
          reject(error, response.statusCode);
        }
      });
    });


    initialSearch.then(function(body){
      let searchResponse = JSON.parse(body);
      let itemResponse = searchResponse["items"];
      itemResponse.forEach(function (item){
        new repository_crawl(item["full_name"], "", item["default_branch"], new Rule());
      });
    },
    function(error, responseCode){
      Error(error + " : " + responseCode);
    }, query);

  }
}
