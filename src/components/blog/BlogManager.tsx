"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { BackToTop } from "@/components/landing/BackToTop";
import { CookieConsent } from "@/components/landing/CookieConsent";
import { FooterSection } from "@/components/landing/FooterSection";
import { Navbar } from "@/components/landing/Navbar";
import { NEXT_PUBLIC_BLOG_API_URL, NEXT_PUBLIC_BLOG_FALLBACK_API_URL } from "@/config/variables";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  imageUrl: string;
  createdAt: string;
};

type BlogForm = Omit<BlogPost, "id" | "createdAt">;

const emptyForm: BlogForm = { title: "", excerpt: "", category: "Growth", author: "Sellers Login", imageUrl: "" };
const blogApiUrls = [...new Set([NEXT_PUBLIC_BLOG_API_URL, NEXT_PUBLIC_BLOG_FALLBACK_API_URL].filter(Boolean))];

const fontDisplay = "font-['Fraunces',_serif]";
const fontBody = "font-['Source_Serif_4',_serif]";
const fontMono = "font-['JetBrains_Mono',_monospace]";

// Rotating tint per category: a filing-tab color, not a status color.
const CATALOG_TINTS = ["#E8A33D", "#0F5132", "#35507A", "#B54834", "#6B3F69", "#1E6E6E"];
function categoryTint(category: string): string {
  let hash = 0;
  for (let i = 0; i < category.length; i++) hash = hash * 31 + category.charCodeAt(i);
  return CATALOG_TINTS[Math.abs(hash) % CATALOG_TINTS.length];
}

function statusDotColor(status: string): string {
  if (status.startsWith("Synced")) return "bg-[#0F5132]";
  if (status.includes("Connecting")) return "bg-[#E8A33D]";
  return "bg-[#B54834]";
}

