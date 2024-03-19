import lumeCMS from "lume/cms.ts";

const cms = lumeCMS();

cms.storage("storage", "storage");

cms.collection("posts", "src:posts/*.md", [
  "title: text",
  "description: text",
  "slug: text",
  "content: markdown",
]);

export default cms;
