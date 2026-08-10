// "use client";

// import Link from "next/link";
// import { useEffect, useMemo, useState } from "react";
// import { BackToTop } from "@/components/landing/BackToTop";
// import { CookieConsent } from "@/components/landing/CookieConsent";
// import { FooterSection } from "@/components/landing/FooterSection";
// import { Navbar } from "@/components/landing/Navbar";
// import { NEXT_PUBLIC_BLOG_API_URL, NEXT_PUBLIC_BLOG_FALLBACK_API_URL } from "@/config/variables";

// type BlogPost = {
//   id: string;
//   title: string;
//   excerpt: string;
//   content?: string;
//   body?: string;
//   article?: string;
//   category: string;
//   author: string;
//   imageUrl: string;
//   createdAt: string;
// };

// const blogApiUrls = [...new Set([NEXT_PUBLIC_BLOG_API_URL, NEXT_PUBLIC_BLOG_FALLBACK_API_URL].filter(Boolean))];
// const fontDisplay = "font-['Fraunces',_serif]";
// const fontBody = "font-['Source_Serif_4',_serif]";
// const fontMono = "font-['JetBrains_Mono',_monospace]";

// function normalizePost(value: Partial<BlogPost> & { _id?: string }): BlogPost {
//   return {
//     id: value.id || value._id || crypto.randomUUID(),
//     title: value.title || "Untitled post",
//     excerpt: value.excerpt || "",
//     content: value.content,
//     body: value.body,
//     article: value.article,
//     category: value.category || "General",
//     author: value.author || "Sellers Login",
//     imageUrl: value.imageUrl || "",
//     createdAt: value.createdAt || new Date().toISOString(),
//   };
// }

// export function BlogArticle({ id }: { id: string }) {
//   const [post, setPost] = useState<BlogPost | null>(null);
//   const [status, setStatus] = useState("Loading article...");

//   useEffect(() => {
//     const loadPost = async () => {
//       for (const apiUrl of blogApiUrls) {
//         try {
//           const baseUrl = apiUrl.replace(/\/$/, "");
//           const response = await fetch(`${baseUrl}/${encodeURIComponent(id)}`);
//           if (!response.ok) throw new Error("Article API unavailable");
//           const payload = await response.json();
//           const article = payload?.data || payload;
//           setPost(normalizePost(article));
//           setStatus("");
//           return;
//         } catch {
//           try {
//             const response = await fetch(apiUrl);
//             if (!response.ok) throw new Error("Blog API unavailable");
//             const payload = await response.json();
//             const list = Array.isArray(payload) ? payload : payload.data;
//             if (!Array.isArray(list)) throw new Error("Unexpected blog API response");
//             const found = list.map(normalizePost).find((item) => item.id === id);
//             if (found) {
//               setPost(found);
//               setStatus("");
//               return;
//             }
//           } catch {
//             // Continue to the next API URL.
//           }
//         }
//       }
//       setStatus("Article not found.");
//     };

//     void loadPost();
//   }, [id]);

//   const articleText = useMemo(() => post?.content || post?.body || post?.article || post?.excerpt || "", [post]);
//   const paragraphs = useMemo(() => articleText.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean), [articleText]);
//   const readingMinutes = Math.max(1, Math.ceil(articleText.split(/\s+/).filter(Boolean).length / 180));

//   return (
//     <>
//       <Navbar />
//       <main className="relative min-h-screen overflow-hidden bg-[#EFE7D8] text-[#22282B]">
//         <div
//           className="pointer-events-none fixed inset-0 z-10 opacity-[0.28] mix-blend-multiply"
//           style={{
//             backgroundImage:
//               "repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.015) 3px), repeating-linear-gradient(90deg, rgba(0,0,0,0.01) 0px, transparent 1px, transparent 3px, rgba(0,0,0,0.01) 4px)",
//           }}
//         />
//         <article className="relative mx-auto max-w-[1180px] px-4 pb-20 pt-32 sm:px-6 lg:px-8">
//           <Link href="/resources/blog" className={`${fontMono} inline-block border-b border-dashed border-[#4A5256] pb-1 text-xs uppercase tracking-[0.12em] text-[#4A5256] transition hover:border-[#A93F2E] hover:text-[#A93F2E]`}>
//             Back to archive
//           </Link>
//           {post ? (
//             <>
//               <header className="grid gap-10 border-b border-[#C9BEA4] pb-14 pt-10 lg:grid-cols-[1fr_240px]">
//                 <div>
//                   <div className={`${fontMono} flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-[#3F5A46]`}>
//                     <span>{post.category}</span>
//                     <span className="h-px w-8 bg-[#C9BEA4]" />
//                     <time>{new Date(post.createdAt).toLocaleDateString()}</time>
//                   </div>
//                   <h1 className={`${fontDisplay} mt-6 max-w-[14ch] text-5xl font-light leading-[1.04] tracking-tight text-[#22282B] sm:text-7xl`}>
//                     {post.title}
//                   </h1>
//                   {post.excerpt && (
//                     <p className={`${fontBody} mt-8 max-w-[48ch] text-xl leading-9 text-[#4A5256]`}>
//                       {post.excerpt}
//                     </p>
//                   )}
//                 </div>

