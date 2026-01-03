import { Metadata } from "next";
import Link from "next/link";
import { 
  Sparkles, 
  Zap, 
  Code2, 
  Layers, 
  Database, 
  Brain,
  Briefcase,
  BarChart3,
  Palette
} from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Latest updates and technologies powering NextGen Resume.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Animated Background Gradients */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-pink-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-orange-600/20 blur-[120px]" />
      </div>

      <main className="relative mx-auto max-w-5xl px-6 py-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            <Sparkles className="h-4 w-4" />
            Product Updates
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            What's Next for{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              NextGen Resume
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Discover upcoming features and the technology powering your resume builder
          </p>
        </div>

        {/* Upcoming Features */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">🚀 Upcoming Features</h2>
          
          <div className="space-y-6">
            {/* Feature 1: ATS Checker */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-lg bg-purple-500/20 p-3">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">ATS Score Checker</h3>
                  <p className="text-gray-400">
                    Upload your resume and get an instant ATS compatibility score. Our AI analyzes your resume against 
                    industry standards and provides actionable feedback to improve your chances of passing automated screening systems.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">PDF/DOCX Support</span>
                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">Job Matching</span>
                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">Keyword Analysis</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: AI Enhancement */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-pink-500/50 hover:bg-white/10">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-lg bg-pink-500/20 p-3">
                  <Brain className="h-6 w-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">AI-Powered Resume Enhancement</h3>
                  <p className="text-gray-400">
                    Leverage Google Gemini AI to automatically improve your resume content. Get suggestions for better 
                    action verbs, more impactful bullet points, and optimized descriptions tailored to your target job.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-pink-500/10 px-3 py-1 text-xs text-pink-300">Content Improvement</span>
                    <span className="rounded-full bg-pink-500/10 px-3 py-1 text-xs text-pink-300">Job Tailoring</span>
                    <span className="rounded-full bg-pink-500/10 px-3 py-1 text-xs text-pink-300">Real-time Suggestions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: Job Recommendations */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-orange-500/50 hover:bg-white/10">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-lg bg-orange-500/20 p-3">
                  <Briefcase className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">Smart Job Matching</h3>
                  <p className="text-gray-400">
                    Automatically discover jobs that match your resume. Our system analyzes your skills and experience 
                    to recommend relevant positions from thousands of job listings, helping you find your dream role faster.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-300">Live Job Listings</span>
                    <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-300">Match Scoring</span>
                    <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-300">Location Filter</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 4: Dashboard */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-lg bg-purple-500/20 p-3">
                  <Layers className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">Comprehensive Dashboard</h3>
                  <p className="text-gray-400">
                    Track all your resumes, ATS scores, and job applications in one beautiful dashboard. 
                    Get insights into your job search progress and actionable recommendations.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">Analytics</span>
                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">Progress Tracking</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 5: More Templates */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-pink-500/50 hover:bg-white/10">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-lg bg-pink-500/20 p-3">
                  <Palette className="h-6 w-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">5 New Resume Templates</h3>
                  <p className="text-gray-400">
                    Choose from a growing library of professional templates including Modern Minimal, Two-Column, 
                    Timeline, Creative, and Executive designs. All ATS-friendly and fully customizable.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-pink-500/10 px-3 py-1 text-xs text-pink-300">Modern Minimal</span>
                    <span className="rounded-full bg-pink-500/10 px-3 py-1 text-xs text-pink-300">Two-Column</span>
                    <span className="rounded-full bg-pink-500/10 px-3 py-1 text-xs text-pink-300">Creative</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="mb-8 text-3xl font-bold">⚡ Technology Stack</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Frontend */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <Code2 className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-semibold">Frontend</h3>
              </div>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <strong className="text-white">Next.js 15</strong> - React framework with App Router
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <strong className="text-white">TypeScript</strong> - Type-safe development
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <strong className="text-white">Tailwind CSS</strong> - Modern styling with custom glassmorphism
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <strong className="text-white">Shadcn/ui</strong> - Beautiful, accessible components
                </li>
              </ul>
            </div>

            {/* Backend */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <Database className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-semibold">Backend</h3>
              </div>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <strong className="text-white">PostgreSQL</strong> - Neon serverless database
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <strong className="text-white">Prisma</strong> - Type-safe ORM
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <strong className="text-white">Clerk</strong> - Modern authentication
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <strong className="text-white">Server Actions</strong> - Seamless client-server integration
                </li>
              </ul>
            </div>

            {/* AI & APIs */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <Brain className="h-6 w-6 text-purple-400" />
                <h3 className="text-xl font-semibold">AI & APIs</h3>
              </div>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <strong className="text-white">Google Gemini AI</strong> - Resume enhancement
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <strong className="text-white">Adzuna API</strong> - Job matching
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <strong className="text-white">PDF Parser</strong> - ATS analysis
                </li>
              </ul>
            </div>

            {/* Infrastructure */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <Zap className="h-6 w-6 text-orange-400" />
                <h3 className="text-xl font-semibold">Infrastructure</h3>
              </div>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  <strong className="text-white">Vercel</strong> - Deployment & hosting
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  <strong className="text-white">Edge Functions</strong> - Fast, global performance
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  <strong className="text-white">UploadThing</strong> - File uploads
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="relative mx-auto max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-12 backdrop-blur-sm">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20" />
            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold">Ready to build your resume?</h2>
              <p className="mb-8 text-gray-300">
                Start using NextGen Resume today and land your dream job
              </p>
              <Link
                href="/resumes"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-lg font-semibold text-gray-900 shadow-2xl transition-all hover:bg-gray-100"
              >
                <Sparkles className="h-5 w-5" />
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
