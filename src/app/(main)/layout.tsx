import PremiumModal from "@/components/premium/PremiumModal";
import { auth } from "@clerk/nextjs/server";
import Navbar from "./Navbar";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0f] text-white overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-pink-600/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-orange-600/15 blur-[120px]" />
      </div>
      
      <Navbar />
      <div className="relative flex-1">{children}</div>
      
      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image src={logo} alt="Logo" width={24} height={24} className="rounded-full" />
              <span className="text-sm text-gray-400">NextGen Resume Builder</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
              <Link href="/tos" className="hover:text-white transition-colors">Terms of Service</Link>
              <span>© {new Date().getFullYear()} All rights reserved</span>
            </div>
          </div>
        </div>
      </footer>
      
      <PremiumModal />
    </div>
  );
}
