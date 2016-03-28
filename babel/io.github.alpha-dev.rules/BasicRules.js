import {repo_crawl} from "../io.github.alpha-dev.objtemplates/repo_crawl.js"
var request = require('request');

export class DirectoryRule{
  constructor(item){
    this.item = item;
  }

  execute(){
    let item = this.item;
    console.log("Directory: This is an abstract function");
    new repo_crawl(item["full_name"], "/" + item["name"], item["default_branch"]).getRootFiles();
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
  constructor(reponame, repoBranch, repoPath){
    this.reponame = reponame;
    this.repoBranch = repoBranch;
    this.repoPath = repoPath;
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
      new DirectoryRule(item).execute();
    }
  }

}
