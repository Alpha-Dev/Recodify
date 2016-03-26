import {jsonWriter} from "../dist/io.github.alpha-dev.objtemplates/jsonWriter.js";
import {jsonReader} from "../dist/io.github.alpha-dev.objtemplates/jsonReader.js";

let writer = new jsonWriter(__dirname+"/database");
let reader = new jsonReader(__dirname+"/database");
let test = require('unit.js');
let fs = require("fs");

describe('JSON Writer Tests', function () {
  describe("Writing",function(){
  let first_file_toString;
  it('should change create a file', function (done) {
    writer.editInternalJsonFile("test",[["d","hi"],["meme","widush"],["life","pain"]]);
    writer.writeInternalJsonFile().then(()=>{
      fs.exists(__dirname+"/database/test.json", (exists) => {
        test.assert(exists === true);
        first_file_toString = writer.toString();
        done();
      });
    });
  });
  it('should change create a different file', function (done) {
    writer.editInternalJsonFile("test2",[["d4","hi"],["mem44e","widush"],["lif44e","pain"]]);
    writer.writeInternalJsonFile().then(()=>{
      test.assert(first_file_toString != writer.toString());
      done();
    });
  });
});
  describe("Deleting",()=>{
    it('should delete the file',(done)=>{
      writer.deleteJson("test").then(()=>{
        fs.exists(__dirname+"/database/test.json", (exists) => {
          test.assert(exists === false);
          done();
        });
      });
    });
    it('should delete the other test file',(done)=>{
      writer.deleteJson("test2").then(()=>{
        fs.exists(__dirname+"/database/test2.json", (exists) => {
          test.assert(exists === false);
          done();
        });
      });
    });
  });
});
describe('JSON Reader Tests',()=>{
  before(function(done){
    writer.editInternalJsonFile("test",[["d","hi"],["meme","widush"],["life","plain"]]);
    writer.writeInternalJsonFile().then(()=>{
      writer.editInternalJsonFile("test2",[["d","gaf"],["mfuck","widush"],["gfe","pgin"]]);
    writer.writeInternalJsonFile().then(()=>{
      writer.editInternalJsonFile("test3",[["d","gaf"],["mfuck","widush"],["gfe","pgin"]]);
    writer.writeInternalJsonFile().then(()=>{
      done();
    });
    });
    });
  });
  describe("Reading",()=>{
    it('should read the json file',(done)=>{
      reader.loadJson("test").then(()=>{
        test.assert(reader.getInternalJsonValue().id === "test");
        done();
      });
    });
  });
  describe("Get File Names and Full Array",()=>{
    it("should have 3 files",(done)=>{
      reader.getFileNames().then((files)=>{
        test.assert(files.length === 3);
        done();
      });
    });
    it("should contain test.json, test2.json and test3.json",(done)=>{
      reader.getFullDatabaseArray().then((arr)=>{
        test.assert(arr[0].id === 'test');
        test.assert(arr[1].id === 'test2');
        test.assert(arr[2].id === 'test3');
        done();
      });
    });
  });
//dddddfuck
});
