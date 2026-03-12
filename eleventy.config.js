import yaml from "js-yaml";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { collections } from "./src/_config/collections.js";
import { filters } from "./src/_config/filters.js";
import { shortcodes } from "./src/_config/shortcodes.js";

export default async function (eleventyConfig) {
  // 11ty v3 does not support .yml data files by default — register the parser
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));

  // Automatically optimize every <img> in the built HTML output:
  // - Converts to WebP + JPEG with a srcset at 400, 800, and 1200px wide
  // - Preserves original if it's smaller than a given width
  // - Outputs to _site/assets/images/ and rewrites src/srcset attributes in place
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",
    formats: ["webp", "jpeg"],
    widths: [400, 800, 1200, "auto"],
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
      sizes: "(min-width: 1024px) 1200px, (min-width: 640px) 800px, 100vw",
    },
    outputDir: "./_site/assets/images/",
    urlPath: "/assets/images/",
  });

  // Passthrough copies — assets go straight to _site untouched
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch for CSS changes during dev
  eleventyConfig.addWatchTarget("src/assets/");

  // Register all collections, filters, shortcodes
  collections(eleventyConfig);
  filters(eleventyConfig);
  shortcodes(eleventyConfig);
}

export const config = {
  dir: {
    input: "src",
    output: "_site",
    includes: "_includes",
    data: "_data",
  },
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
};
