# blog

My Personal Blog, blog posts are written in markdown in docs/markdown.
These are hidden until added to meta.json

## Special Syntax

#### Icons

You can insert a mdi icon by doing `!{icon_name}` i.e

```
i !{heart} you
```

Note your icon references should be kebab cased

```
i !{heart-outline} you
```

## TODO

0. Icons don't work.
1. Check loading page.
2. Ensure index page has posts in reverse chronological order.
3. Update colors scheme to match a bit more with zainafzal.com
4. FAB on posts to go back home
5. Mobile Support.
6. Bundle more things at build time so on first load we arn't doing so many
   requests.
7. Script to update meta.json automatically.
   - Can use file creation time to tag posts for new files. Do not update
     old files however.
   - Run this automatically on "deploy"
8. Light / Dark mode toggle.
   - Maybe let users pick any color to set the theme of the web page :O
