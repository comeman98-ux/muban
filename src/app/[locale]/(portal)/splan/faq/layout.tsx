import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "常见问题 - 交易员训练计划FAQ",
  description: "富利者 交易员训练计划常见问题解答：培训是否免费、基础条件要求、考核标准、收入分配、交易铁律、时间安排等。全面了解交易员训练计划的各个方面，解答您的疑问。",
  keywords: ["外汇交易FAQ", "培训问题", "考核要求", "收入分配", "交易纪律", "培训条件", "外汇交易员问答"],
  openGraph: {
    title: "常见问题 - 交易员训练计划FAQ",
    description: "全面解答交易员训练计划的各类问题：培训免费、考核标准、收入分配、交易纪律等。",
    url: "https://fulizhe.com/splan/faq",
    type: "website",
  },
  alternates: {
    canonical: "https://fulizhe.com/splan/faq",
  },
};

export default function FAQLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
