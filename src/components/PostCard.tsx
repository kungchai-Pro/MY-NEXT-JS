"use client";

import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
  onDelete?: (id: string) => void;
}

export function PostCard({ post, onDelete }: PostCardProps) {
  return (
    <article className="rounded-lg border border-(--color-border) p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold leading-snug">{post.title}</h2>
        {!post.published && (
          <span className="shrink-0 rounded-full bg-(--color-brand-100) px-2 py-0.5 text-xs font-medium text-(--color-brand-700)">
            Draft
          </span>
        )}
      </div>

      <p className="mt-2 line-clamp-3 text-sm text-(--color-muted)">
        {post.content}
      </p>

      <div className="mt-4 flex items-center justify-between text-xs text-(--color-muted)">
        <time dateTime={post.createdAt}>
          {new Date(post.createdAt).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        {onDelete && (
          <button
            onClick={() => onDelete(post.id)}
            className="rounded px-2 py-1 text-red-500 hover:bg-red-50 hover:text-red-700"
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
}
