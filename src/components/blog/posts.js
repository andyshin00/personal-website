// Vite feature, automatically finds every post in src/mdx.
const files = import.meta.glob("../../mdx/*.mdx", { eager: true });

export const posts = Object.entries(files)
  .map(([path, file]) => {
    const slug = path.split("/").pop().replace(".mdx", "");

    return {
      slug,
      href: `/blog/${slug}`,
      Post: file.default,
      ...file.meta,
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));
