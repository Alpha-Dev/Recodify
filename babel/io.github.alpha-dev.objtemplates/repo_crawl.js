//A rewrite of repository_crawl.js
var request = require('request');
import {RuleType} from "../io.github.alpha-dev.rules/BasicRules.js"
var AUTH_STRING;
export class repo_crawl{
  /*@Params
  @fullName - name of the repo in the format of {author}/{repo_name}
  @dirPath -  selected directory to crawl. Ont he first iteration it should be root
  @branch - selected branch to crawl
  @rule - rule to pass crawled items through
  */
  constructor(fullName, dirPath, branch, authString){
    this.fullName = fullName;
    this.dirPath = dirPath;
    this.branch = branch;
    AUTH_STRING = authString;
    //console.log(AUTH_STRING);
    console.log("https://api.github.com/repos/" + fullName + "/contents" + dirPath + AUTH_STRING);
  }

  startCrawl(){

    //Set all the values locally because this keyword doesn't work within nested scopes
    let fullName = this.fullName;
    let dirPath = this.dirPath;
    let branch = this.branch;

    //TODO: expand
    let rule = new RuleType(fullName, branch, dirPath, AUTH_STRING);


    //-------------Define Item Crawl Promise--------------
    let findItems = new Promise(function(resolve, reject){
      request({
          url: "https://api.github.com/repos/" + fullName + "/contents" + dirPath + AUTH_STRING,
          headers: {
            'User-Agent': 'alpha-dev'
          }
        }, function(error, response, body){
        if (!error && response.statusCode == 200) {
          resolve(body);
        }
        else{
          reject(error + response.statusCode);
        }
      });
    });
    //--------------------------------------------------

    //----------------Initalize findItems Promise------
    findItems.then(function(body){
      let searchResponse = JSON.parse(body);
      searchResponse.forEach(function (item){
        rule.parseItem(item);
      });
    },
    function(error, code){
      console.log(error + " : " + code);
    });
    //-------------------------------------------------



  }
}
