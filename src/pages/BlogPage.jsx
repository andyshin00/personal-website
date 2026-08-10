import BlogCard from "../components/blog/BlogCard";
import { posts } from "../components/blog/posts";

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-16 pb-24 pt-2">
      <h1 className="font-serif font-bold text-4xl md:text-5xl text-text mb-8">
        my blogs
      </h1>

      <div className="border-t border-border">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
