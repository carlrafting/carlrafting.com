import lume from "lume/mod.ts";
import feed from "lume/plugins/feed.ts"

const site = lume({
    src: './src'
});
site.use(feed());

site.copy(['.css', '.js']);

export default site;
