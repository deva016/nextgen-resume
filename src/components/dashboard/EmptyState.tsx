import Link from "next/link";
import { FileText, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

export default function EmptyState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 p-12 text-center backdrop-blur-xl">
      <div className="mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6">
        <FileText className="size-12 text-purple-400" />
      </div>

      <h3 className="mb-2 text-2xl font-bold text-white">
        No resumes yet
      </h3>
      
      <p className="mb-6 max-w-md text-gray-400">
        Create your first AI-powered resume and start landing more interviews.
        Our ATS checker will help you optimize it for maximum impact.
      </p>

      <Button
        asChild
        size="lg"
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        <Link href="/editor">
          <Sparkles className="mr-2 size-4" />
          Create Your First Resume
        </Link>
      </Button>
    </div>
  );
}
