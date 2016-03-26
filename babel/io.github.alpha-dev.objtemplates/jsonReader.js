export class jsonReader{
    constructor(passed_filepath){
      this.fs = require('fs');
      this.filepath = passed_filepath;
      this.path = require('path');
      this.internalJson = {};
    }
    loadJson(id){
      let thisContext = this;
      return new Promise(function(resolve,reject){
        thisContext.fs.readFile(thisContext.path.join(thisContext.filepath,(id + ".json")),'utf8',function read(err, data) {
          if(err) reject(err);
          else{
            thisContext.internalJson = JSON.parse(data);
            resolve(thisContext.internalJson);
          }
        });
      });
    }
    loadJsonSync(id){
      let thisContext = this;
      return thisContext.fs.readFileSync(thisContext.path.join(thisContext.filepath,(id + ".json")),'utf8');
    }
    load(id){
      return this.loadJson(id);
    }
    getInternalJsonValue(){
      return this.internalJson;
    }
    get(){
      return this.getInternalJsonValue();
    }
    toString(){
      let thisContext = this;
      return JSON.stringify(thisContext.internalJson);
    }
    logInternalJsonFile(){
      let thisContext = this;
      console.log(thisContext.internalJsonValue);
    }
    log(){
      this.logInternalJsonFile();
    }
    changeFilePath(passed_filepath){
      this.filepath = passed_filepath;
    }
    getFileNames(additional_path=""){
      let thisContext = this;
      return new Promise((resolve,reject)=>{
        thisContext.fs.readdir(thisContext.path.join(thisContext.filepath,additional_path),(err,files)=>{
          if(err) reject(err);
          else{
            resolve(files);
          }
        });
      });
    }
    getFullDatabaseArray(additional_path=""){
      let thisContext = this;
      let arr_to_return = [];
      return new Promise((resolve,reject)=>{
        this.getFileNames(additional_path).then((files)=>{
          for(var a = 0;a<files.length;a++){
            let file_to_load = files[a];
            if(file_to_load.includes(".json")){
              file_to_load = file_to_load.slice(0,file_to_load.indexOf(".json"));
            }
            arr_to_return[a] = JSON.parse(thisContext.loadJsonSync(file_to_load));
          }
          resolve(arr_to_return);
        });
      });
    }
}