//                 <aside className="space-y-7 pt-2">
//                   <div className={`${fontMono} relative pl-5 text-xs leading-6 text-[#A93F2E]`}>
//                     <span className="absolute left-0 top-1 h-3 w-3 rotate-[-25deg] border-b-2 border-l-2 border-[#A93F2E]" />
//                     NB: <b className="font-medium text-[#22282B]">article description</b>
//                   </div>
//                   <div className={`${fontMono} relative pl-5 text-xs leading-6 text-[#A93F2E]`}>
//                     <span className="absolute left-0 top-1 h-3 w-3 rotate-[-25deg] border-b-2 border-l-2 border-[#A93F2E]" />
//                     by <b className="font-medium text-[#22282B]">{post.author}</b>
//                   </div>
//                   <div className={`${fontMono} relative pl-5 text-xs leading-6 text-[#A93F2E]`}>
//                     <span className="absolute left-0 top-1 h-3 w-3 rotate-[-25deg] border-b-2 border-l-2 border-[#A93F2E]" />
//                     approx. <b className="font-medium text-[#22282B]">{readingMinutes} min read</b>
//                   </div>
//                 </aside>
//               </header>

//               {post.imageUrl && (
//                 <div className="my-12 overflow-hidden border-y border-[#C9BEA4] bg-[#E4DAC5] py-5">
//                   <img src={post.imageUrl} alt="" className="max-h-[520px] w-full object-cover" />
//                 </div>
//               )}

//               <div className="grid gap-10 pt-4 lg:grid-cols-[minmax(0,720px)_1fr]">
//                 <div className={`${fontBody} space-y-7 text-xl leading-10 text-[#22282B]`}>
//                   {paragraphs.map((paragraph, index) => (
//                     <p key={index} className={index === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-['Fraunces',_serif] first-letter:text-7xl first-letter:leading-[0.85] first-letter:text-[#3F5A46]" : ""}>
//                       {paragraph}
//                     </p>
//                   ))}
//                   {paragraphs.length === 0 && <p>No article description is available yet.</p>}
//                 </div>

