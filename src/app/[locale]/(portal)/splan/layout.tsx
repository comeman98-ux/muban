import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "富利者 - 交易员训练计划",
  description: "富利者 - 专业交易员训练计划平台，提供系统化课程、实战训练和专业指导。",
};

export default function SplanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
