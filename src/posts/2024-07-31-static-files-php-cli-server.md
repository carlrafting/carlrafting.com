---
title: Serving Static Files with PHP's CLI-Server
---

I recently stumbled upon a case where i needed to serve static files with PHP's
built in CLI-Server. This is of course only intended for local development. In a
live production environment you typically let a web server like Apache or Nginx
handle static files.

PHP's CLI-Server will handle all kinds of files automatically, if you only
provide a document root directory. Like so:

```sh
php -S localhost:8080 -t ./web
```

However, in some cases you might have a front-controller/router that handles all
incoming requests. In those cases it is up to the developer to implement some
kind of functionality for handling different types of requests. The
[PHP Documentation provides some information](https://www.php.net/manual/en/features.commandline.webserver.php#example-470)
on how to go about this.

First of, let's create some files for testing.

```php
<!-- web/index.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World!</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <h1>Hello World!</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum harum earum, assumenda adipisci a voluptatibus dolorum odit eos, nisi culpa atque rem ea aliquid maiores quisquam inventore vero mollitia alias.</p>
</body>
</html>
```

```css
/* web/css/styles.css */
body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
```

Let's see what a simple solution for handling static files might look like.

```php
# web/router.php
<?php

declare(strict_types=1);

if (PHP_SAPI === 'cli-server') { /* 1 */
    $uri = $_SERVER['REQUEST_URI'];
    if ((str_contains($uri, '.') && !str_contains($uri, '.php'))) { /* 2 */
        if (file_exists(__DIR__ . $uri)) { /* 3 */
            return false;
        }
    }
    require __DIR__ . '/index.php'; /* 4 */
}
```

Start the server with the following command in a terminal.

```sh
php -S localhost:8080 -t ./web ./web/router.php
```

The explanation to what happens in `router.php` are as follows:

1. Check if you're currently in cli-server mode, otherwise don't run this code.
2. Does the request uri contain any periods/dots? In that case it's probably a
   static file. You don't want to handle any PHP files since those are dynamic.
3. Does the requested file exist within the current directory? If it does let
   the CLI-Server handle it by returning `false`.
4. Serve the regular index file as usual.

It is possible to improve this implementation further. Let's say you have
another directory you want to serve files from as well. Let's call it `static`.
The structure should now look something like this:

```sh
+---static
|       hello.md
|       image.jpg
|
\---web
    |   index.php
    |   router.php
    |
    \---css
            styles.css
```

You'll need to modify `router.php` in order to serve files from `./static`. This
is what such implementation could look like.

```php
# web/router.php
<?php

declare(strict_types=1);

/* 1 */
const WEB_ROOT = '/web';
const STATIC_ROOT = '/static';

if (PHP_SAPI === 'cli-server') {
    $uri = $_SERVER['REQUEST_URI'];
    if ((str_contains($uri, '.') && !str_contains($uri, '.php')) || str_contains($uri, STATIC_ROOT)) {
        foreach ([WEB_ROOT, STATIC_ROOT] as $dir) { /* 2 */
            $file_path =
                $dir === WEB_ROOT
                ? __DIR__ . $uri
                : __DIR__ . '/..' . STATIC_ROOT . substr($uri, strlen($dir)); /* 3 */
            if (file_exists($file_path)) {
                if ($dir === WEB_ROOT) {
                    return false;
                }
                if ($dir === STATIC_ROOT) { /* 4 */
                    $extension = pathinfo($uri, PATHINFO_EXTENSION);
                    if ($extension) {
                        $content_type = null;
                        match ($extension) {
                            'css', 'js', 'md', 'txt' => $content_type = 'text/plain',
                            'jpg' => $content_type = 'image/jpg',
                            'png' => $content_type = 'image/png',
                            'pdf' => $content_type = 'application/pdf',
                            default => $content_type = 'text/html',
                        };
                        header(sprintf("%s: %s", 'content-type', $content_type));
                        echo file_get_contents($file_path);
                        exit;
                    }
                }
            }
        }
    }
    require __DIR__ . '/index.php';
}
```

1. At the top you define a constant for each directory you want to serve files
   from.
2. Here you loop through each constant since you want to check for different
   things within the loop.
3. You'll want to return a different file path depending on where the file
   exists since `STATIC_ROOT` exists outside of `WEB_ROOT`.
4. If a file exists in the `STATIC_ROOT` directory and has an extension, and the
   uri contains `/static`, get contents of the file and output correct
   content-type for the file.

Now you'll have a basic solution for handling static files without the need for
a framework. It's by no means a complete implementation but it works for basic
local development.
