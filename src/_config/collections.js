export const collections = (eleventyConfig) => {
  // Blog posts: all markdown in src/content/blog/, sorted newest-first
  eleventyConfig.addCollection("blog", (collection) =>
    collection
      .getFilteredByGlob("src/content/blog/*.md")
      .sort((a, b) => b.date - a.date)
  );

  // All events sorted by event_date ascending
  eleventyConfig.addCollection("events", (collection) =>
    collection
      .getFilteredByGlob("src/content/events/*.md")
      .sort((a, b) => new Date(a.data.event_date) - new Date(b.data.event_date))
  );

  // Upcoming events only (event_date >= today), used on homepage feed
  eleventyConfig.addCollection("upcomingEvents", (collection) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return collection
      .getFilteredByGlob("src/content/events/*.md")
      .filter((event) => new Date(event.data.event_date) >= now)
      .sort((a, b) => new Date(a.data.event_date) - new Date(b.data.event_date));
  });
};
