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
import Link from "next/link";
import { useEffect, useState } from "react";
import { blogAssetUrl, getBlog, type BlogPost } from "@/api/blogApi";
import { Navbar } from "@/components/landing/Navbar";
import { FooterSection } from "@/components/landing/FooterSection";
export function BlogArticle({ id }: { id: string }) { const [post, setPost] = useState<BlogPost | null>(null); const [error, setError] = useState(""); useEffect(() => { getBlog(id).then(setPost).catch(() => setError("Article not found.")); }, [id]); return <><Navbar /><main className="min-h-screen bg-[#f7f4ec] px-5 pb-16 pt-28"><article className="mx-auto max-w-3xl">{error && <p className="text-red-700">{error}</p>}{!post && !error && <p>Loading article...</p>}{post && <><Link href="/resources/blog" className="text-[#0f5132]">← All articles</Link><p className="mt-8 text-sm text-slate-500">{new Date(post.createdAt).toLocaleDateString()} - {post.author.name}</p><h1 className="mt-3 text-4xl font-bold sm:text-5xl">{post.title}</h1>{post.image && <img src={blogAssetUrl(post.image)} alt="" className="my-8 max-h-96 w-full rounded-xl object-cover" />}<p className="whitespace-pre-wrap text-lg leading-8 text-slate-800">{post.content}</p></>}</article></main><FooterSection /></>; }
