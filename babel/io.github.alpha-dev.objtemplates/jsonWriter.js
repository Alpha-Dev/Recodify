export class jsonWriter{
    constructor(filepath){
      this.fs = require('fs');
      this.path = require('path');
      this.mkdirp = require("mkdirp");
      this.filepath = filepath;
    }
    editInternalJsonFile(object_id,propertiesArray){
      //("fuck",[["fucker","hi"],["meme","widush"],["life","pain"]]) will create {"id":"fuck","fucker":"hi","meme":"widush","life":"pain"};
      this.internalJson = {id:object_id};
      //Iterates over the passed two dimensional array, adding properties to the internal object
      for(let a = 0;a<propertiesArray.length;a++){
        this.internalJson[propertiesArray[a][0]] = propertiesArray[a][1];
      }
      return 0;
    }
    logInternalJsonFile(){
      console.log(this.internalJson);
    }
    getInternalJsonValue(){
      return this.internalJson;
    }
    changeFilePath(passed_filepath){
      this.filepath = passed_filepath;
    }
    toString(){
      let thisContext = this;
      return JSON.stringify(thisContext.internalJson);
    }
    writeInternalJsonFile(){
      let thisContext = this;
      return new Promise((resolve,reject) =>{
        new Promise((resolve,reject)=>{
          thisContext.mkdirp(thisContext.filepath, function (err) {
            if (err) reject(err);
            else resolve();
          });
        }).then(function(){
          thisContext.fs.writeFile(thisContext.path.join(thisContext.filepath,thisContext.internalJson.id+".json"), JSON.stringify(thisContext.internalJson), (err) => {
            if (err){
              reject(err);
            }
            else {
                resolve();
            }
          });
        });
      });
    }
    deleteJson(id){
      let thisContext = this;
      return new Promise((resolve,reject)=>{
        thisContext.fs.unlink((thisContext.path.join(thisContext.filepath,(id+".json"))),(err) =>{
          if(err){
            reject(err);
          }
          else{
            resolve();
          }
        });
      });
    }
}
