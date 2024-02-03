import lume from "lume/mod.ts";
import nunjucks from "lume/plugins/nunjucks.ts";
import feed from "lume/plugins/feed.ts"

const site = lume({
    src: './src'
});
site.use(feed());
site.use(nunjucks());

site.copy(['.css', '.js']);

export default site;
