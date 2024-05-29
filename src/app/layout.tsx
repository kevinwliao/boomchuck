import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Bricolage_Grotesque } from "next/font/google";
import { ThemeProvider } from "@/components/themeProvider";

import Header from "./header";
import Footer from "./footer";
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
    <html suppressHydrationWarning lang="en">
      <body className={`${dmsans.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-svh flex-col">
            <Header></Header>
            {children}
            <Footer></Footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
