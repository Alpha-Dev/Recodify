"use strict";

var _jsonWriter = require("../dist/io.github.alpha-dev.objtemplates/jsonWriter.js");

var writer = new _jsonWriter.jsonWriter(__dirname + "/../database");
var test = require('unit.js');
var fs = require("fs");

describe('JSON Writer Tests', function () {
  describe("Writing", function () {
    var first_file_toString = void 0;
    it('should change create a file', function (done) {
      writer.editInternalJsonFile("test", [["d", "hi"], ["meme", "widush"], ["life", "pain"]]);
      writer.writeInternalJsonFile().then(function () {
        fs.exists(__dirname + "/../database/test.json", function (exists) {
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
        fs.exists(__dirname + "/../database/test.json", function (exists) {
          test.assert(exists === false);
          done();
        });
      });
    });
    it('should delete the other test file', function (done) {
      writer.deleteJson("test2").then(function () {
        fs.exists(__dirname + "/../database/test2.json", function (exists) {
          test.assert(exists === false);
          done();
        });
      });
    });
  });
});
//dddddfuck