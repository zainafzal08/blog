# blog
My Personal Blog, blog posts are written in markdown in src/posts, you can use build.py to generate a `/docs` folder with the built html files with beautiful css and js.

## Making a new post
You basically write up a post in posts and when you run build, it'll create a entry for it in 
meta.json, this will automatically assign it a post date (or if it's changed a last updated date).
The way build.py detects if it's changed is with a md5 hash of the file which is stores in meta.json.

This means you can just edit the markdown / write new posts and it all just works. 

## Special Syntax

When writing a post you can more or less use normal markdown, however you must note that the first line of the file becomes the post title. This will be used to generate the html file and assign the post a url, if you wanna override the url you can edit meta.json.

Within the posts markdown you can also have javascript code snippets that can be run, to create one of these you use the code snippet language "js-interactive". build.py will do the rest.

```
\`\`\`js-interactivess
alert('wow');
\`\`\`
```

You can also insert a mdi icon by doing `!{icon_name}` i.e

```
i !{heart} you
```

Note your icon references should be snake cased

```
i !{heart-outline} you
```

Lastly you can specify the tags at the top of the markdown doc with 

<TODO>

## TODO

1. index page showing all posts in a grid like fashion (based off meta.json)
2. js-interactive
3. tags + tag syntax
4. optimise for mobile
5. sidebar