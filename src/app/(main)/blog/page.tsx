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
  Palette,
  CheckCircle2,
  Clock
} from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - NextGen Resume Builder",
  description: "Latest updates, features, and technologies powering NextGen Resume.",
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
            Product Updates & Tech Stack
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            What&apos;s New in{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              NextGen Resume
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Discover the technology powering your professional resume builder
          </p>
        </div>

        {/* Latest Articles */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">📚 Latest Articles</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Article 1: Development Journey */}
            <article className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10">
              <div className="mb-3 flex items-center gap-2 text-sm text-purple-400">
                <span className="rounded-full bg-purple-500/20 px-2 py-0.5">Development</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">16 min read</span>
              </div>
              <h3 className="mb-3 text-xl font-bold group-hover:text-purple-400 transition-colors">
                Building NextGen Resume Builder: A 6-Week Journey
              </h3>
              <p className="mb-4 text-gray-400">
                How I built a full-featured, AI-powered resume builder from scratch in 6 weeks. 
                Week-by-week timeline covering challenges, pivotal decisions, and lessons learned from initial concept to production deployment.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">#NextJS</span>
                <span className="text-xs text-gray-500">#ProjectManagement</span>
                <span className="text-xs text-gray-500">#WebDev</span>
              </div>
            </article>

            {/* Article 2: Template Implementation */}
            <article className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-pink-500/50 hover:bg-white/10">
              <div className="mb-3 flex items-center gap-2 text-sm text-pink-400">
                <span className="rounded-full bg-pink-500/20 px-2 py-0.5">Technical</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">15 min read</span>
              </div>
              <h3 className="mb-3 text-xl font-bold group-hover:text-pink-400 transition-colors">
                12 Professional Resume Templates: A Technical Deep Dive
              </h3>
              <p className="mb-4 text-gray-400">
                Designing and implementing a comprehensive template system with full data display, consistent formatting, 
                and beautiful aesthetics. Includes the data truncation bug saga and 26-test date formatting solution.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">#React</span>
                <span className="text-xs text-gray-500">#TypeScript</span>
                <span className="text-xs text-gray-500">#DesignSystems</span>
              </div>
            </article>

            {/* Article 3: AI Integration */}
            <article className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-white/10">
              <div className="mb-3 flex items-center gap-2 text-sm text-blue-400">
                <span className="rounded-full bg-blue-500/20 px-2 py-0.5">AI</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">17 min read</span>
              </div>
              <h3 className="mb-3 text-xl font-bold group-hover:text-blue-400 transition-colors">
                Integrating Google Gemini AI for Smart Resume Generation
              </h3>
              <p className="mb-4 text-gray-400">
                From prompt engineering to production: building AI-powered content generation for resume writing. 
                Complete guide covering Gemini setup, prompt strategies, error handling, and real-world results.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">#AI</span>
                <span className="text-xs text-gray-500">#GoogleGemini</span>
                <span className="text-xs text-gray-500">#PromptEngineering</span>
              </div>
            </article>

            {/* Article 4: ATS Platform */}
            <article className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-green-500/50 hover:bg-white/10">
              <div className="mb-3 flex items-center gap-2 text-sm text-green-400">
                <span className="rounded-full bg-green-500/20 px-2 py-0.5">Backend</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">16 min read</span>
              </div>
              <h3 className="mb-3 text-xl font-bold group-hover:text-green-400 transition-colors">
                Building an ATS-Friendly Resume Platform from Scratch
              </h3>
              <p className="mb-4 text-gray-400">
                How I built a comprehensive ATS score checker that parses resumes, analyzes compatibility, and provides 
                actionable feedback. Covers PDF/DOCX parsing, scoring algorithms, and AI-powered suggestions.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">#ATS</span>
                <span className="text-xs text-gray-500">#Parsing</span>
                <span className="text-xs text-gray-500">#CareerTech</span>
              </div>
            </article>
          </div>

          {/* Articles CTA */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Want to read these articles? They&apos;re available in the project documentation.{" "}
              <a 
                href="https://github.com/deva016/nextgen-resume" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors underline"
              >
                View on GitHub →
              </a>
            </p>
          </div>
        </section>

        {/* Live Features */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-green-400" />
            <h2 className="text-3xl font-bold">✅ Live Features</h2>
          </div>
          
          <div className="space-y-6">
            {/* Feature 1: 12 Templates */}
            <div className="group rounded-2xl border border-green-500/20 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-green-500/50 hover:bg-white/10">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-lg bg-green-500/20 p-3">
                  <Palette className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-xl font-semibold">12 Professional Resume Templates</h3>
                    <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-300">LIVE</span>
                  </div>
                  <p className="text-gray-400">
                    Choose from 12 professionally designed, ATS-friendly templates including Modern, Professional, 
                    Creative Gradient, Executive, and more. All templates support complete data display (no limits), 
                    custom colors, and profile photos.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">⭐ 6 Recommended</span>
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">Live Preview Gallery</span>
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">Photo Support</span>
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">Full Data Display</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: AI Enhancement */}
            <div className="group rounded-2xl border border-green-500/20 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-green-500/50 hover:bg-white/10">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-lg bg-green-500/20 p-3">
                  <Brain className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-xl font-semibold">AI-Powered Content Generation</h3>
                    <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-300">LIVE</span>
                  </div>
                  <p className="text-gray-400">
                    Powered by Google Gemini 2.5 Flash to automatically generate professional summaries and enhance 
                    work experience descriptions. Get smart suggestions with context-aware AI assistance.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">Gemini 2.5 Flash</span>
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">Summary Generation</span>
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">Smart Enhancement</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: ATS Checker */}
            <div className="group rounded-2xl border border-green-500/20 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-green-500/50 hover:bg-white/10">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-lg bg-green-500/20 p-3">
                  <BarChart3 className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-xl font-semibold">ATS Score Checker</h3>
                    <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-300">LIVE</span>
                  </div>
                  <p className="text-gray-400">
                    Upload your resume (PDF/DOCX) and get instant ATS compatibility scores. AI-powered analysis 
                    provides category breakdowns (keywords, formatting, content) and actionable improvement suggestions.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">PDF/DOCX Support</span>
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">0-100 Scoring</span>
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">AI Suggestions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 4: Dashboard */}
            <div className="group rounded-2xl border border-green-500/20 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-green-500/50 hover:bg-white/10">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-lg bg-green-500/20 p-3">
                  <Layers className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-xl font-semibold">Analytics Dashboard</h3>
                    <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-300">LIVE</span>
                  </div>
                  <p className="text-gray-400">
                    Beautiful dashboard with glassmorphism design showing resume statistics, ATS scores, and quick actions. 
                    Track your progress with visual analytics and manage multiple resumes effortlessly.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">Stats Cards</span>
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">ATS Tracking</span>
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">Quick Actions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 5: Theme Switcher */}
            <div className="group rounded-2xl border border-green-500/20 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-green-500/50 hover:bg-white/10">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-lg bg-green-500/20 p-3">
                  <Sparkles className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-xl font-semibold">Dark/Light Theme Support</h3>
                    <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-300">LIVE</span>
                  </div>
                  <p className="text-gray-400">
                    Beautiful floating theme switcher with Dark, Light, and System modes. Persistent preferences 
                    with smooth transitions and glassmorphism design.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">3 Modes</span>
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">Auto-Save Preference</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Features */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <Clock className="h-8 w-8 text-orange-400" />
            <h2 className="text-3xl font-bold">🚧 Coming Soon</h2>
          </div>
          
          <div className="space-y-6">
            {/* Job Matching - When APIs Available */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm opacity-75 transition-all hover:border-orange-500/50 hover:bg-white/10">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-lg bg-orange-500/20 p-3">
                  <Briefcase className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-xl font-semibold">Smart Job Matching</h3>
                    <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-xs text-orange-300">ROADMAP</span>
                  </div>
                  <p className="text-gray-400">
                    Automatically discover jobs matching your resume. Currently on hold pending reliable job API availability. 
                    Will analyze skills and experience to recommend relevant positions when integrated.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-300">API Research</span>
                    <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-300">Match Scoring</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Letter Builder */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm opacity-75 transition-all hover:border-purple-500/50 hover:bg-white/10">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-lg bg-purple-500/20 p-3">
                  <Code2 className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-xl font-semibold">Cover Letter Builder</h3>
                    <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-xs text-purple-300">Q1 2026</span>
                  </div>
                  <p className="text-gray-400">
                    Create matching cover letters with AI assistance. Templates will match your resume design for 
                    coordinated application materials. AI-powered generation based on job descriptions.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">AI Generation</span>
                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">Match Resume Style</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Industry Templates */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm opacity-75 transition-all hover:border-pink-500/50 hover:bg-white/10">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-lg bg-pink-500/20 p-3">
                  <Palette className="h-6 w-6 text-pink-400" />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-xl font-semibold">Industry-Specific Templates</h3>
                    <span className="rounded-full bg-pink-500/20 px-2 py-0.5 text-xs text-pink-300">Q2 2026</span>
                  </div>
                  <p className="text-gray-400">
                    Specialized templates for different industries including Tech (project-focused), Academic (publications), 
                    Creative (portfolio-integrated), and Executive (leadership-oriented).
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-pink-500/10 px-3 py-1 text-xs text-pink-300">Tech Templates</span>
                    <span className="rounded-full bg-pink-500/10 px-3 py-1 text-xs text-pink-300">Academic</span>
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
                  <strong className="text-white">TypeScript 5.0</strong> - Type-safe development
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <strong className="text-white">Tailwind CSS 3.4</strong> - Modern styling with glassmorphism
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <strong className="text-white">Tiptap</strong> - Rich text editor
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
                  <strong className="text-white">PostgreSQL 16</strong> - Neon serverless database
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <strong className="text-white">Prisma 5.22</strong> - Type-safe ORM
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
                <h3 className="text-xl font-semibold">AI & Processing</h3>
              </div>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <strong className="text-white">Google Gemini 2.5 Flash</strong> - AI content generation
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <strong className="text-white">pdf-parse</strong> - PDF text extraction
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <strong className="text-white">mammoth</strong> - DOCX parsing
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <strong className="text-white">date-fns</strong> - Date handling
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
                  <strong className="text-white">jsPDF</strong> - PDF export
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  <strong className="text-white">next-themes</strong> - Theme management
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
                Start using NextGen Resume today with 12 professional templates, AI assistance, and ATS checking
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