//                 <aside className="hidden lg:block">
//                   <div className="sticky top-28 border-l border-[#C9BEA4] pl-6">
//                     <p className={`${fontMono} text-xs uppercase tracking-[0.18em] text-[#3F5A46]`}>Margin note</p>
//                     <blockquote className={`${fontDisplay} mt-4 text-2xl font-light italic leading-snug text-[#4A5256]`}>
//                       A useful commerce note should change what you do before lunch.
//                     </blockquote>
//                     <div className={`${fontMono} mt-6 border-t border-dashed border-[#C9BEA4] pt-4 text-xs text-[#4A5256]`}>
//                       Published in Sellers Login Journal
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-16 border-y border-[#C9BEA4] py-8">
//                 <Link href="/resources/blog" className={`${fontMono} text-sm text-[#4A5256] transition hover:text-[#A93F2E]`}>
//                   Return to all notes -&gt;
//                 </Link>
//               </div>
//             </>
//           ) : (
//             <div className={`${fontBody} mt-10 border border-dashed border-[#C9BEA4] bg-[#F7F3E8] p-12 text-center text-lg text-[#4A5256]`} aria-live="polite">
//               {status}
//             </div>
//           )}
//         </article>
//       </main>
//       <FooterSection />
//       <BackToTop />
//       <CookieConsent />
//     </>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { BackToTop } from "@/components/landing/BackToTop";
import { CookieConsent } from "@/components/landing/CookieConsent";
import { FooterSection } from "@/components/landing/FooterSection";
import { Navbar } from "@/components/landing/Navbar";
import {
  NEXT_PUBLIC_BLOG_API_URL,
  NEXT_PUBLIC_BLOG_FALLBACK_API_URL,
} from "@/config/variables";

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

type RawBlogPost = Partial<BlogPost> & {
  _id?: string;
};

const blogApiUrls = [
  NEXT_PUBLIC_BLOG_API_URL,
  NEXT_PUBLIC_BLOG_FALLBACK_API_URL,
].filter(
  (url, index, urls): url is string =>
    Boolean(url) && urls.indexOf(url) === index,
);

const fontDisplay = "font-['Fraunces',_serif]";
const fontBody = "font-['Source_Serif_4',_serif]";
const fontMono = "font-['JetBrains_Mono',_monospace]";

function normalizePost(value: RawBlogPost): BlogPost {
  return {
    id: String(value.id || value._id || ""),
    title: value.title?.trim() || "Untitled post",
    excerpt: value.excerpt?.trim() || "",
    content: value.content,
    body: value.body,
    article: value.article,
    category: value.category?.trim() || "General",
    author: value.author?.trim() || "Sellers Login",
    imageUrl: value.imageUrl?.trim() || "",
    createdAt: value.createdAt || "",
  };
}

function getArticleText(post: BlogPost): string {
  return (
    post.content?.trim() ||
    post.body?.trim() ||
    post.article?.trim() ||
    post.excerpt?.trim() ||
    ""
  );
}

function formatDate(value: string): string {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getPostsFromPayload(payload: unknown): RawBlogPost[] {
  if (Array.isArray(payload)) {
    return payload.filter(
      (item): item is RawBlogPost =>
        typeof item === "object" && item !== null,
    );
  }

  if (
    typeof payload === "object" &&
    payload !== null &&
    "data" in payload &&
    Array.isArray(payload.data)
  ) {
    return payload.data.filter(
      (item): item is RawBlogPost =>
        typeof item === "object" && item !== null,
    );
  }

  return [];
}

function getPostFromPayload(payload: unknown): RawBlogPost | null {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "data" in payload
  ) {
    const data = payload.data;

    if (
      data &&
      typeof data === "object" &&
      !Array.isArray(data)
    ) {
      return data as RawBlogPost;
    }

    return null;
  }

  if (
    payload &&
    typeof payload === "object" &&
    !Array.isArray(payload)
  ) {
    return payload as RawBlogPost;
  }

  return null;
}

export function BlogArticle({ id }: { id: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState("Loading article...");

  useEffect(() => {
    let cancelled = false;

    const loadPost = async () => {
      if (!id?.trim()) {
        setStatus("Article not found.");
        return;
      }

      setPost(null);
      setStatus("Loading article...");

      for (const apiUrl of blogApiUrls) {
        const baseUrl = apiUrl.replace(/\/+$/, "");

        // First try the direct article endpoint.
        try {
          const response = await fetch(
            `${baseUrl}/${encodeURIComponent(id)}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
              cache: "no-store",
            },
          );

          if (response.ok) {
            const payload: unknown = await response.json();
            const article = getPostFromPayload(payload);

            if (article) {
              const normalized = normalizePost(article);

              if (normalized.id === id || normalized.id) {
                if (!cancelled) {
                  setPost(normalized);
                  setStatus("");
                }

                return;
              }
            }
          }
        } catch {
          // Try the list endpoint below.
        }

        // Fall back to fetching the complete list.
        try {
          const response = await fetch(baseUrl, {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            cache: "no-store",
          });

          if (!response.ok) {
            continue;
          }

          const payload: unknown = await response.json();
          const list = getPostsFromPayload(payload);

          const found = list
            .map(normalizePost)
            .find((item) => item.id === id);

          if (found) {
            if (!cancelled) {
              setPost(found);
              setStatus("");
            }

            return;
          }
        } catch {
          // Continue to the next configured API.
        }
      }

      if (!cancelled) {
        setPost(null);
        setStatus("Article not found.");
      }
    };

    void loadPost();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const articleText = useMemo(
    () => (post ? getArticleText(post) : ""),
    [post],
  );

  const paragraphs = useMemo(
    () =>
      articleText
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
    [articleText],
  );

  const readingMinutes = useMemo(() => {
    const wordCount = articleText
      .split(/\s+/)
      .filter(Boolean).length;

    return Math.max(1, Math.ceil(wordCount / 180));
  }, [articleText]);

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#EFE7D8] text-[#22282B]">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-10 opacity-[0.28] mix-blend-multiply"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.015) 3px), repeating-linear-gradient(90deg, rgba(0,0,0,0.01) 0px, transparent 1px, transparent 3px, rgba(0,0,0,0.01) 4px)",
          }}
        />

        <article className="relative mx-auto max-w-[1180px] px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <Link
            href="/resources/blog"
            className={`${fontMono} inline-block border-b border-dashed border-[#4A5256] pb-1 text-xs uppercase tracking-[0.12em] text-[#4A5256] transition hover:border-[#A93F2E] hover:text-[#A93F2E]`}
          >
            Back to archive
          </Link>

          {post ? (
            <>
              <header className="grid gap-10 border-b border-[#C9BEA4] pb-14 pt-10 lg:grid-cols-[1fr_240px]">
                <div>
                  <div
                    className={`${fontMono} flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-[#3F5A46]`}
                  >
                    <span>{post.category}</span>
                    <span
                      aria-hidden="true"
                      className="h-px w-8 bg-[#C9BEA4]"
                    />
                    <time dateTime={post.createdAt || undefined}>
                      {formatDate(post.createdAt)}
                    </time>
                  </div>

                  <h1
                    className={`${fontDisplay} mt-6 max-w-[14ch] text-5xl font-light leading-[1.04] tracking-tight text-[#22282B] sm:text-7xl`}
                  >
                    {post.title}
                  </h1>

                  {post.excerpt && (
                    <p
                      className={`${fontBody} mt-8 max-w-[48ch] text-xl leading-9 text-[#4A5256]`}
                    >
                      {post.excerpt}
                    </p>
                  )}
                </div>

                <aside className="space-y-7 pt-2">
                  <div
                    className={`${fontMono} relative pl-5 text-xs leading-6 text-[#A93F2E]`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1 h-3 w-3 rotate-[-25deg] border-b-2 border-l-2 border-[#A93F2E]"
                    />
                    NB:{" "}
                    <b className="font-medium text-[#22282B]">
                      article description
                    </b>
                  </div>

                  <div
                    className={`${fontMono} relative pl-5 text-xs leading-6 text-[#A93F2E]`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1 h-3 w-3 rotate-[-25deg] border-b-2 border-l-2 border-[#A93F2E]"
                    />
                    by{" "}
                    <b className="font-medium text-[#22282B]">
                      {post.author}
                    </b>
                  </div>

                  <div
                    className={`${fontMono} relative pl-5 text-xs leading-6 text-[#A93F2E]`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1 h-3 w-3 rotate-[-25deg] border-b-2 border-l-2 border-[#A93F2E]"
                    />
                    approx.{" "}
                    <b className="font-medium text-[#22282B]">
                      {readingMinutes} min read
                    </b>
                  </div>
                </aside>
              </header>

              {post.imageUrl && (
                <div className="my-12 overflow-hidden border-y border-[#C9BEA4] bg-[#E4DAC5] py-5">
                  <div className="relative max-h-[520px] min-h-[240px] w-full">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      width={1200}
                      height={700}
                      sizes="(max-width: 1180px) 100vw, 1180px"
                      className="max-h-[520px] w-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="grid gap-10 pt-4 lg:grid-cols-[minmax(0,720px)_1fr]">
                <div
                  className={`${fontBody} space-y-7 text-xl leading-10 text-[#22282B]`}
                >
                  {paragraphs.map((paragraph, index) => (
                    <p
                      key={`${post.id}-${index}`}
                      className={
                        index === 0
                          ? "first-letter:float-left first-letter:mr-3 first-letter:font-['Fraunces',_serif] first-letter:text-7xl first-letter:leading-[0.85] first-letter:text-[#3F5A46]"
                          : undefined
                      }
                    >
                      {paragraph}
                    </p>
                  ))}

                  {paragraphs.length === 0 && (
                    <p>No article description is available yet.</p>
                  )}
                </div>

                <aside className="hidden lg:block">
                  <div className="sticky top-28 border-l border-[#C9BEA4] pl-6">
                    <p
                      className={`${fontMono} text-xs uppercase tracking-[0.18em] text-[#3F5A46]`}
                    >
                      Margin note
                    </p>

                    <blockquote
                      className={`${fontDisplay} mt-4 text-2xl font-light italic leading-snug text-[#4A5256]`}
                    >
                      A useful commerce note should change what you do before
                      lunch.
                    </blockquote>

                    <div
                      className={`${fontMono} mt-6 border-t border-dashed border-[#C9BEA4] pt-4 text-xs text-[#4A5256]`}
                    >
                      Published in Sellers Login Journal
                    </div>
                  </div>
                </aside>
              </div>

              <div className="mt-16 border-y border-[#C9BEA4] py-8">
                <Link
                  href="/resources/blog"
                  className={`${fontMono} text-sm text-[#4A5256] transition hover:text-[#A93F2E]`}
                >
                  Return to all notes -&gt;
                </Link>
              </div>
            </>
          ) : (
            <div
              className={`${fontBody} mt-10 border border-dashed border-[#C9BEA4] bg-[#F7F3E8] p-12 text-center text-lg text-[#4A5256]`}
              aria-live="polite"
            >
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

