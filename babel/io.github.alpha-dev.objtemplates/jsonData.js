export class jsonWriter {
  constructor(filepath) {
    this.fs = require('fs');
    this.path = require('path');
    this.mkdirp = require("mkdirp");
    this.filepath = filepath;
  }
  editJsonFile(object_id, propertiesArray) {
    //("fuck",[["fucker","hi"],["meme","widush"],["life","pain"]]) will create {"id":"fuck","fucker":"hi","meme":"widush","life":"pain"};
    this.internalJson = {
      id: object_id
    };
    //Iterates over the passed two dimensional array, adding properties to the internal object
    for (let a = 0; a < propertiesArray.length; a++) {
      this.internalJson[propertiesArray[a][0]] = propertiesArray[a][1];
    }
  }
  logJsonFile() {
    console.log(this.internalJson);
  }
  getJsonValue() {
    return this.internalJson;
  }
  changeFilePath(passed_filepath) {
    this.filepath = passed_filepath;
  }
  overWriteInternalJson(passed_obj) {
    this.internalJson = passed_obj;
  }
  toString() {
    let thisContext = this;
    return JSON.stringify(thisContext.internalJson);
  }
  writeJsonFile() {
    let thisContext = this;
    return new Promise((resolve, reject) => {
      new Promise((resolve, reject) => {
        thisContext.mkdirp(thisContext.filepath, function(err) {
          if (err) reject(err);
          else resolve();
        });
      }).then(function() {
        thisContext.fs.writeFile(thisContext.path.join(thisContext.filepath, thisContext.internalJson.id + ".json"), JSON.stringify(thisContext.internalJson), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  }
  deleteJson(id) {
    let thisContext = this;
    return new Promise((resolve, reject) => {
      thisContext.fs.unlink((thisContext.path.join(thisContext.filepath, (id + ".json"))), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  loadJson(id) {
    let thisContext = this;
    return new Promise(function(resolve, reject) {
      thisContext.fs.readFile(thisContext.path.join(thisContext.filepath, (id + ".json")), 'utf8', function read(err, data) {
        if (err) reject(err);
        else {
          thisContext.internalJson = JSON.parse(data);
          resolve(thisContext.internalJson);
        }
      });
    });
  }
  loadJsonSync(id) {
    let thisContext = this;
    return thisContext.fs.readFileSync(thisContext.path.join(thisContext.filepath, (id + ".json")), 'utf8');
  }
  load(id) {
    return this.loadJson(id);
  }
  getFileNames(additional_path = "") {
    let thisContext = this;
    return new Promise((resolve, reject) => {
      thisContext.fs.readdir(thisContext.path.join(thisContext.filepath, additional_path), (err, files) => {
        if (err) reject(err);
        else {
          resolve(files);
        }
      });
    });
  }
  searchDatabase(key,bool_operator,value){
    let thisContext = this;
    return new Promise((resolve,reject)=>{
      thisContext.getDatabaseArray().then((files)=>{
        let arr_to_return = [];
        for(var a = 0;a<files.length;a++){
          if(files[a][key]!==undefined){
            if(eval("\'"+files[a][key]+"\'" + bool_operator +"\'"+value+"\'")){
              arr_to_return.push(files[a]);
            }
          }
        }
        resolve(arr_to_return);
      });
    });
  }
  getDatabaseArray(additional_path = "") {
    let thisContext = this;
    let arr_to_return = [];
    return new Promise((resolve, reject) => {
      this.getFileNames(additional_path).then((files) => {
        for (var a = 0; a < files.length; a++) {
          let file_to_load = files[a];
          if (file_to_load.includes(".json")) {
            file_to_load = file_to_load.slice(0, file_to_load.indexOf(".json"));
          }
          arr_to_return[a] = JSON.parse(thisContext.loadJsonSync(file_to_load));
        }
        resolve(arr_to_return);
      });
    });
  }
}
