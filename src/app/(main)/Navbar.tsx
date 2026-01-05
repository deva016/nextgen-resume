"use client";

import logo from "@/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-4">
        <Link href="/resumes" className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-sm" />
            <Image
              src={logo}
              alt="Logo"
              width={40}
              height={40}
              className="relative rounded-full"
            />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            NextGen Resume
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/dashboard" 
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <Link 
            href="/blog" 
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Blog
          </Link>
          <Link 
            href="/check-ats" 
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Check ATS Score
          </Link>
          <UserButton
            appearance={{
              baseTheme: dark,
              elements: {
                avatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
