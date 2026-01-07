import { Toaster } from "@/components/ui/toaster";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "NextGen Resume - AI Powered Resume Builder",
    template: "%s | NextGen Resume",
  },
  description:
    "Create professional, ATS-friendly resumes in minutes with our AI-powered builder. Free templates, real-time preview, and PDF export.",
  applicationName: "NextGen Resume",
  authors: [{ name: "NextGen Resume" }],
  generator: "Next.js",
  keywords: [
    "resume builder",
    "AI resume builder",
    "CV maker",
    "resume templates",
    "job search",
    "career",
    "professional resume",
    "free resume builder",
    "ATS friendly resume",
  ],
  creator: "NextGen Resume",
  publisher: "NextGen Resume",
  metadataBase: new URL("https://nextgen-resume.vercel.app"),
  openGraph: {
    title: "NextGen Resume - AI Powered Resume Builder",
    description:
      "Create professional, ATS-friendly resumes in minutes with our AI-powered builder. Free templates, real-time preview, and PDF export.",
    url: "https://nextgen-resume.vercel.app",
    siteName: "NextGen Resume",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "NextGen Resume Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGen Resume - AI Powered Resume Builder",
    description: "Build your dream resume with AI assistance.",
    images: ["/opengraph-image.png"],
    creator: "@NextGenResume",
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "rcAnKktcQ66r7qF_lsPw29v7aYdo1jirhADg9I7Tsnc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ThemeSwitcher />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
