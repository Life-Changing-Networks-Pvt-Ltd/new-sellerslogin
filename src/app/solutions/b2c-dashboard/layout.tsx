import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "B2C Business Dashboard | Customer Management | Sales Analytics Dashboard",
  description:
    "SellersLogin provides a B2C Business Dashboard with customer management, sales analytics, inventory tracking, payment management, and business reporting to help online businesses grow efficiently.",
  path: "/solutions/b2c-dashboard",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
