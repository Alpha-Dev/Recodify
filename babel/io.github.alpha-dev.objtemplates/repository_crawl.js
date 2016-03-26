var request = require('request');
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

function getBodyPromise(full_name, branch, filePath, fileNm){
        //Promise which gets a file's body. Run only if the object type is a file

        return new Promise(function(resolve, reject){
          request("https://raw.githubusercontent.com/" + full_name + "/" + branch + "/" + filePath + "/" + fileNm, function(error, response, body){
            if (!error && response.statusCode == 200) {
              resolve(body);
            }
            else{
              console.log(body);
              console.log("filebodyerr" + response.statusCode);
              reject(error, response.statusCode);
            }
          });
        });
      }

//Crawls the repo
export class repository_crawl{
  //NOTE: ES6 has issues with classwide variables, set them here using 'this'
  constructor(name, path, default_branch, rule){
    this.full_name = name;
    this.crawlRule = rule;
    this.filePath = path;
    this.branch = default_branch;
    this.BASE_URL = "https://api.github.com/repos/";
    this.PATH = "/contents/";
  }

  //Searches root of repository to get a list of files and directories
  //NOTE: Clone the classwide variables into the function's scope
  getRootFiles(){
    let BASE_URL = this.BASE_URL;
    let full_name = this.full_name;
    let PATH = this.PATH;
    let branch = this.branch;
    let filePath = this.filePath;
    let crawlRule = this.crawlRule;

    //Promise that finds files in the repository's root direcetory
    let findRootFiles = new Promise(function(resolve, reject){
      request({
          url: BASE_URL + full_name + PATH + filePath + AUTH_STRING,
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

    //TODO: Commented out until bug fix
    //Promise which gets a file's body. Run only if the object type is a file
    let getFileBody = new Promise(function(resolve, reject){

      /*request("https://raw.githubusercontent.com/" + full_name + "/" + branch + "/" + filePath, function(error, response, body){
        if (!error && response.statusCode == 200) {
          resolve(body);
        }
        else{
          console.log(response.statusCode);
          reject(error, response.statusCode);
        }
      });*/
    });


      findRootFiles.then(function(body){
        let searchResponse = JSON.parse(body);
        searchResponse.forEach(function (item){

          //If this file has content then download contentx
          if(item["type"] === "file"){
            getBodyPromise(full_name, branch, filePath, item["name"]).then(function(body){
                //TODO

                var fileSplit = item["name"].split(".");
                crawlRule.parseFile(body, fileSplit[fileSplit.length - 1]);
            });
          }
          else{
            //Otherwise crawl through the directory

            new repository_crawl(full_name, "/" + item["name"], branch, crawlRule).beginDirectoryCrawl(item["name"] + "/");
          }
        });
      },
      function(error){
        console.log(error);
        throw new Error(error);
      });

  }

  beginDirectoryCrawl(dir){
    let currentDir = dir;
    let BASE_URL = this.BASE_URL;
    let full_name = this.full_name;
    let PATH = this.PATH;
    let branch = this.branch;
    let filePath = this.filePath;
    let crawlRule = this.crawlRule;

    let findRootFiles = new Promise(function(resolve, reject){
      request({
          url: BASE_URL + full_name + PATH + filePath + AUTH_STRING,
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


    findRootFiles.then(function(body){
      let searchResponse = JSON.parse(body);
      searchResponse.forEach(function (item){

        //If this file has content then download content
        if(item["type"] === "file"){

          getBodyPromise(full_name, branch, filePath, item["name"]).then(function(body){

            var fileSplit = item["name"].split(".");
            crawlRule.parseFile(body, fileSplit[fileSplit.length - 1]);
          },
          function(error){
            console.log(error);
            throw new Error(error);
          });
        }
        else{
          //Otherwise crawl through the directory

          new repository_crawl(full_name, "/" + currentDir + item["name"], branch, crawlRule).beginDirectoryCrawl(currentDir + item["name"] + "/");
        }
      });
    },
    function(error){
      console.log(error);
      throw new Error(error);
    });
  }


}
