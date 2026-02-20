import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Child Life Memory",
  description: "お子さんの成長記録・アルバム・AI提案",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
