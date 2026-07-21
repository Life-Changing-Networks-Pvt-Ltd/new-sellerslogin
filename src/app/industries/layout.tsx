import { NeedHelpButton } from "@/components/landing/NeedHelpButton";

export default function IndustriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <NeedHelpButton />
    </>
  );
}
