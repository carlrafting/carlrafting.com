import lume from "lume/mod.ts";
import redirects from "lume/plugins/redirects.ts";
import date from "lume/plugins/date.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import feed from "lume/plugins/feed.ts";
import sitemap from "lume/plugins/sitemap.ts";
import checkUrls from "lume/plugins/check_urls.ts";

import lang_xml from "npm:highlight.js/lib/languages/xml";
import lang_css from "npm:highlight.js/lib/languages/css";
import lang_javascript from "npm:highlight.js/lib/languages/javascript";
import lang_bash from "npm:highlight.js/lib/languages/bash";

import { enGB } from "npm:date-fns@4.1.0/locale/en-GB";
import { sv } from "npm:date-fns@4.1.0/locale/sv";

const prod = Deno.env.get("DENO_ENV") === "prod";
const site = lume({
  src: "./src",
  location: new URL('https://carlrafting.com')
});
site.use(checkUrls());
site.use(redirects());
site.use(date({
  locales: { enGB, sv }
}));
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
    title: "Carl Räftings WWW",
    description: "Feed for Carl Räftings WWW",
    generator: false,
  },
}));
site.use(sitemap());

site.data("prod", prod === true);

site.copy([".css", ".js"]);
site.copy("assets/manifest.webmanifest");
site.copyRemainingFiles();

// console.log({ site });

export default site;
