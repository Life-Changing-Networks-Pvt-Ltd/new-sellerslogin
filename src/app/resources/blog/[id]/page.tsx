import type { Metadata } from "next";
import { BlogArticle } from "@/components/blog/BlogArticle";

export const metadata: Metadata = {
  title: "Blog Article | Sellers Login",
  description: "Read the full Sellers Login blog article.",
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BlogArticle id={decodeURIComponent(id)} />;
}
