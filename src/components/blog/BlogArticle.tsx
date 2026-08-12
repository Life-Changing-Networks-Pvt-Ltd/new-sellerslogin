// "use client";

// import Link from "next/link";
// import { useEffect, useMemo, useState } from "react";
// import { blogAssetUrl, getBlog, type BlogPost } from "@/api/blogApi";
// import { BlogContent } from "@/components/blog/BlogContent";
// import { Navbar } from "@/components/landing/Navbar";
// import { FooterSection } from "@/components/landing/FooterSection";

// export function BlogArticle({ id }: { id: string }) {
//   const [post, setPost] = useState<BlogPost | null>(null);
//   const [error, setError] = useState("");
//   const readingMinutes = useMemo(
//     () => Math.max(1, Math.ceil((post?.content || "").split(/\s+/).filter(Boolean).length / 180)),
//     [post?.content],
//   );

//   useEffect(() => {
//     getBlog(id)
//       .then(setPost)
//       .catch(() => setError("Article not found."));
//   }, [id]);

//   return (
//     <>
//       <Navbar />
//       <main className="min-h-screen bg-[#f7f4ec] px-5 pb-16 pt-28">
//         <article className="mx-auto max-w-3xl">
//           {error && <p className="text-red-700">{error}</p>}
//           {!post && !error && <p>Loading article...</p>}
//           {post && (
//             <>
//               <Link href="/resources/blog" className="text-[#0f5132]">
//                 Back to all articles
//               </Link>
//               <p className="mt-8 text-sm text-slate-500">
//                 {new Date(post.createdAt).toLocaleDateString()} - {post.author.name} -{" "}
//                 {readingMinutes} min read
//               </p>
//               <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{post.title}</h1>
//               {post.excerpt && <p className="mt-5 text-xl text-slate-600">{post.excerpt}</p>}
//               {post.image && (
//                 <img
//                   src={blogAssetUrl(post.image)}
//                   alt={post.title}
//                   className="my-8 max-h-96 w-full rounded-xl object-cover"
//                 />
//               )}
//               <BlogContent content={post.content} />
//             </>
//           )}
//         </article>
//       </main>
//       <FooterSection />
//     </>
//   );
// }


"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  blogAssetUrl,
  getBlog,
  type BlogPost,
} from "@/api/blogApi";

import { BlogContent } from "@/components/blog/BlogContent";
import { Navbar } from "@/components/landing/Navbar";
import { FooterSection } from "@/components/landing/FooterSection";

