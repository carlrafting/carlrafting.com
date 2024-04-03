import lumeCMS, { Kv } from "lume/cms.ts";

const cms = lumeCMS();
const kv = await Deno.openKv();

cms.storage("bookmarks", new Kv({ kv }));

cms.collection("posts: Blog posts on various topics...", "src:posts/*.md", [
  "title: text",
  "description: text",
  "slug: text",
  "content: markdown",
]);

cms.collection(
  "bookmarks: Bookmarks from around the world wide web i find interesting",
  "bookmarks",
  [
    "title: text",
    "url: url",
    "description: markdown",
    "datetime: datetime",
  ],
);

cms.document("about: About the website and me...", "src:about.md", [
  "title: text",
  "content: markdown",
]);

export default cms;
