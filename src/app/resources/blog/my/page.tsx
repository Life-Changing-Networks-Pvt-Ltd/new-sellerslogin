// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { deleteBlog, getMyBlogs, type BlogPost } from "@/api/blogApi";
// import { ProtectedRoute } from "@/components/blog/ProtectedRoute";
// export default function Page() { const [posts, setPosts] = useState<BlogPost[]>([]); const [error, setError] = useState(""); useEffect(() => { getMyBlogs().then(setPosts).catch(() => setError("Could not load your posts.")); }, []); const remove = async (post: BlogPost) => { if (!confirm(`Delete ${post.title}?`)) return; await deleteBlog(post.id || post._id); setPosts((items) => items.filter((item) => (item.id || item._id) !== (post.id || post._id))); }; return <ProtectedRoute><main className="mx-auto min-h-screen max-w-3xl p-8 pt-28" style={{ backgroundColor: "#e9d5ff" }}><div className="flex justify-between" style={{ backgroundColor: "#e9d5ff" }}><h1 className="text-3xl font-bold">My posts</h1><Link href="/resources/blog/create" className="rounded bg-[#0f5132] px-4 py-2 text-white">New post</Link></div>{error && <p className="mt-5 text-red-700">{error}</p>}<div className="mt-6 grid gap-3">{posts.map((post) => <div key={post.id || post._id} className="flex items-center justify-between rounded border bg-white p-4"><div><h2 className="font-semibold">{post.title}</h2><p className="text-sm text-slate-500">{post.published ? "Published" : "Draft"}</p></div><div className="flex gap-3"><Link className="underline" href={`/resources/blog/edit/${post.id || post._id}`}>Edit</Link><button className="text-red-700 underline" onClick={() => void remove(post)}>Delete</button></div></div>)}</div></main></ProtectedRoute>; }



"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  deleteBlog,
  getMyBlogs,
  type BlogPost,
} from "@/api/blogApi";

import { ProtectedRoute } from "@/components/blog/ProtectedRoute";

export default function Page() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getMyBlogs();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(
          "Failed to load your posts:",
          err,
        );
        setError("Could not load your posts.");
      } finally {
        setLoading(false);
      }
    };

    void loadPosts();
  }, []);

  const remove = async (post: BlogPost) => {
    const postId = post.id || post._id;

    if (!postId) {
      setError("This post does not have a valid ID.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${post.title}"?`,
    );

    if (!confirmed) return;

    setDeletingId(postId);
    setError("");

    try {
      await deleteBlog(postId);

      setPosts((items) =>
        items.filter(
          (item) =>
            (item.id || item._id) !== postId,
        ),
      );
    } catch (err) {
      console.error(
        "Failed to delete post:",
        err,
      );

      setError(
        "Could not delete the post. Please try again.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const publishedCount = posts.filter(
    (post) => post.published,
  ).length;

  const draftCount = posts.filter(
    (post) => !post.published,
  ).length;

  return (
    <ProtectedRoute>
      <main
        className="min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#e9d5ff" }}
      >
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-purple-700">
                  Author dashboard
                </p>

                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                  My posts
                </h1>

                <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
                  Manage your articles, edit drafts,
                  and keep your published content up
                  to date.
                </p>
              </div>

              <Link
                href="/resources/blog/create"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f5132] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0b4027] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5132] focus-visible:ring-offset-2"
              >
                <span className="text-lg leading-none">
                  +
                </span>
                New post
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-purple-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
              <p className="text-sm font-medium text-slate-500">
                Total posts
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {posts.length}
              </p>
            </div>

            <div className="rounded-2xl border border-purple-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
              <p className="text-sm font-medium text-slate-500">
                Published
              </p>

              <p className="mt-2 text-3xl font-bold text-emerald-700">
                {publishedCount}
              </p>
            </div>

            <div className="rounded-2xl border border-purple-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
              <p className="text-sm font-medium text-slate-500">
                Drafts
              </p>

              <p className="mt-2 text-3xl font-bold text-amber-600">
                {draftCount}
              </p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-purple-200/80 bg-white p-5 shadow-sm"
                >
                  <div className="h-5 w-2/3 rounded bg-slate-200" />
                  <div className="mt-3 h-4 w-24 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          )}

          {/* Posts */}
          {!loading && posts.length > 0 && (
            <div className="space-y-4">
              {posts.map((post) => {
                const postId =
                  post.id || post._id;

                const isDeleting =
                  deletingId === postId;

                return (
                  <article
                    key={postId}
                    className="group rounded-2xl border border-purple-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:p-6"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      {/* Post information */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="truncate text-lg font-semibold text-slate-900 sm:text-xl">
                            {post.title}
                          </h2>

                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                              post.published
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            <span
                              className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                                post.published
                                  ? "bg-emerald-500"
                                  : "bg-amber-500"
                              }`}
                            />

                            {post.published
                              ? "Published"
                              : "Draft"}
                          </span>
                        </div>

                        {post.excerpt && (
                          <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-slate-500">
                            {post.excerpt}
                          </p>
                        )}

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                          {post.createdAt && (
                            <span>
                              Created{" "}
                              {new Date(
                                post.createdAt,
                              ).toLocaleDateString()}
                            </span>
                          )}

                          {post.author?.name && (
                            <span>
                              By{" "}
                              {post.author.name}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 items-center gap-2">
                        <Link
                          href={`/resources/blog/edit/${postId}`}
                          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-[#0f5132] hover:bg-[#f0fdf4] hover:text-[#0f5132]"
                        >
                          Edit
                        </Link>

                        {post.slug && (
                          <Link
                            href={`/resources/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                          >
                            View
                          </Link>
                        )}

                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() =>
                            void remove(post)
                          }
                          className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isDeleting
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Empty state */}
          {!loading && posts.length === 0 && !error && (
            <div className="rounded-3xl border border-purple-200/80 bg-white p-10 text-center shadow-sm sm:p-16">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-3xl">
                ✍️
              </div>

              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                No posts yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                You haven't created any blog posts
                yet. Start writing and share your
                ideas with your audience.
              </p>

              <Link
                href="/resources/blog/create"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0f5132] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#0b4027] hover:shadow-md"
              >
                <span className="text-lg leading-none">
                  +
                </span>
                Create your first post
              </Link>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}