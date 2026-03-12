export const shortcodes = (eleventyConfig) => {
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addShortcode("youtubevideo", (url, caption) => {
    const videoId = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/
    )?.[1];
    if (!videoId) return "";
    return `<figure class="video-embed video-embed--youtube">
  <div class="video-embed__ratio">
    <iframe
      src="https://www.youtube-nocookie.com/embed/${videoId}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"
    ></iframe>
  </div>
  ${caption ? `<figcaption class="video-embed__caption">${caption}</figcaption>` : ""}
</figure>`;
  });
};
