"use client";
import { useRouter } from "next/navigation";
import { BlogForm } from "@/components/blog/BlogForm";
import { ProtectedRoute } from "@/components/blog/ProtectedRoute";
import { createBlog } from "@/api/blogApi";
export default function Page() { const router = useRouter(); return <ProtectedRoute><main className="pt-24"><h1 className="text-center text-3xl font-bold">Write a blog post</h1><BlogForm onSubmit={async (data) => { const post = await createBlog(data); router.push(`/resources/blog/${post.slug}`); }} /></main></ProtectedRoute>; }
