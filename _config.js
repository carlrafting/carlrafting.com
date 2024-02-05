import lume from "lume/mod.ts";
import feed from "lume/plugins/feed.ts"

const site = lume({
    location: new URL('https://carlrafting.com'),
    src: './src'
});
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
