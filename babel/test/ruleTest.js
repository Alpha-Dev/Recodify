import {DirectoryRule} from "../io.github.alpha-dev.rules"
import {RuleType} from "../io.github.alpha-dev.rules"
import {FileRule} from "../io.github.alpha-dev.rules"
describe("Rule Tests", function(){
  it("Test RuleType class", function(){
    new RuleType("Alpha-Dev/Recodify", "master", "/")
  });
  it("Test FileRule class", function(){
    new FileRule("meme", "test.js").execute();
  });
  it("Test DirectoryRule class",function(){
    new DirectoryRule("FolderOfMemes").execute();
  });
});
