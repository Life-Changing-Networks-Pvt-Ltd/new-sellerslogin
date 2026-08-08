"use client";

import { FormEvent, useEffect, useState } from "react";
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
  const [status, setStatus] = useState("Connecting to the blog backend…");

  useEffect(() => {
    if (blogApiUrls.length === 0) {
      setStatus("Blog backend URL is not configured.");
      return;
    }

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
    setIsEditorOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({ title: post.title, excerpt: post.excerpt, category: post.category, author: post.author, imageUrl: post.imageUrl });
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
    if (!window.confirm(`Delete “${post.title}”?`)) return;
    if (await sendToBackend("DELETE", post)) setPosts(posts.filter((item) => item.id !== post.id));
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-gray-950 px-6 py-12 text-white shadow-xl sm:px-10 sm:py-16">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-200">Sellers Login blog</p>
            <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl"><h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Ideas that help your business grow.</h1><p className="mt-4 text-lg leading-relaxed text-gray-300">Create, update, and manage your team’s commerce stories in one simple space.</p></div>
              <button onClick={openCreate} className="shrink-0 rounded-full bg-purple-200 px-6 py-3 text-sm font-bold text-gray-950 transition hover:bg-purple-300">+ New post</button>
            </div>
          </div>
          <p className="mt-5 text-sm text-gray-500" aria-live="polite">{status}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => <article key={post.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="h-44 bg-linear-to-br from-purple-100 via-white to-indigo-100">{post.imageUrl && <img src={post.imageUrl} alt="" className="h-full w-full object-cover" />}</div>
              <div className="p-6"><div className="flex items-center justify-between gap-3"><span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">{post.category}</span><time className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</time></div><h2 className="mt-4 text-xl font-bold leading-snug text-gray-950">{post.title}</h2><p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">{post.excerpt}</p><p className="mt-5 text-sm font-medium text-gray-700">By {post.author}</p><div className="mt-5 flex gap-3 border-t border-gray-100 pt-4"><button onClick={() => openEdit(post)} className="text-sm font-bold text-purple-700 hover:text-purple-900">Edit</button><button onClick={() => removePost(post)} className="text-sm font-bold text-red-600 hover:text-red-800">Delete</button></div></div>
            </article>)}
          </div>
          {posts.length === 0 && <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-600">No posts found. Add a blog backend URL or create your first post.</div>}
        </section>
      </main>
      {isEditorOpen && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-950/60 p-4" role="dialog" aria-modal="true" aria-label="Blog post editor"><form onSubmit={submit} className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-gray-950">{editingId ? "Edit post" : "New post"}</h2><button type="button" onClick={() => setIsEditorOpen(false)} className="text-gray-500 hover:text-gray-950" aria-label="Close editor">✕</button></div><div className="mt-6 grid gap-4"><label className="text-sm font-semibold text-gray-700">Title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-950" /></label><label className="text-sm font-semibold text-gray-700">Excerpt<textarea required rows={4} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-950" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-gray-700">Category<input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-950" /></label><label className="text-sm font-semibold text-gray-700">Author<input required value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-950" /></label></div><label className="text-sm font-semibold text-gray-700">Image URL <span className="font-normal text-gray-400">(optional)</span><input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-950" /></label></div><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setIsEditorOpen(false)} className="rounded-full px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-100">Cancel</button><button type="submit" className="rounded-full bg-purple-200 px-5 py-2.5 text-sm font-bold text-gray-950 hover:bg-purple-300">{editingId ? "Save changes" : "Publish post"}</button></div></form></div>}
      <FooterSection /><BackToTop /><CookieConsent />
    </>
  );
}
