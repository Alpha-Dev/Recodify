"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rule = exports.Rule = function () {
  function Rule() {
    _classCallCheck(this, Rule);
  }

  _createClass(Rule, [{
    key: "getFileList",
    value: function getFileList() {
      return fileList;
    }

    //Abstract : Passes the file's body

  }, {
    key: "parseFile",
    value: function parseFile(fileBody, fileExtension) {
      console.log("This an abstract function");
    }
  }]);

  return Rule;
}();