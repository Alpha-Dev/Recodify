import {repo_crawl} from "../io.github.alpha-dev.objtemplates/repo_crawl.js"
var request = require('request');

export class DirectoryRule{
  constructor(item, fullName, branch, authString){
    this.item = item;
    this.fullName = fullName;
    this.branch = branch;
    this.authString = authString;
  }

  execute(){
    let item = this.item;
    let fullName = this.fullName;
    let branch = this.branch;

    console.log("/" + item["path"]);

    console.log("Directory: This is an abstract function");
    new repo_crawl(fullName, "/" + item["path"], branch, this.authString).startCrawl();
  }
}

export class FileRule{
  constructor(itemBody, itemName){
    this.itemBody = itemBody;
    this.itemName = itemName;
  }

  execute(){
    console.log("File: This is an sbstract function");
  }
}

export class RuleType{
  constructor(reponame, repoBranch, repoPath, authString){
    this.reponame = reponame;
    this.repoBranch = repoBranch;
    this.repoPath = repoPath;
    this.authString = authString;
  }

  parseItem(item){
    console.log("https://raw.githubusercontent.com/" + this.reponame + "/" + this.repoBranch
     + "/" + this.repoPath + "/" + item["name"]);

    if(item["type"] === "file"){
      request("https://raw.githubusercontent.com/" + this.reponame + "/" + this.repoBranch
       + "/" + this.repoPath + "/" + item["name"], function(error, response, body){

        if (!error && response.statusCode == 200) {
          new FileRule(body, item["name"]).execute();
        }
        else{
          console.log(err + " : " + statusCode);
        }
      });
    }
    else{
      new DirectoryRule(item, this.reponame, this.repoBranch, this.authString).execute();
    }
  }

}
