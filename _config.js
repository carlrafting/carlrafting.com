import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import feed from "lume/plugins/feed.ts";

import lang_xml from "npm:highlight.js/lib/languages/xml";
import lang_css from "npm:highlight.js/lib/languages/css";
import lang_javascript from "npm:highlight.js/lib/languages/javascript";
import lang_bash from "npm:highlight.js/lib/languages/bash";

console.log({
  deno: Deno.version,
});

const prod = Deno.env.get("DENO_ENV") === "prod";
const site = lume({
  src: "./src",
});
site.use(date());
site.use(codeHighlight({
  languages: {
    xml: lang_xml,
    css: lang_css,
    javascript: lang_javascript,
    bash: lang_bash,
  },
}));
site.use(feed({
  output: ["feed.xml", "feed.json"],
  query: "type=post",
  info: {
    title: "Carl Räftings Feed",
    description: "=site.title",
    generator: false,
  },
}));

site.data("prod", prod === true);

site.copy([".css", ".js"]);
site.copy("assets/manifest.webmanifest");
site.copyRemainingFiles();

// console.log({ site });

export default site;
