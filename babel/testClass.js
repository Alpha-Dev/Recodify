import {jsonWriter} from "./io.github.alpha-dev.objtemplates/jsonWriter.js";
import {jsonReader} from "./io.github.alpha-dev.objtemplates/jsonReader.js";
let fs = require('fs');
let writer = new jsonWriter(__dirname+"/../database");
let reader = new jsonReader(__dirname+"/../database");
let path = require('path');
reader.load("test").then(()=>{
  console.log(reader.get().id);
});
/*
  writer.editInternalJsonFile("fuck",[["fucker","hi"],["meme","widush"],["life","pain"]]);
  writer.writeInternalJsonFile().then(function(){
  reader.loadJson("fuck").then(function(){
  reader.logInternalJsonFile();
  });
  });


/*
writer.writeInternalJsonFile().then(
writer.deleteJson("fuck").then(function(){
  console.log("fuck deleted");
})
);
*/
