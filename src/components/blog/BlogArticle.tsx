"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { blogAssetUrl, getBlog, type BlogPost } from "@/api/blogApi";
import { BlogContent } from "@/components/blog/BlogContent";
import { Navbar } from "@/components/landing/Navbar";
import { FooterSection } from "@/components/landing/FooterSection";

export function BlogArticle({ id }: { id: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState("");
  const readingMinutes = useMemo(
    () => Math.max(1, Math.ceil((post?.content || "").split(/\s+/).filter(Boolean).length / 180)),
    [post?.content],
  );

  useEffect(() => {
    getBlog(id)
      .then(setPost)
      .catch(() => setError("Article not found."));
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f7f4ec] px-5 pb-16 pt-28">
        <article className="mx-auto max-w-3xl">
          {error && <p className="text-red-700">{error}</p>}
          {!post && !error && <p>Loading article...</p>}
          {post && (
            <>
              <Link href="/resources/blog" className="text-[#0f5132]">
                Back to all articles
              </Link>
              <p className="mt-8 text-sm text-slate-500">
                {new Date(post.createdAt).toLocaleDateString()} - {post.author.name} -{" "}
                {readingMinutes} min read
              </p>
              <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{post.title}</h1>
              {post.excerpt && <p className="mt-5 text-xl text-slate-600">{post.excerpt}</p>}
              {post.image && (
                <img
                  src={blogAssetUrl(post.image)}
                  alt={post.title}
                  className="my-8 max-h-96 w-full rounded-xl object-cover"
                />
              )}
              <BlogContent content={post.content} />
            </>
          )}
        </article>
      </main>
      <FooterSection />
    </>
  );
}
