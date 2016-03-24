import {repository_crawl} from "./io.github.alpha-dev.objtemplates/repository_crawl.js";

import {Rule} from "./io.github.alpha-dev.rules/Rule.js";

console.log("meme");
let repoCrawl = new repository_crawl("Alpha-Dev/Recodify", "", "master", new Rule()).beginCrawl();
