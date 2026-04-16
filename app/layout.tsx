import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

const isGithubPagesBuild = process.env.GITHUB_PAGES === "true";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Darcy's Portfolio - Backend API & Fallback Frontend (Vercel)",
  description: "Backend API and fallback frontend for portfolio content",
  generator: 'v0.dev',
  icons: {
    icon: '/CodeJedi.png',
    shortcut: '/CodeJedi.png',
    apple: '/CodeJedi.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {!isGithubPagesBuild && <Analytics />}
        {!isGithubPagesBuild && <SpeedInsights />}
      </body>
    </html>
  );
}
