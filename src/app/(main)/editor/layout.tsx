import { auth } from "@clerk/nextjs/server";
import Navbar from "../Navbar";
import PremiumModal from "@/components/premium/PremiumModal";

// Editor has its own navigation footer, so we don't include the global Footer here
export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
      <PremiumModal />
    </div>
  );
}
