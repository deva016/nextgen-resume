import PremiumModal from "@/components/premium/PremiumModal";
import { auth } from "@clerk/nextjs/server";
import Navbar from "../(main)/Navbar";

// Editor route group - has Navbar but NO global footer (editor has its own navigation footer)
export default async function EditorGroupLayout({
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
      {/* Subtle Background Gradients */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-pink-600/10 blur-[120px]" />
      </div>
      
      <Navbar />
      <div className="relative flex-1">{children}</div>
      <PremiumModal />
    </div>
  );
}
