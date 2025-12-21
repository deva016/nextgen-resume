import { auth } from "@clerk/nextjs/server";
import PremiumModal from "@/components/premium/PremiumModal";

// Editor layout - no Navbar here since parent (main) layout already has it
// No Footer here since editor has its own navigation footer
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
    <>
      {children}
      <PremiumModal />
    </>
  );
}
