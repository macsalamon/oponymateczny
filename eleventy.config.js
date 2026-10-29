import markdownIt from "markdown-it";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

const md = markdownIt({ html: true, typographer: false });

export default function (eleventyConfig) {
  // Przepisuje linki i obrazki zaczynające się od "/" tak, by działały też pod /nazwa-repo/
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource-variable/dosis/files/dosis-latin-wght-normal.woff2": "fonts/dosis-latin.woff2",
    "node_modules/@fontsource-variable/dosis/files/dosis-latin-ext-wght-normal.woff2": "fonts/dosis-latin-ext.woff2",
  });

  // Telefon do linku tel: (zostawia tylko cyfry, dodaje +48)
  eleventyConfig.addFilter("tel", (n) => "tel:+48" + String(n).replace(/\D/g, ""));

  // Tekst z plików danych (zwykły tekst z pogrubieniami itp.) -> HTML
  eleventyConfig.addFilter("md", (s) => md.render(String(s ?? "")));

  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  return {
    dir: { input: "src", output: "_site" },
    // Na GitHub Pages bez własnej domeny strona leży pod /nazwa-repo/; workflow ustawia to automatycznie.
    pathPrefix: process.env.PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
