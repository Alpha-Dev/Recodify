import {jsonWriter} from "./io.github.alpha-dev.objtemplates/jsonWriter.js";
let writer = new jsonWriter(__dirname+"/../database");
console.log(__dirname+"/../database");
writer.editInternalJsonFile("fuck",[["fucker","hi"],["meme","widush"],["life","pain"]]);
writer.writeInternalJsonFile().then(function(){
writer.editInternalJsonFile("124124",[["1414","hi"],["hail","hitler"],["uuu","ow"]]);
writer.writeInternalJsonFile().then(function(){
writer.deleteJson("fuck").then(()=>console.log("fuck deleted"));
});
});


/*
writer.writeInternalJsonFile().then(
writer.deleteJson("fuck").then(function(){
  console.log("fuck deleted");
})
);
*/
