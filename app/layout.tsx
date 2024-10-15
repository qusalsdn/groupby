import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "스터디 그룹을 쉽게!",
  description: "스터디 그룹을 쉽게!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="p-5">
        <main>{children}</main>
      </body>
    </html>
  );
}
