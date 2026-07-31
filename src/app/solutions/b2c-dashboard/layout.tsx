import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "B2C Business Dashboard Software for Sales & Customer Management",
  description:
    "Make informed business decisions with real-time insights into customers, sales, and performance. SellersLogin gives you everything you need in one smart dashboard.",
  path: "/solutions/b2c-dashboard",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
