import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Lexend } from "next/font/google";
import { Lora } from "next/font/google";
import { ThemeProvider } from "@/components/themeProvider";
import UserAvatar from "@/components/ui/avatar";
import Header from "./header";
import "./globals.css";
import { SignInButton } from "@/components/signInButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});
const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
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
      <body className={`${lexend.variable} ${lora.variable} min-w-fit`}>
        <div className="flex min-h-screen flex-col">
          <Header></Header>
          {children}
        </div>
      </body>
    </html>
  );
}
