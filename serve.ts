import Server from "lume/core/server.ts";

const port = 8080;
const root = `${Deno.cwd()}/_site`;
const server = new Server({
    port,
    root,
});

server.start();

console.log(`Listening on http://localhost:${port}`);
