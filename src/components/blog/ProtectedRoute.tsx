"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBlogAuth } from "@/context/AuthContext";
export function ProtectedRoute({ children }: { children: React.ReactNode }) { const { user, loading } = useBlogAuth(); const router = useRouter(); useEffect(() => { if (!loading && !user) router.replace("/resources/blog/login"); }, [loading, user, router]); if (loading || !user) return <p className="p-12 text-center">Checking your account…</p>; return <>{children}</>; }
