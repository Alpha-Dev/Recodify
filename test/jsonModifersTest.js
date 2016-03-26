"use strict";

var _jsonWriter = require("../dist/io.github.alpha-dev.objtemplates/jsonWriter.js");

var _jsonReader = require("../dist/io.github.alpha-dev.objtemplates/jsonReader.js");

var writer = new _jsonWriter.jsonWriter(__dirname + "/database");
var reader = new _jsonReader.jsonReader(__dirname + "/database");
var test = require('unit.js');
var fs = require("fs");

describe('JSON Writer Tests', function () {
  describe("Writing", function () {
    var first_file_toString = void 0;
    it('should change create a file', function (done) {
      writer.editInternalJsonFile("test", [["d", "hi"], ["meme", "widush"], ["life", "pain"]]);
      writer.writeInternalJsonFile().then(function () {
        fs.exists(__dirname + "/database/test.json", function (exists) {
          test.assert(exists === true);
          first_file_toString = writer.toString();
          done();
        });
      });
    });
    it('should change create a different file', function (done) {
      writer.editInternalJsonFile("test2", [["d4", "hi"], ["mem44e", "widush"], ["lif44e", "pain"]]);
      writer.writeInternalJsonFile().then(function () {
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
    writer.editInternalJsonFile("test", [["d", "hi"], ["meme", "widush"], ["life", "plain"]]);
    writer.writeInternalJsonFile().then(function () {
      writer.editInternalJsonFile("test2", [["d", "gaf"], ["mfuck", "widush"], ["gfe", "pgin"]]);
      writer.writeInternalJsonFile().then(function () {
        writer.editInternalJsonFile("test3", [["d", "gaf"], ["mfuck", "widush"], ["gfe", "pgin"]]);
        writer.writeInternalJsonFile().then(function () {
          done();
        });
      });
    });
  });
  describe("Reading", function () {
    it('should read the json file', function (done) {
      reader.loadJson("test").then(function () {
        test.assert(reader.getInternalJsonValue().id === "test");
        done();
      });
    });
  });
  describe("Get File Names and Full Array", function () {
    it("should have 3 files", function (done) {
      reader.getFileNames().then(function (files) {
        test.assert(files.length === 3);
        done();
      });
    });
    it("should contain test.json, test2.json and test3.json", function (done) {
      reader.getFullDatabaseArray().then(function (arr) {
        test.assert(arr[0].id === 'test');
        test.assert(arr[1].id === 'test2');
        test.assert(arr[2].id === 'test3');
        done();
      });
    });
  });
  //dddddfuck
});