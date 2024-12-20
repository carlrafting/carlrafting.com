import Server from "lume/core/server.ts";
import www from "lume/middlewares/www.ts";
import precompress from "lume/middlewares/precompress.ts";

const port = 8080;
const root = `${Deno.cwd()}/_site`;
const server = new Server({
    port,
    root,
});
server.use(precompress());
server.use(www({ add: false }));

server.start();

console.log(`Listening on http://localhost:${port}`);
