---
title: Hello!
layout: layouts/page.vto
templateEngine: [vto, md]
---

# Welcome dear web-traveler!

You have reached the home of Carl Räfting on the _World Wide Web_ 😉. If you want, [find out more about this website](/about/), or read some of my blog posts down below.

# Blog Posts

{{ for post of search.pages('type=post') }}

- [{{ post.title }}]({{ post.url }})

{{ /for }}
