import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

export default function BlogCard({ post }) {
  const tags = post.tags || [];

  return (
    <Link to={post.href} className="group block py-6 border-b border-border">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="font-semibold text-text group-hover:text-accent transition">
          {post.title}
        </h3>

        <span className="shrink-0 inline-flex items-center gap-1.5 font-mono text-xs text-muted">
          <Calendar size={13} />
          {post.date}
        </span>
      </div>

      {post.description && (
        <p className="text-sm text-muted leading-relaxed mb-3 max-w-2xl">
          {post.description}
        </p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-muted  bg-bg border border-border rounded px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
