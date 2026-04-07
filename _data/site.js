const isProduction = process.env.ELEVENTY_ENV === "production";
const productionUrl = process.env.SITE_URL || "https://zola386.netlify.app";

export default {
  title: "ZOLA.386",
  description: "A port of the BOOTSTRA.386 theme.",
  language: "en",
  author: "José Lopes",
  year: "2020",
  keywords: "zola, theme, retro, hacking",
  themeColor: "#000084",
  image: "https://raw.githubusercontent.com/lopes/zola.386/master/screenshot.png",
  twitterUser: "lopesoj",
  linkedinUser: "jlopesjr",
  githubUser: "lopes",
  gitlabUser: "",
  url: isProduction ? productionUrl : "http://localhost:8080",
  generateRss: true,
  themeSlug: "zola.386",
  themeName: "zola.386",
  themeHomepage: "https://github.com/lopes/zola.386",
  themeDemo: "https://zola386.netlify.app/",
  themeAuthor: "José Lopes",
  themeLicense: "MIT",
  hasSearch: true,
  styles: ["/site.css"],
  zola386Menu: [
    { path: "", name: "Home" },
    { path: "categories", name: "Categories" },
    { path: "tags", name: "Tags" },
    { path: "about", name: "About" }
  ],
  labels: {
    tags: "Tags",
    tag: "Tag",
    categories: "Categories",
    category: "Category",
    author: "Author",
    date: "Date",
    taxonomy: "Taxonomy",
    reading: "Reading time",
    readMore: "Read more"
  }
};
