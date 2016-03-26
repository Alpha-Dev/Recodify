import {jsonWriter} from "../dist/io.github.alpha-dev.objtemplates/jsonData.js";

let writer = new jsonWriter(__dirname+"/database");
let test = require('unit.js');
let fs = require("fs");

describe('JSON Writer Tests', function () {
  describe("Writing",function(){
  let first_file_toString;
  it('should change create a file', function (done) {
    writer.editJsonFile("test",[["d","hi"],["meme","widush"],["life","pain"]]);
    writer.writeJsonFile().then(()=>{
      fs.exists(__dirname+"/database/test.json", (exists) => {
        test.assert(exists === true);
        first_file_toString = writer.toString();
        done();
      });
    });
  });
  it('should change create a different file', function (done) {
    writer.editJsonFile("test2",[["d4","hi"],["mem44e","widush"],["lif44e","pain"]]);
    writer.writeJsonFile().then(()=>{
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
    writer.editJsonFile("test",[["d","hi"],["meme","widush"],["testerval",1]]);
    writer.writeJsonFile().then(()=>{
      writer.editJsonFile("test2",[["d","gaf"],["mfuck","widush"],["gfe",JSON.stringify(["test","test","test"])]]);
    writer.writeJsonFile().then(()=>{
      writer.editJsonFile("test3",[["d","gaf"],["mduck",true],["gfe",JSON.stringify({
        thing:"test",
        fucker:"meme"
      })
    ]]);
    writer.writeJsonFile().then(()=>{
      done();
    });
    });
    });
  });
  describe("Reading",()=>{
    it('should read the json file',(done)=>{
      writer.loadJson("test").then(()=>{
        test.assert(writer.getJsonValue().id === "test");
        done();
      });
    });
    describe("Get File Names and Full Array",()=>{
      it("should have 3 files",(done)=>{
        writer.getFileNames().then((files)=>{
          test.assert(files.length === 3);
          done();
        });
      });
      it("should contain test.json, test2.json and test3.json",(done)=>{
        writer.getDatabaseArray().then((arr)=>{
          test.assert(arr[0].id === 'test');
          test.assert(arr[1].id === 'test2');
          test.assert(arr[2].id === 'test3');
          done();
        });
      });
    });
    describe("Searching The Database",(done)=>{
      it("should find the JSON with a testerval of 1",(done)=>{
        writer.searchDatabase("testerval","===",1).then((files)=>{
          test.assert(files[0].id === "test");
          done();
        });
      });
      it("should find the JSON with a matching object value for gfe",(done)=>{
        writer.searchDatabase("gfe","===",JSON.stringify({
          thing:"test",
          fucker:"meme"
        })).then((files)=>{
          test.assert(files[0].id === "test3");
          done();
        });
      });
      it("should find the JSON with a matching array value for gfe",(done)=>{
        writer.searchDatabase("gfe","===",JSON.stringify(["test","test","test"])).then(files=>{
          test.assert(files[0].id === "test2");
          done();
        });
      });
      it("should find the JSON with a true value for mduck",done=>{
        writer.searchDatabase("mduck","===",true).then(files=>{
          test.assert(files[0].id === "test3");
          done();
        });
      });
      it("should find the JSON with a testerval greater than 0",done=>{
        writer.searchDatabase("testerval",">",0).then(files=>{
          test.assert(files[0].id === "test");
          done();
        });
      });
      it("should find the JSON with a testerval < 2",done=>{
        writer.searchDatabase("testerval","<",2).then(files=>{
          test.assert(files[0].id === "test");
          done();
        });
      });
      it("should find the JSONs with a d value not equal to hi",done=>{
        writer.searchDatabase("d","!==","hi").then(files=>{
          test.assert(files.length === 2);
          done();
        });
      });
    });
  });

//dddddfuck
});
