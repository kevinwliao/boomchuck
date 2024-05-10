import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Bricolage_Grotesque } from "next/font/google";

import Header from "./header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const dmsans = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boomchuck - Bluegrass Backup",
  description: "Interactive website to create bluegrass backing tracks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmsans.className}>
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
