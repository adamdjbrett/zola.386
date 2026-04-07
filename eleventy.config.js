import { DateTime } from "luxon";
import pluginRss from "@11ty/eleventy-plugin-rss";

const toDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const readingTime = (raw) => {
  const text = String(raw || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return 1;
  const words = text.split(" ").length;
  return Math.max(1, Math.round(words / 200));
};

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPassthroughCopy({ public: "/" });
  eleventyConfig.addFilter("readableDate", (value, format = "dd LLL yyyy") => {
    const date = toDate(value);
    if (!date) return "";
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat(format);
  });
  eleventyConfig.addFilter("htmlDateString", (value) => {
    const date = toDate(value);
    if (!date) return "";
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });
  eleventyConfig.addFilter("isoDate", (value) => {
    const date = toDate(value) || new Date();
    return DateTime.fromJSDate(date, { zone: "utc" }).toUTC().toISO();
  });
  eleventyConfig.addFilter("currentYear", () => DateTime.now().toFormat("yyyy"));
  eleventyConfig.addFilter("slugify", (value) => String(value || "").toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-"));
  eleventyConfig.addFilter("stripSlashes", (value) => String(value || "").replace(/^\/+|\/+$/g, ""));
  eleventyConfig.addFilter("absoluteUrl", (url, base = "http://localhost:8080") => {
    if (!url) return base;
    return new URL(url, base).toString();
  });
  eleventyConfig.addFilter("readingTime", (value) => readingTime(value));
  eleventyConfig.addFilter("postsByTag", (posts, tag) => {
    const safeTag = String(tag || "").toLowerCase();
    return (posts || []).filter((post) =>
      (post.data.tags || []).some((item) => String(item).toLowerCase() === safeTag)
    );
  });
  eleventyConfig.addFilter("postsByCategory", (posts, category) => {
    const safeCategory = String(category || "").toLowerCase();
    return (posts || []).filter((post) =>
      (post.data.categories || []).some((item) => String(item).toLowerCase() === safeCategory)
    );
  });

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("content/posts/*.{md,njk,html}")
      .filter((item) => item.data.draft !== true)
      .sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const tags = new Set();
    for (const item of collectionApi.getFilteredByGlob("content/posts/*.{md,njk,html}")) {
      for (const tag of item.data.tags || []) {
        if (["all", "posts"].includes(tag)) continue;
        tags.add(tag);
      }
    }
    return [...tags].sort((a, b) => a.localeCompare(b));
  });
  eleventyConfig.addCollection("categoryList", (collectionApi) => {
    const categories = new Set();
    for (const item of collectionApi.getFilteredByGlob("content/posts/*.{md,njk,html}")) {
      for (const category of item.data.categories || []) {
        if (["all", "posts"].includes(category)) continue;
        categories.add(category);
      }
    }
    return [...categories].sort((a, b) => a.localeCompare(b));
  });
  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
    dir: { input: "content", includes: "../_includes", data: "../_data", output: "_site" }
  };
}
