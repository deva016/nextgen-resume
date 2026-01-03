import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Sparkles, Zap, FileText, Palette, Download, Shield } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0f] text-white overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-pink-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-orange-600/20 blur-[120px]" />
      </div>

      {/* Glassmorphism Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
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

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">
              How it Works
            </Link>
            <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="/tos" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {userId ? (
              <>
                <Button asChild variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                  <Link href="/resumes">My Resumes</Link>
                </Button>
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
              </>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                  <Link href="/sign-in">Sign in</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 shadow-lg shadow-purple-500/25"
                >
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative flex-1">
        <section className="relative px-6 py-24 md:py-32">
          <div className="mx-auto max-w-5xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
              <Sparkles className="h-4 w-4" />
              AI-Powered Resume Builder
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Build your{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                dream resume
              </span>
              <br />
              in minutes
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 md:text-xl">
              Create stunning, ATS-friendly resumes with AI assistance. 
              Stand out from the crowd and land your dream job faster.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 text-lg font-semibold shadow-2xl shadow-purple-500/30 transition-all hover:shadow-purple-500/50"
              >
                <Link href="/resumes" className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Start Building Free
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-white/20 bg-white/5 px-8 py-6 text-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/30"
              >
                <Link href="#features">See Features</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Export to PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Multiple templates</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Everything you need to{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  succeed
                </span>
              </h2>
              <p className="text-gray-400">
                Powerful features to help you create the perfect resume
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature Card 1 */}
              <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 inline-flex rounded-lg bg-purple-500/20 p-3">
                    <Sparkles className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">AI-Powered Writing</h3>
                  <p className="text-gray-400">
                    Let AI help you craft compelling descriptions and summaries that highlight your achievements.
                  </p>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-pink-500/50 hover:bg-white/10">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 inline-flex rounded-lg bg-pink-500/20 p-3">
                    <Palette className="h-6 w-6 text-pink-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Beautiful Templates</h3>
                  <p className="text-gray-400">
                    Choose from multiple professional templates designed to impress recruiters.
                  </p>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-orange-500/50 hover:bg-white/10">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 inline-flex rounded-lg bg-orange-500/20 p-3">
                    <Zap className="h-6 w-6 text-orange-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Real-time Preview</h3>
                  <p className="text-gray-400">
                    See your changes instantly with our live preview as you build your resume.
                  </p>
                </div>
              </div>

              {/* Feature Card 4 */}
              <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 inline-flex rounded-lg bg-purple-500/20 p-3">
                    <Download className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">PDF Export</h3>
                  <p className="text-gray-400">
                    Download your resume as a perfectly formatted PDF ready to send to employers.
                  </p>
                </div>
              </div>

              {/* Feature Card 5 */}
              <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-pink-500/50 hover:bg-white/10">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 inline-flex rounded-lg bg-pink-500/20 p-3">
                    <FileText className="h-6 w-6 text-pink-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">All Sections Included</h3>
                  <p className="text-gray-400">
                    Projects, certifications, skills, languages – everything you need in one place.
                  </p>
                </div>
              </div>

              {/* Feature Card 6 */}
              <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-orange-500/50 hover:bg-white/10">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 inline-flex rounded-lg bg-orange-500/20 p-3">
                    <Shield className="h-6 w-6 text-orange-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Auto-Save</h3>
                  <p className="text-gray-400">
                    Your progress is automatically saved so you never lose your work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative px-6 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-12 backdrop-blur-sm">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20" />
              <div className="relative">
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                  Ready to build your resume?
                </h2>
                <p className="mb-8 text-gray-300">
                  Join thousands of job seekers who&apos;ve landed their dream jobs
                </p>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white text-gray-900 px-8 py-6 text-lg font-semibold hover:bg-gray-100 shadow-2xl"
                >
                  <Link href="/resumes">Get Started – It&apos;s Free</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image src={logo} alt="Logo" width={24} height={24} className="rounded-full" />
              <span className="text-sm text-gray-400">NextGen Resume Builder</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/tos" className="hover:text-white transition-colors">Terms of Service</Link>
              <span>© {new Date().getFullYear()} All rights reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
