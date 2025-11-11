import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "博客 - 富利者 交易员训练计划",
  description: "富利者 专业交易员训练计划平台官方博客 - 分享交易知识、市场分析和学习资源。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
