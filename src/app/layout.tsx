import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Lexend } from "next/font/google";
import { ThemeProvider } from "@/components/themeProvider";

import Header from "./header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const dmsans = Lexend({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BoomChuck - Bluegrass Backup",
  description: "Interactive website to create bluegrass backing tracks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${dmsans.className} min-w-fit`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen flex-col">
            <Header></Header>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
