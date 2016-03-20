var request = require("request");

class Crawler{
  //DEV: https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc
  const BaseSearchURL;
  constructor(baseURL){
    BaseSearchURL = baseURL;
  }
  beginCrawl(query){
    //First step
    let initialSearch = new Promise(function(resolve, reject, urlQuery){
      request(BaseSearchURL + "/" + urlQuery, function(error, response, body){
        if (!error && response.statusCode == 200) {
          resolve(body);
        }
        else{
          reject(error, response.statusCode);
        }
      });
    });

    let repositorySearch = new Promise(function(resolve, reject, url){
      request(url, function(error, response, body){
        if (!error && response.statusCode == 200) {
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
        new repository_crawl(item["html_url"]);
      });
    },
    function(error, responseCode){
      Error(error + " : " + responseCode);
    }, query);

  }
}
