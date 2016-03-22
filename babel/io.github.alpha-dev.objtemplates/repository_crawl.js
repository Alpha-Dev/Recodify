//Crawls the repo
export class repository_crawl{
  constructor(name, path, default_branch, rule){
    this.full_name = name;
    this.crawlRule = rule;
    this.filePath = path;
    this.branch = default_branch;
    this.BASE_URL = "https://api.github.com/repos/";
    this.PATH = "/contents/";
  }

  //Searches root of repository to get a list of files and directories
  getRootFiles(){
    let findRootFiles = new Promise(function(resolve, reject){
      request(BASE_URL + full_name + PATH + filePath, function(error, response, body){
        if (!error && response.statusCode == 200) {
          resolve(body);
        }
        else{
          reject(error, response.statusCode);
        }
      });
    });

    let getFileBody = new Promise(function(resolve, reject){
      request("https://raw.githubusercontent.com/" + full_name + "/" + branch + "/" + filePath, function(error, response, body){
        if (!error && response.statusCode == 200) {
          resolve(body);
        }
        else{
          reject(error, response.statusCode);
        }
      });
    });


      findRootFiles.then(function(body){
        let searchResponse = JSON.parse(body);

        searchResponse.forEach(function (item){
          if(item["type"] === "file"){
            getFileBody.then(function(body){
                //TODO
                var file = filePath.split("/");
                var fileSplit = file[file.length - 1].split(".");
                var fileName = fileSplit[fileSplit.length - 1];

                crawlRule.parseFile(body, fileName);
            });
          }
          else{
            repository_crawl(full_name, filePath, branch, crawlRule);
          }
        });
      },
      function(error, responseCode){
        console.log(error + " : " + responseCode);
      });

  }

  beginCrawl(){

  }


}
