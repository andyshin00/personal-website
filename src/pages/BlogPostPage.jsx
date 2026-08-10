import { useParams, Navigate, Link } from "react-router-dom";
import { mdxComponents } from "../components/blog/mdxComponents";
import { posts } from "../components/blog/posts";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const Post = post.Post;

  return (
    <div className="max-w-2xl mx-auto px-6 pb-24 pt-2">
      <Link
        to="/blog"
        className="text-sm text-muted hover:text-accent transition"
      >
        ← Back
      </Link>

      <article className="prose dark:prose-invert mt-6 max-w-none">
        <h1>{post.title}</h1>
        <p className="text-muted -mt-4">{post.date}</p>
        <Post components={mdxComponents} />
      </article>
    </div>
  );
}
