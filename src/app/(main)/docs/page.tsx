import { Metadata } from "next";
import Link from "next/link";
import { 
  BookOpen, 
  Code2, 
  Brain,
  Layers,
  BarChart3,
  ArrowLeft,
  ExternalLink,
  Clock
} from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation - NextGen Resume Builder",
  description: "Technical articles and documentation for NextGen Resume Builder",
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Animated Background Gradients */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-pink-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-6 py-24">
        {/* Back Button */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            <BookOpen className="h-4 w-4" />
            Technical Documentation
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            Development{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Documentation
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            In-depth technical articles covering the complete development journey
          </p>
        </div>

        {/* Articles Grid */}
        <div className="space-y-8">
          {/* Article 1: Development Journey */}
          <article className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4">
                  <Code2 className="h-8 w-8 text-purple-400" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300">
                    Development
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>16 min read</span>
                  </div>
                  <span className="text-sm text-gray-500">~4,000 words</span>
                </div>

                <h2 className="mb-3 text-2xl font-bold group-hover:text-purple-400 transition-colors">
                  Building NextGen Resume Builder: A 6-Week Journey with Next.js 15 and AI
                </h2>

                <p className="mb-4 text-gray-400 leading-relaxed">
                  A comprehensive week-by-week account of building a full-featured, AI-powered resume builder 
                  from scratch. Covers initial setup, ATS checker implementation, AI integration with Gemini, 
                  dashboard development, the job matching pivot decision, template expansion (2 to 12 templates), 
                  and final UI polish with dark mode.
                </p>

                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-semibold text-gray-300">Key Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-500">#Next.js15</span>
                    <span className="text-xs text-gray-500">#ProjectTimeline</span>
                    <span className="text-xs text-gray-500">#TechDecisions</span>
                    <span className="text-xs text-gray-500">#DataTruncationBug</span>
                    <span className="text-xs text-gray-500">#LessonsLearned</span>
                  </div>
                </div>

                <a
                  href="https://github.com/deva016/nextgen-resume/blob/main/docs/blog_development_journey.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-400 transition-colors hover:text-purple-300"
                >
                  Read Article
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>

          {/* Article 2: Template Implementation */}
          <article className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-pink-500/50 hover:bg-white/10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="rounded-2xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 p-4">
                  <Layers className="h-8 w-8 text-pink-400" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-medium text-pink-300">
                    Technical Deep Dive
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>15 min read</span>
                  </div>
                  <span className="text-sm text-gray-500">~3,800 words</span>
                </div>

                <h2 className="mb-3 text-2xl font-bold group-hover:text-pink-400 transition-colors">
                  12 Professional Resume Templates: A Technical Deep Dive
                </h2>

                <p className="mb-4 text-gray-400 leading-relaxed">
                  Detailed breakdown of designing and implementing a scalable template system. Covers template 
                  architecture, the data truncation bug saga, date formatting consistency (with 26 comprehensive tests), 
                  photo display support, template gallery with mini-renders, and performance optimizations including 
                  memoization strategies.
                </p>

                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-semibold text-gray-300">Key Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-500">#React</span>
                    <span className="text-xs text-gray-500">#ComponentArchitecture</span>
                    <span className="text-xs text-gray-500">#DesignSystems</span>
                    <span className="text-xs text-gray-500">#Testing</span>
                    <span className="text-xs text-gray-500">#Performance</span>
                  </div>
                </div>

                <a
                  href="https://github.com/deva016/nextgen-resume/blob/main/docs/blog_template_implementation.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-pink-400 transition-colors hover:text-pink-300"
                >
                  Read Article
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>

          {/* Article 3: AI Integration */}
          <article className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-white/10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4">
                  <Brain className="h-8 w-8 text-blue-400" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300">
                    AI Integration
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>17 min read</span>
                  </div>
                  <span className="text-sm text-gray-500">~4,200 words</span>
                </div>

                <h2 className="mb-3 text-2xl font-bold group-hover:text-blue-400 transition-colors">
                  Integrating Google Gemini AI for Smart Resume Generation
                </h2>

                <p className="mb-4 text-gray-400 leading-relaxed">
                  Complete guide to implementing AI-powered content generation using Google Gemini 2.5 Flash. 
                  Covers why Gemini over OpenAI, client setup, configuration choices (temperature, tokens), 
                  professional summary generation, work experience enhancement, prompt engineering strategies, 
                  error handling (rate limiting, retries, validation), and real before/after examples.
                </p>

                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-semibold text-gray-300">Key Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-500">#GoogleGemini</span>
                    <span className="text-xs text-gray-500">#PromptEngineering</span>
                    <span className="text-xs text-gray-500">#AIIntegration</span>
                    <span className="text-xs text-gray-500">#ErrorHandling</span>
                    <span className="text-xs text-gray-500">#Performance</span>
                  </div>
                </div>

                <a
                  href="https://github.com/deva016/nextgen-resume/blob/main/docs/blog_ai_integration.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 transition-colors hover:text-blue-300"
                >
                  Read Article
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>

          {/* Article 4: ATS Platform */}
          <article className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-green-500/50 hover:bg-white/10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-4">
                  <BarChart3 className="h-8 w-8 text-green-400" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-300">
                    Backend & Parsing
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>16 min read</span>
                  </div>
                  <span className="text-sm text-gray-500">~3,900 words</span>
                </div>

                <h2 className="mb-3 text-2xl font-bold group-hover:text-green-400 transition-colors">
                  Building an ATS-Friendly Resume Platform from Scratch
                </h2>

                <p className="mb-4 text-gray-400 leading-relaxed">
                  Deep dive into building a comprehensive ATS score checker from the ground up. Covers file parsing 
                  (PDF with pdf-parse, DOCX with mammoth), section parsing with regex patterns, scoring algorithms 
                  (keywords 30%, formatting 30%, content 40%), AI-powered suggestions with Gemini, database storage, 
                  and performance optimizations with caching and background processing.
                </p>

                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-semibold text-gray-300">Key Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-500">#ATS</span>
                    <span className="text-xs text-gray-500">#PDFParsing</span>
                    <span className="text-xs text-gray-500">#Algorithms</span>
                    <span className="text-xs text-gray-500">#Backend</span>
                    <span className="text-xs text-gray-500">#CareerTech</span>
                  </div>
                </div>

                <a
                  href="https://github.com/deva016/nextgen-resume/blob/main/docs/blog_ats_platform.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-400 transition-colors hover:text-green-300"
                >
                  Read Article
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>
        </div>

        {/* Additional Resources */}
        <div className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-8 backdrop-blur-sm">
            <h3 className="mb-4 text-2xl font-bold">Additional Resources</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <a
                href="https://github.com/deva016/nextgen-resume"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl bg-white/5 p-4 transition-colors hover:bg-white/10"
              >
                <Code2 className="h-5 w-5 text-purple-400" />
                <div>
                  <div className="font-semibold">Source Code</div>
                  <div className="text-sm text-gray-400">View on GitHub</div>
                </div>
                <ExternalLink className="ml-auto h-4 w-4 text-gray-500" />
              </a>

              <Link
                href="/blog"
                className="flex items-center gap-3 rounded-xl bg-white/5 p-4 transition-colors hover:bg-white/10"
              >
                <BookOpen className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="font-semibold">Blog</div>
                  <div className="text-sm text-gray-400">Latest updates & features</div>
                </div>
                <ArrowLeft className="ml-auto h-4 w-4 rotate-180 text-gray-500" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