function normalizePost(value: Partial<BlogPost> & { _id?: string }): BlogPost {
  return {
    id: value.id || value._id || crypto.randomUUID(),
    title: value.title || "Untitled post",
    excerpt: value.excerpt || "",
    category: value.category || "General",
    author: value.author || "Sellers Login",
    imageUrl: value.imageUrl || "",
    createdAt: value.createdAt || new Date().toISOString(),
  };
}

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<BlogForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [status, setStatus] = useState(
    blogApiUrls.length === 0 ? "Blog backend URL is not configured." : "Connecting to the blog backend...",
  );

  useEffect(() => {
    if (blogApiUrls.length === 0) return;

    const loadPosts = async () => {
      for (const apiUrl of blogApiUrls) {
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) throw new Error("Blog API unavailable");
          const payload = await response.json();
          const list = Array.isArray(payload) ? payload : payload.data;
          if (!Array.isArray(list)) throw new Error("Unexpected blog API response");
          const remotePosts = list.map(normalizePost);
          setPosts(remotePosts);
          setStatus(`Synced with ${new URL(apiUrl).host}.`);
          return;
        } catch {
          // Try the hosted fallback when the local API is unavailable.
        }
      }
      setStatus("Could not load posts from the blog backend.");
    };

    void loadPosts();
  }, []);

  // Slide the editor drawer in on mount, out on close.
  useEffect(() => {
    if (isEditorOpen) {
      const id = requestAnimationFrame(() => setDrawerVisible(true));
      return () => cancelAnimationFrame(id);
    }
  }, [isEditorOpen]);

  const sendToBackend = async (method: "POST" | "PATCH" | "DELETE", post?: BlogPost): Promise<BlogPost | boolean> => {
    for (const apiUrl of blogApiUrls) {
      const url = method === "POST" ? apiUrl : `${apiUrl.replace(/\/$/, "")}/${post?.id}`;
      try {
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: method === "DELETE" ? undefined : JSON.stringify({
            title: post?.title,
            excerpt: post?.excerpt,
            category: post?.category,
            author: post?.author,
            imageUrl: post?.imageUrl,
          }),
        });
        if (!response.ok) throw new Error("Request failed");
        setStatus(`Synced with ${new URL(apiUrl).host}.`);
        if (method === "DELETE") return true;
        return normalizePost(await response.json());
      } catch {
        // Continue to the next API URL.
      }
    }
    setStatus("Could not save changes to the blog backend.");
    return false;
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDrawerVisible(false);
    setIsEditorOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({ title: post.title, excerpt: post.excerpt, category: post.category, author: post.author, imageUrl: post.imageUrl });
    setDrawerVisible(false);
    setIsEditorOpen(true);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const now = new Date().toISOString();
    const existing = posts.find((post) => post.id === editingId);
    const post: BlogPost = { id: editingId || crypto.randomUUID(), createdAt: existing?.createdAt || now, ...form };
    const savedPost = await sendToBackend(editingId ? "PATCH" : "POST", post);
    if (savedPost && typeof savedPost !== "boolean") {
      const nextPosts = editingId ? posts.map((item) => (item.id === editingId ? savedPost : item)) : [savedPost, ...posts];
      setPosts(nextPosts);
      setIsEditorOpen(false);
    }
  };

  const removePost = async (post: BlogPost) => {
    if (!window.confirm(`Delete "${post.title}"?`)) return;
    if (await sendToBackend("DELETE", post)) setPosts(posts.filter((item) => item.id !== post.id));
  };

  const latestDate = posts[0]?.createdAt ? new Date(posts[0].createdAt).toLocaleDateString() : "Drafting now";

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden bg-[#EFE7D8] text-[#22282B]">
        <div
          className="pointer-events-none fixed inset-0 z-10 opacity-[0.28] mix-blend-multiply"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.015) 3px), repeating-linear-gradient(90deg, rgba(0,0,0,0.01) 0px, transparent 1px, transparent 3px, rgba(0,0,0,0.01) 4px)",
          }}
        />

        <section className="mx-auto max-w-[1180px] px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_230px] lg:items-start">
            <div>
              <span className={`${fontMono} text-xs font-medium uppercase tracking-[0.18em] text-[#3F5A46]`}>
                Vol. SL - commerce reading journal
              </span>
              <h1 className={`${fontDisplay} mt-5 max-w-[15ch] text-5xl font-light leading-[1.04] tracking-tight text-[#22282B] sm:text-7xl`}>
                Notes from the
                <span className="relative mx-2 inline-block text-[#3F5A46] italic">
                  margins
                  <svg className="absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M2 6 Q 20 2 40 6 T 80 6 T 120 6 T 160 6 T 198 6" stroke="#A93F2E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
                of modern selling.
              </h1>
              <p className={`${fontBody} mt-8 max-w-[46ch] text-lg leading-8 text-[#4A5256]`}>
                Practical essays on commerce, automation, customer journeys, and the operating notes worth underlining twice.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <a href="#essays" className={`${fontMono} bg-[#22282B] px-6 py-3.5 text-sm text-[#EFE7D8] transition hover:bg-[#3F5A46]`}>
                  Read the latest issue
                </a>
                <button onClick={openCreate} className={`${fontMono} border-b border-dashed border-[#4A5256] pb-1 text-sm text-[#4A5256] transition hover:border-[#A93F2E] hover:text-[#A93F2E]`}>
                  Create new note -&gt;
                </button>
              </div>
            </div>

            <aside className="flex flex-wrap gap-7 pt-2 lg:block">
              {[
                ["cf.", `${posts.length} published notes`],
                ["NB:", "built for operators"],
                ["see also", "full article archive"],
              ].map(([label, text], index) => (
                <div key={text} className={`${fontMono} relative mb-0 max-w-[210px] pl-5 text-xs leading-6 text-[#A93F2E] opacity-0 animate-[fadeUp_0.6s_ease_forwards] lg:mb-8`} style={{ animationDelay: `${0.4 + index * 0.18}s` }}>
                  <span className="absolute left-0 top-1 h-3 w-3 rotate-[-25deg] border-b-2 border-l-2 border-[#A93F2E]" />
                  <span>{label} </span><b className="font-medium text-[#22282B]">{text}</b>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <div className={`${fontMono} mx-auto hidden max-w-[1180px] flex-wrap justify-between gap-3 border-y border-[#C9BEA4] px-4 py-5 text-xs tracking-wide text-[#4A5256] sm:flex sm:px-6 lg:px-8`}>
          <span>SELLERSLOGIN JOURNAL</span>
          <span>{String(posts.length).padStart(3, "0")} ARTICLES</span>
          <span>UPDATED {latestDate.toUpperCase()}</span>
          <span className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${statusDotColor(status)} ${status.includes("Connecting") ? "animate-pulse" : ""}`} />{status}</span>
        </div>

        <section id="essays" className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-wrap items-baseline justify-between gap-5">
            <h2 className={`${fontDisplay} text-4xl font-light tracking-tight text-[#22282B]`}>From the current issue</h2>
            <span className={`${fontMono} text-xs font-medium uppercase tracking-[0.18em] text-[#3F5A46]`}>Issue No. {String(Math.max(posts.length, 1)).padStart(2, "0")}</span>
          </div>

          {posts.length > 0 && (
            <div className="grid border-t border-[#C9BEA4] md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post, index) => {
                const tint = categoryTint(post.category);
                return (
                  <article
                    key={post.id}
                    className={`group relative border-b border-[#C9BEA4] bg-transparent p-8 transition hover:bg-[#E4DAC5] xl:border-r ${
                      (index + 1) % 3 === 0 ? "xl:border-r-0" : ""
                    }`}
                  >
                    <Link
                      href={`/resources/blog/${encodeURIComponent(post.id)}`}
                      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A93F2E] focus-visible:ring-offset-4"
                    >
                      <span className={`${fontMono} mb-5 block text-xs text-[#3F5A46]`}>{["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"][index] || `${index + 1}.`}</span>
                      <h3 className={`${fontDisplay} text-2xl font-light leading-snug tracking-tight text-[#22282B]`}>{post.title}</h3>
                      <p className={`${fontBody} mt-4 line-clamp-4 text-base leading-7 text-[#4A5256]`}>{post.excerpt}</p>
                      <div className={`${fontMono} mt-6 flex justify-between gap-4 border-t border-dashed border-[#C9BEA4] pt-4 text-xs text-[#4A5256]`}>
                        <span style={{ color: tint }}>{post.category}</span>
                        <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                      </div>
                    </Link>

                    <div className="mt-5 flex gap-4">
                      <button
                        onClick={() => openEdit(post)}
                        className={`${fontMono} text-xs uppercase tracking-wide text-[#4A5256] transition hover:text-[#3F5A46]`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removePost(post)}
                        className={`${fontMono} text-xs uppercase tracking-wide text-[#A93F2E] transition hover:text-[#7C2D22]`}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {posts.length === 0 && (
            <div className="mt-8 rounded-2xl border border-dashed border-[#DDD8CC] bg-white p-12 text-center">
              <p className={`${fontMono} text-xs uppercase tracking-[0.3em] text-[#8A8477]`}>Ledger empty</p>
              <p className={`${fontBody} mx-auto mt-3 max-w-sm text-base text-[#4B5259]`}>
                No posts found. Add a blog backend URL or create your first post.
              </p>
              <button
                onClick={openCreate}
                className={`${fontDisplay} mt-6 rounded-full bg-[#1B1F23] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#0F5132]`}
              >
                Create the first entry
              </button>
            </div>
          )}
        </section>

        <section className="mx-auto grid max-w-[1180px] grid-cols-[44px_1fr] gap-5 px-4 pb-20 sm:px-6 lg:px-8">
          <div className={`${fontDisplay} text-7xl font-light leading-none text-[#3F5A46]/60`}>&quot;</div>
          <div>
            <blockquote className={`${fontDisplay} max-w-[26ch] text-3xl font-light italic leading-snug text-[#22282B] sm:text-4xl`}>
              A useful commerce note should change what you do before lunch.
            </blockquote>
            <div className={`${fontMono} mt-5 text-xs text-[#4A5256]`}>- from the Sellers Login operating desk</div>
          </div>
        </section>

        <section className="bg-[#22282B] px-4 py-16 text-[#EFE7D8] sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <h2 className={`${fontDisplay} max-w-[17ch] text-4xl font-light leading-tight tracking-tight sm:text-5xl`}>
                Publish the next field note for your readers.
              </h2>
              <p className={`${fontBody} mt-5 max-w-[44ch] text-base leading-7 text-[#C9C2AF]`}>
                Keep the archive moving with practical ideas, launch notes, and playbooks your sellers can return to.
              </p>
            </div>
            <div>
              <button onClick={openCreate} className={`${fontMono} w-full border-b border-[#EFE7D8] pb-4 text-left text-sm tracking-wide transition hover:text-[#E8A33D]`}>
                Start a new article -&gt;
              </button>
              <p className={`${fontMono} mt-4 text-xs text-[#8A8470]`}>Draft, preview image, category, author, then publish.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Editor: slide-over ledger sheet */}
      {isEditorOpen && (
        <div
          className="fixed inset-0 z-[60] flex justify-end bg-[#1B1F23]/50 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label="Blog post editor"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsEditorOpen(false);
          }}
        >
          <form
            onSubmit={submit}
            className={`flex h-full w-full max-w-md flex-col overflow-y-auto bg-[#F7F5F0] shadow-2xl transition-transform duration-300 ease-out sm:max-w-lg ${
              drawerVisible ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#DDD8CC] bg-white px-6 py-5">
              <div>
                <p className={`${fontMono} text-[10px] uppercase tracking-[0.3em] text-[#8A8477]`}>
                  {editingId ? "Edit entry" : "New entry"}
                </p>
                <h2 className={`${fontDisplay} mt-1 text-2xl font-bold text-[#1B1F23]`}>
                  {editingId ? "Edit post" : "New post"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="rounded-full p-2 text-[#8A8477] transition hover:bg-[#F1EEE6] hover:text-[#1B1F23]"
                aria-label="Close editor"
              >
                x
              </button>
            </div>

            <div className="flex-1 space-y-6 px-6 py-6">
              <label className="block">
                <span className={`${fontMono} text-[11px] font-semibold uppercase tracking-wider text-[#8A8477]`}>Title</span>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={`${fontBody} mt-2 w-full border-b-2 border-[#DDD8CC] bg-transparent px-1 py-2 text-[#1B1F23] outline-none transition-colors focus:border-[#0F5132]`}
                />
              </label>

              <label className="block">
                <span className={`${fontMono} text-[11px] font-semibold uppercase tracking-wider text-[#8A8477]`}>Excerpt</span>
                <textarea
                  required
                  rows={4}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className={`${fontBody} mt-2 w-full resize-none border-b-2 border-[#DDD8CC] bg-transparent px-1 py-2 text-[#1B1F23] outline-none transition-colors focus:border-[#0F5132]`}
                />
              </label>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className={`${fontMono} text-[11px] font-semibold uppercase tracking-wider text-[#8A8477]`}>Category</span>
                  <input
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className={`${fontBody} mt-2 w-full border-b-2 border-[#DDD8CC] bg-transparent px-1 py-2 text-[#1B1F23] outline-none transition-colors focus:border-[#0F5132]`}
                  />
                </label>
                <label className="block">
                  <span className={`${fontMono} text-[11px] font-semibold uppercase tracking-wider text-[#8A8477]`}>Author</span>
                  <input
                    required
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className={`${fontBody} mt-2 w-full border-b-2 border-[#DDD8CC] bg-transparent px-1 py-2 text-[#1B1F23] outline-none transition-colors focus:border-[#0F5132]`}
                  />
                </label>
              </div>

              <label className="block">
                <span className={`${fontMono} text-[11px] font-semibold uppercase tracking-wider text-[#8A8477]`}>
                  Image URL <span className="font-normal normal-case text-[#B7B2A3]">(optional)</span>
                </span>
                <input
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className={`${fontBody} mt-2 w-full border-b-2 border-[#DDD8CC] bg-transparent px-1 py-2 text-[#1B1F23] outline-none transition-colors focus:border-[#0F5132]`}
                />
              </label>

              {form.imageUrl && (
                <div className="overflow-hidden rounded-xl border border-[#DDD8CC]">
                  <img src={form.imageUrl} alt="" className="h-32 w-full object-cover" />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t border-[#DDD8CC] bg-white px-6 py-5">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className={`${fontDisplay} rounded-full px-5 py-2.5 text-sm font-bold text-[#4B5259] transition hover:bg-[#F1EEE6]`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${fontDisplay} rounded-full bg-[#0F5132] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#0C4029]`}
              >
                {editingId ? "Save changes" : "Publish post"}
              </button>
            </div>
          </form>
        </div>
      )}

      <FooterSection />
      <BackToTop />
      <CookieConsent />
    </>
  );
}
