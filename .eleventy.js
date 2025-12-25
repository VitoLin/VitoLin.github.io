import markdownIt from "markdown-it";
import MarkdownItTOC from "markdown-it-table-of-contents";
import AnchorPlugin from "markdown-it-anchor";
import path from "path";
import { pathToFileURL } from "url";
import siteData from "./src/_data/site.json" with { type: "json" };

export default async function (eleventyConfig) {
    // markdown-it setup
    let md = markdownIt({
        html: true,
        linkify: true,
    });

    eleventyConfig.setLibrary("md", md);

    // plugins https://www.npmjs.com/search?q=keywords:markdown-it-plugin
    md.use(MarkdownItTOC, { includeLevel: [2, 3, 4] });
    md.use(AnchorPlugin);

    eleventyConfig.addPassthroughCopy({
        "src/_includes/styles/style.css": "styles/style.css",
        "node_modules/animejs/dist/bundles/anime.esm.min.js":
            "js/anime.esm.min.js",
        "node_modules/three/build/three.module.min.js":
            "js/three.module.min.js",
        "node_modules/three/build/three.core.min.js": "js/three.core.min.js",
        "node_modules/@fortawesome/fontawesome-free/css/all.min.css":
            "styles/font-awesome.css",
        "node_modules/@fortawesome/fontawesome-free/webfonts": "webfonts",
        "node_modules/@highlightjs/cdn-assets/highlight.min.js":
            "js/highlight.min.js",
        [`node_modules/@highlightjs/cdn-assets/styles/${siteData.highlightStyle}`]: `styles/${siteData.highlightStyle}`,
    });

    const shortcodesLoader = path.join(
        "src/_includes/shortcodes",
        "shortcodes.js",
    );
    await import(pathToFileURL(shortcodesLoader).href).then((module) =>
        module.default(eleventyConfig),
    );

    return {
        dir: {
            input: "src",
            output: "_site",
            templateFormats: ["md", "liquid", "html"],
        },
    };
}
