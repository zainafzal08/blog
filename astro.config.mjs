import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import lit from "@astrojs/lit";
import customElements from "custom-elements-ssr/astro.js";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.zainafzal.com",
  integrations: [mdx(), sitemap(), lit(), customElements()],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
  markdown: {
    remarkPlugins: ["remark-gfm", "remark-smartypants", "remark-math"],
    rehypePlugins: ["rehype-mathjax"],
    syntaxHighlight: "prism",
  },
});
