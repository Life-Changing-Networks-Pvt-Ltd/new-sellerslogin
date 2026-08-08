import type { Metadata } from "next";
import { BlogManager } from "@/components/blog/BlogManager";

export const metadata: Metadata = {
  title: "Blog | Sellers Login",
  description: "Commerce playbooks, automation ideas, and growth guidance from Sellers Login.",
};

export default function Page() {
  return <BlogManager />;
}
