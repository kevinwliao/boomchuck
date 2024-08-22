import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Lexend } from "next/font/google";
import { Lora } from "next/font/google";
import { ThemeProvider } from "@/components/themeProvider";
import UserAvatar from "@/components/ui/avatar";
import Header from "./header";
import "./globals.css";
import { SignInButton } from "@/components/signInButton";
import { Toaster } from "@/components/ui/toaster";

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
  title: {
    default: "Boomchuck",
    template: "%s | Boomchuck",
  },
  description: "Interactive website to create bluegrass backing tracks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${lexend.variable} ${lora.variable} w-screen`}>
        <div className="flex min-h-screen flex-col">
          <Header></Header>
          {children}
        </div>
        <Toaster></Toaster>
      </body>
    </html>
  );
}
