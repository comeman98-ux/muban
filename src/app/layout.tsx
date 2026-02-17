import "./globals.css";

export const metadata = {
  title: "天穹量化｜交易员训练计划",
  description: "免费筛选制交易员训练计划落地页",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className="dark">
      <body className="min-h-screen bg-[#050B1A] text-white">
        {children}
      </body>
    </html>
  );
}
