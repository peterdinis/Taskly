import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taskly – Smart Task & Productivity Manager",
  description:
    "Taskly helps you organize your tasks, projects, and daily goals efficiently. A modern task manager inspired by Todoist, designed for productivity and focus.",
  keywords: [
    "Taskly",
    "Todoist clone",
    "task manager",
    "productivity app",
    "task tracker",
    "project management",
  ],
  authors: [{ name: "Taskly Team", url: "https://yourwebsite.com" }],
  openGraph: {
    title: "Taskly – Smart Task & Productivity Manager",
    description:
      "Organize your tasks, projects, and daily goals efficiently with Taskly, a modern Todoist-inspired task manager.",
    url: "https://yourwebsite.com",
    siteName: "Taskly",
    type: "website",
    images: [
      {
        url: "https://yourwebsite.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Taskly App Screenshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taskly – Smart Task & Productivity Manager",
    description:
      "Organize your tasks, projects, and daily goals efficiently with Taskly, a modern Todoist-inspired task manager.",
    images: ["https://yourwebsite.com/og-image.png"],
    site: "@tasklyapp",
    creator: "@tasklyapp",
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
      </body>
    </html>
  );
}
