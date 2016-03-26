"use strict";

var _jsonData = require("../dist/io.github.alpha-dev.objtemplates/jsonData.js");

var writer = new _jsonData.jsonWriter(__dirname + "/database");
var test = require('unit.js');
var fs = require("fs");

describe('JSON Writer Tests', function () {
  describe("Writing", function () {
    var first_file_toString = void 0;
    it('should change create a file', function (done) {
      writer.editJsonFile("test", [["d", "hi"], ["meme", "widush"], ["life", "pain"]]);
      writer.writeJsonFile().then(function () {
        fs.exists(__dirname + "/database/test.json", function (exists) {
          test.assert(exists === true);
          first_file_toString = writer.toString();
          done();
        });
      });
    });
    it('should change create a different file', function (done) {
      writer.editJsonFile("test2", [["d4", "hi"], ["mem44e", "widush"], ["lif44e", "pain"]]);
      writer.writeJsonFile().then(function () {
        test.assert(first_file_toString != writer.toString());
        done();
      });
    });
  });
  describe("Deleting", function () {
    it('should delete the file', function (done) {
      writer.deleteJson("test").then(function () {
        fs.exists(__dirname + "/database/test.json", function (exists) {
          test.assert(exists === false);
          done();
        });
      });
    });
    it('should delete the other test file', function (done) {
      writer.deleteJson("test2").then(function () {
        fs.exists(__dirname + "/database/test2.json", function (exists) {
          test.assert(exists === false);
          done();
        });
      });
    });
  });
});
describe('JSON Reader Tests', function () {
  before(function (done) {
    writer.editJsonFile("test", [["d", "hi"], ["meme", "widush"], ["testerval", 1]]);
    writer.writeJsonFile().then(function () {
      writer.editJsonFile("test2", [["d", "gaf"], ["mfuck", "widush"], ["gfe", JSON.stringify(["test", "test", "test"])]]);
      writer.writeJsonFile().then(function () {
        writer.editJsonFile("test3", [["d", "gaf"], ["mduck", true], ["gfe", JSON.stringify({
          thing: "test",
          fucker: "meme"
        })]]);
        writer.writeJsonFile().then(function () {
          done();
        });
      });
    });
  });
  describe("Reading", function () {
    it('should read the json file', function (done) {
      writer.loadJson("test").then(function () {
        test.assert(writer.getJsonValue().id === "test");
        done();
      });
    });
    describe("Get File Names and Full Array", function () {
      it("should have 3 files", function (done) {
        writer.getFileNames().then(function (files) {
          test.assert(files.length === 3);
          done();
        });
      });
      it("should contain test.json, test2.json and test3.json", function (done) {
        writer.getDatabaseArray().then(function (arr) {
          test.assert(arr[0].id === 'test');
          test.assert(arr[1].id === 'test2');
          test.assert(arr[2].id === 'test3');
          done();
        });
      });
    });
    describe("Searching The Database", function (done) {
      it("should find the JSON with a testerval of 1", function (done) {
        writer.searchDatabase("testerval", "===", 1).then(function (files) {
          test.assert(files[0].id === "test");
          done();
        });
      });
      it("should find the JSON with a matching object value for gfe", function (done) {
        writer.searchDatabase("gfe", "===", JSON.stringify({
          thing: "test",
          fucker: "meme"
        })).then(function (files) {
          test.assert(files[0].id === "test3");
          done();
        });
      });
      it("should find the JSON with a matching array value for gfe", function (done) {
        writer.searchDatabase("gfe", "===", JSON.stringify(["test", "test", "test"])).then(function (files) {
          test.assert(files[0].id === "test2");
          done();
        });
      });
      it("should find the JSON with a true value for mduck", function (done) {
        writer.searchDatabase("mduck", "===", true).then(function (files) {
          test.assert(files[0].id === "test3");
          done();
        });
      });
      it("should find the JSON with a testerval greater than 0", function (done) {
        writer.searchDatabase("testerval", ">", 0).then(function (files) {
          test.assert(files[0].id === "test");
          done();
        });
      });
      it("should find the JSON with a testerval < 2", function (done) {
        writer.searchDatabase("testerval", "<", 2).then(function (files) {
          test.assert(files[0].id === "test");
          done();
        });
      });
      it("should find the JSONs with a d value not equal to hi", function (done) {
        writer.searchDatabase("d", "!==", "hi").then(function (files) {
          test.assert(files.length === 2);
          done();
        });
      });
    });
  });

  //dddddfuck
});