export default {
  layout: "post.njk",
  tags: ["post"],
  eleventyComputed: {
    permalink: (data) => {
      if (data.permalink) return data.permalink;
      const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata",
        year: "numeric", month: "2-digit", day: "2-digit" });
      const [y, m, d] = fmt.format(new Date(data.date)).split("-");
      return `/${y}/${m}/${d}/${data.page.fileSlug}/`;
    },
  },
};
