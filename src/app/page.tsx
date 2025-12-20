import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold">
            <span className="text-orange-500">Nextgen</span>
            <span className="text-gray-900">Resume</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/sign-up">Sign up</Link>
          </Button>
          <Button
            asChild
            className="rounded-full bg-orange-500 hover:bg-orange-600"
          >
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Content */}
          <div className="relative space-y-8">
            {/* Decorative circle */}
            <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-orange-100 opacity-50" />
            
            {/* Decorative triangle */}
            <div className="absolute -right-4 -top-8 h-0 w-0 border-b-[60px] border-l-[60px] border-b-transparent border-l-orange-200 opacity-60" />

            <div className="relative space-y-6">
              <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
                Create a{" "}
                <span className="text-orange-500">resume</span> that secures
                your <span className="text-orange-500">dream job</span>
              </h1>

              <p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
                Build a resume that piques the interest of recruiters and gets
                you hired. It&apos;s fast and easy to use.
              </p>

              <div className="relative inline-block">
                {/* Decorative dotted box */}
                <div className="absolute -right-16 top-2 h-16 w-16 rounded-lg border-2 border-dashed border-orange-300" />

                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-orange-500 px-12 py-6 text-lg font-semibold hover:bg-orange-600"
                >
                  <Link href="/resumes">Try for free</Link>
                </Button>
              </div>
            </div>
            
            {/* Decorative circle */}
            <div className="absolute -bottom-8 right-8 h-32 w-32 rounded-full bg-orange-100 opacity-50" />
          </div>
        </div>
      </main>
    </div>
  );
}
