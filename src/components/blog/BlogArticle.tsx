"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BackToTop } from "@/components/landing/BackToTop";
import { CookieConsent } from "@/components/landing/CookieConsent";
import { FooterSection } from "@/components/landing/FooterSection";
import { Navbar } from "@/components/landing/Navbar";
import { NEXT_PUBLIC_BLOG_API_URL, NEXT_PUBLIC_BLOG_FALLBACK_API_URL } from "@/config/variables";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  body?: string;
  article?: string;
  category: string;
  author: string;
  imageUrl: string;
  createdAt: string;
};

const blogApiUrls = [...new Set([NEXT_PUBLIC_BLOG_API_URL, NEXT_PUBLIC_BLOG_FALLBACK_API_URL].filter(Boolean))];

function normalizePost(value: Partial<BlogPost> & { _id?: string }): BlogPost {
  return {
    id: value.id || value._id || crypto.randomUUID(),
    title: value.title || "Untitled post",
    excerpt: value.excerpt || "",
    content: value.content,
    body: value.body,
    article: value.article,
    category: value.category || "General",
    author: value.author || "Sellers Login",
    imageUrl: value.imageUrl || "",
    createdAt: value.createdAt || new Date().toISOString(),
  };
}

export function BlogArticle({ id }: { id: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState("Loading article...");

  useEffect(() => {
    const loadPost = async () => {
      for (const apiUrl of blogApiUrls) {
        try {
          const baseUrl = apiUrl.replace(/\/$/, "");
          const response = await fetch(`${baseUrl}/${encodeURIComponent(id)}`);
          if (!response.ok) throw new Error("Article API unavailable");
          const payload = await response.json();
          const article = payload?.data || payload;
          setPost(normalizePost(article));
          setStatus("");
          return;
        } catch {
          try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Blog API unavailable");
            const payload = await response.json();
            const list = Array.isArray(payload) ? payload : payload.data;
            if (!Array.isArray(list)) throw new Error("Unexpected blog API response");
            const found = list.map(normalizePost).find((item) => item.id === id);
            if (found) {
              setPost(found);
              setStatus("");
              return;
            }
          } catch {
            // Continue to the next API URL.
          }
        }
      }
      setStatus("Article not found.");
    };

    void loadPost();
  }, [id]);

  const articleText = useMemo(() => post?.content || post?.body || post?.article || post?.excerpt || "", [post]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-4xl">
          <Link href="/resources/blog" className="text-sm font-bold text-purple-700 hover:text-purple-900">
            Back to blog
          </Link>
          {post ? (
            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="h-64 bg-linear-to-br from-purple-100 via-white to-indigo-100 sm:h-96">
                {post.imageUrl && <img src={post.imageUrl} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">{post.category}</span>
                  <time className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</time>
                </div>
                <h1 className="mt-5 text-3xl font-bold leading-tight text-gray-950 sm:text-5xl">{post.title}</h1>
                <p className="mt-4 text-sm font-medium text-gray-700">By {post.author}</p>
                <div className="mt-8 space-y-5 text-base leading-8 text-gray-700 sm:text-lg">
                  {articleText.split(/\n{2,}/).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-600" aria-live="polite">
              {status}
            </div>
          )}
        </article>
      </main>
      <FooterSection />
      <BackToTop />
      <CookieConsent />
    </>
  );
}