export function BlogArticle({
  id,
}: {
  id: string;
}) {
  const [post, setPost] =
    useState<BlogPost | null>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const readingMinutes = useMemo(() => {
    if (!post?.content) return 1;

    const text = post.content
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return Math.max(
      1,
      Math.ceil(
        text.split(/\s+/).filter(Boolean)
          .length / 180,
      ),
    );
  }, [post?.content]);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError("");

    getBlog(id)
      .then((data) => {
        if (!active) return;
        setPost(data);
      })
      .catch((err) => {
        console.error(
          "Failed to load article:",
          err,
        );

        if (!active) return;

        setPost(null);
        setError("Article not found.");
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  const handleShare = async () => {
    try {
      const url = window.location.href;

      if (
        navigator.share &&
        post
      ) {
        await navigator.share({
          title: post.title,
          text:
            post.excerpt ||
            `Read ${post.title}`,
          url,
        });

        return;
      }

      await navigator.clipboard.writeText(url);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      // User cancelled native share dialog.
      console.debug(
        "Share cancelled:",
        err,
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f7f4ec] px-4 pb-20 pt-28 sm:px-6 lg:px-8" style={{backgroundColor: "#e9d5ff"}}>
        {/* Error */}
        {error && (
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                !
              </div>

              <h1 className="mt-4 text-2xl font-bold text-slate-900">
                Article unavailable
              </h1>

              <p className="mt-2 text-slate-600">
                We couldn't find the article you're
                looking for.
              </p>

              <Link
                href="/resources/blog"
                className="mt-6 inline-flex rounded-xl bg-[#0f5132] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4027]"
              >
                Back to articles
              </Link>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && !error && (
          <article className="mx-auto max-w-4xl animate-pulse">
            <div className="h-5 w-40 rounded bg-slate-200" />

            <div className="mx-auto mt-10 max-w-3xl">
              <div className="h-4 w-56 rounded bg-slate-200" />

              <div className="mt-5 h-14 w-full rounded bg-slate-200" />

              <div className="mt-3 h-14 w-4/5 rounded bg-slate-200" />

              <div className="mt-6 h-6 w-full rounded bg-slate-200" />

              <div className="mt-2 h-6 w-3/4 rounded bg-slate-200" />

              <div className="mt-10 h-80 w-full rounded-2xl bg-slate-200" />
            </div>
          </article>
        )}

        {/* Article */}
        {post && !error && (
          <article className="mx-auto max-w-5xl">
            {/* Top navigation */}
            <div className="mb-10 flex items-center justify-between">
              <Link
                href="/resources/blog"
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:-translate-x-0.5 hover:border-[#0f5132] hover:text-[#0f5132]"
              >
                <span className="transition-transform group-hover:-translate-x-1">
                  ←
                </span>

                Back to articles
              </Link>

              <button
                type="button"
                onClick={() =>
                  void handleShare()
                }
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:border-[#0f5132] hover:text-[#0f5132]"
              >
                <span aria-hidden="true">
                  ↗
                </span>

                {copied
                  ? "Link copied!"
                  : "Share"}
              </button>
            </div>

            {/* Article header */}
            <header className="mx-auto max-w-4xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0f5132]">
                Sellers Login journal
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                  {post.excerpt}
                </p>
              )}

              {/* Metadata */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-slate-500">
                <span>
                  {new Date(
                    post.createdAt,
                  ).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </span>

                <span
                  className="hidden h-1 w-1 rounded-full bg-slate-400 sm:block"
                  aria-hidden="true"
                />

                {post.author?.name && (
                  <>
                    <span className="font-medium text-slate-700">
                      By {post.author.name}
                    </span>

                    <span
                      className="hidden h-1 w-1 rounded-full bg-slate-400 sm:block"
                      aria-hidden="true"
                    />
                  </>
                )}

                <span>
                  {readingMinutes} min read
                </span>
              </div>
            </header>

            {/* Featured image */}
            {post.image && (
              <div className="mx-auto mt-12 max-w-5xl">
                <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-2 shadow-xl shadow-slate-900/5">
                  <img
                    src={blogAssetUrl(
                      post.image,
                    )}
                    alt={post.title}
                    className="max-h-[560px] w-full rounded-xl object-cover"
                  />
                </div>
              </div>
            )}

            {/* Article body */}
            <div className="mx-auto mt-12 max-w-3xl">
              <div className="rounded-2xl bg-white px-5 py-8 shadow-sm sm:px-10 sm:py-12 lg:px-14">
                <div className="blog-article-content">
                  <BlogContent
                    content={post.content}
                  />
                </div>
              </div>
            </div>

            {/* Bottom article section */}
            <div className="mx-auto mt-10 max-w-3xl">
              <div className="border-t border-slate-300/70 pt-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Enjoyed this article?
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Share it with someone who
                      might find it useful.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      void handleShare()
                    }
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0f5132] px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#0b4027] hover:shadow-md"
                  >
                    {copied
                      ? "Link copied!"
                      : "Share article ↗"}
                  </button>
                </div>
              </div>

              {/* Back link */}
              <div className="mt-10 text-center">
                <Link
                  href="/resources/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f5132] hover:underline"
                >
                  ← Explore more articles
                </Link>
              </div>
            </div>
          </article>
        )}
      </main>

      <FooterSection />
    </>
  );
}