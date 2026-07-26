export default function (eleventyConfig) {
  // static assets copied as-is
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/wp-content": "wp-content" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  const MONTHS = ["", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const istParts = (d) => {
    const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata",
      year: "numeric", month: "2-digit", day: "2-digit" });
    const [y, m, day] = fmt.format(new Date(d)).split("-");
    return { y, m, day };
  };
  eleventyConfig.addFilter("niceDate", (d) => {
    const { y, m, day } = istParts(d);
    return `${parseInt(day)} ${MONTHS[parseInt(m)]} ${y}`;
  });
  eleventyConfig.addFilter("rfc822", (d) => new Date(d).toUTCString());
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString());
  eleventyConfig.addFilter("catName", (slug) => {
    const names = { river: "River", archive: "Archive" };
    return names[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  });

  // posts collection, newest first
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date));

  // month archives: [{key:"2026/01", year:2026, month:1, label:"January 2026", posts:[...]}]
  eleventyConfig.addCollection("byMonth", (api) => {
    const groups = {};
    for (const p of api.getFilteredByGlob("src/posts/*.md")) {
      const { y, m } = istParts(p.date);
      const key = `${y}/${m}`;
      (groups[key] = groups[key] || []).push(p);
    }
    return Object.entries(groups).map(([key, posts]) => {
      const [y, m] = key.split("/");
      posts.sort((a, b) => b.date - a.date);
      return { key, year: y, month: m, label: `${MONTHS[parseInt(m)]} ${y}`, posts };
    }).sort((a, b) => b.key.localeCompare(a.key));
  });

  // category pages data
  eleventyConfig.addCollection("byCategory", (api) => {
    const cats = ["river", "archive"];
    return cats.map((slug) => ({
      slug,
      posts: api.getFilteredByGlob("src/posts/*.md")
        .filter((p) => (p.data.categories || []).includes(slug))
        .sort((a, b) => b.date - a.date),
    })).filter((c) => c.posts.length);
  });

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
