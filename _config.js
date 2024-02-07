import lume from "lume/mod.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import feed from "lume/plugins/feed.ts";

import lang_xml from "npm:highlight.js/lib/languages/xml";
import lang_css from "npm:highlight.js/lib/languages/css";
import lang_javascript from "npm:highlight.js/lib/languages/javascript";
import lang_bash from "npm:highlight.js/lib/languages/bash";

const site = lume({
    location: new URL('https://carlrafting.com'),
    src: './src'
});
site.use(codeHighlight({
  languages: {
    xml: lang_xml,
    css: lang_css,
    javascript: lang_javascript,
    bash: lang_bash,
  },
}));
site.use(feed());

site.filter('log', (value) => console.log(value));
site.filter('date', (value) => {
    const locale = new Intl.DateTimeFormat('sv-se');
    return locale.format(value);
});

site.copy(['.css', '.js']);
site.copyRemainingFiles();

// console.log({ site });

export default site;
