import {jsonWriter} from "../dist/io.github.alpha-dev.objtemplates/jsonWriter.js";

let writer = new jsonWriter(__dirname+"/../database");
let test = require('unit.js');
let fs = require("fs");

describe('JSON Writer Tests', function () {
  describe("Writing",function(){
  let first_file_toString;
  it('should change create a file', function (done) {
    writer.editInternalJsonFile("test",[["d","hi"],["meme","widush"],["life","pain"]]);
    writer.writeInternalJsonFile().then(()=>{
      fs.exists(__dirname+"/../database/test.json", (exists) => {
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
  describe("Deleting",function(){
    it('should delete the file',function(done){
      writer.deleteJson("test").then(()=>{
        fs.exists(__dirname+"/../database/test.json", (exists) => {
          test.assert(exists === false);
          done();
        });
      });
    });
    it('should delete the other test file',function(done){
      writer.deleteJson("test2").then(()=>{
        fs.exists(__dirname+"/../database/test2.json", (exists) => {
          test.assert(exists === false);
          done();
        });
      });
    });
  });
});
//dddddfuck
