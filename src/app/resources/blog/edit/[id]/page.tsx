"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMyBlogs, type BlogPost, updateBlog } from "@/api/blogApi";
import { BlogForm } from "@/components/blog/BlogForm";
import { ProtectedRoute } from "@/components/blog/ProtectedRoute";
export default function Page() { const params = useParams<{ id: string }>(); const router = useRouter(); const [post, setPost] = useState<BlogPost | null>(null); useEffect(() => { getMyBlogs().then((posts) => setPost(posts.find((item) => (item.id || item._id) === params.id) || null)); }, [params.id]); return <ProtectedRoute><main className="pt-24"><h1 className="text-center text-3xl font-bold">Edit post</h1>{post ? <BlogForm post={post} onSubmit={async (data) => { const updated = await updateBlog(params.id, data); router.push(`/resources/blog/${updated.slug}`); }} /> : <p className="p-8 text-center">Loading post...</p>}</main></ProtectedRoute>; }
