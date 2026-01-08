# Building NextGen Resume Builder: A 6-Week Journey with Next.js 15 and AI

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?logo=google&logoColor=white)

*How I built a full-featured, AI-powered resume builder from scratch in 6 weeks*

---

## The Beginning

Creating a professional resume shouldn't be hard. Yet millions of job seekers struggle with formatting, ATS compatibility, and writing compelling content. I set out to solve this problem with **NextGen Resume Builder** — an AI-powered platform that makes resume creation effortless.

**The Goal:** Build a modern web application that combines beautiful templates, real-time preview, AI-powered content generation, and ATS score checking.

**The Timeline:** 6 weeks from initial concept to production deployment.

**The Result:** A feature-complete platform with 12 professional templates, AI integration, and comprehensive analytics.

---

## Week 1: Foundation & Architecture

### 🏗️ Setting Up the Tech Stack

I chose **Next.js 15** for its powerful App Router, server components, and excellent developer experience. Here's what the initial stack looked like:

- **Frontend:** Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Server Actions
- **Database:** PostgreSQL (Neon) with Prisma ORM
- **Auth:** Clerk for secure, hassle-free authentication

### 📝 Building the Editor

The core feature was a split-screen editor with live preview:

```tsx
const ResumeEditor = () => {
  const form = useForm<ResumeValues>();
  const resumeData = form.watch(); // Real-time data
  
  return (
    <div className="grid lg:grid-cols-2">
      <FormSection form={form} />
      <ResumePreview resumeData={resumeData} /> {/* Live updates! */}
    </div>
  );
};
```

**Key Decision:** Use React Hook Form + Zod for type-safe form validation. This paid dividends later when adding complex nested forms.

### ✅ Week 1 Achievements
- ✓ Project setup with Next.js 15
- ✓ Database schema designed
- ✓ Two initial templates (Modern, Professional)
- ✓ Live preview working
- ✓ User authentication integrated

---

## Week 2: The ATS Checker

### 🎯 Why ATS Matters

90% of large companies use Applicant Tracking Systems. If your resume isn't ATS-friendly, it might never reach human eyes. I needed to build this feature.

### 🔧 Technical Implementation

The challenge: Parse PDF and DOCX files, extract text, analyze structure, and score compatibility.

```typescript
const calculateATSScore = (resume: ParsedResume) => {
  const keywordScore = analyzeKeywords(resume);      // 30%
  const formattingScore = analyzeFormatting(resume); // 30%
  const contentScore = analyzeContent(resume);       // 40%
  
  return {
    overallScore: Math.round(
      keywordScore * 0.3 + 
      formattingScore * 0.3 + 
      contentScore * 0.4
    ),
    suggestions: generateSuggestions(resume)
  };
};
```

### 💡 The AI Twist

For suggestions, I integrated Google Gemini AI to provide **contextual, actionable improvements**:

- Missing keywords for the industry
- Formatting issues that hurt readability
- Content gaps (missing projects, certifications)

### ⚠️ Challenges Faced

1. **File Parsing Inconsistencies:** Different PDF generators produce vastly different text extraction results
2. **Scoring Fairness:** Balancing the three categories to avoid penalizing certain resume styles
3. **API Rate Limits:** Managing Gemini API calls efficiently

**Solution:** Implemented caching, smart batching, and fallback scoring when AI is unavailable.

---

## Week 3: AI-Powered Content Generation

### 🤖 Enter Google Gemini

I switched from OpenAI to **Google Gemini 2.5 Flash** for several reasons:

- Faster response times (~5-10 seconds vs 15+ seconds)
- More generous free tier (1500 requests/day)
- Better at structured output (JSON)
- Excellent at understanding context

### ✍️ Smart Summary Generation

```typescript
const generateSummary = async (context: ResumeContext) => {
  const prompt = `Generate a professional summary for a ${context.jobTitle} 
    with experience in: ${context.workExperiences.map(e => e.position).join(', ')}
    
    Requirements:
    - 3-4 sentences
    - Highlight key achievements
    - Use action verbs
    - Professional tone`;
    
  const response = await gemini.generateContent(prompt);
  return response.text();
};
```

### 🎨 The User Experience

1. User fills in basic work experience
2. Clicks "Generate Summary"
3. AI analyzes their background
4. Returns a polished, professional summary
5. User can edit or regenerate

**Result:** Users save 10-15 minutes per resume and get better content.

---

## Week 4: The Job Matching Pivot

### 🚧 The Problem

I planned to build job matching — show users relevant jobs based on their resume. I researched every available API:

- **Adzuna:** Free tier discontinued in 2025
- **JSearch:** Heavily rate-limited, unreliable
- **LinkedIn:** Enterprise-only, $$$$

### 🎯 The Decision

**I disabled the feature.**

This was hard. I'd already built parts of the UI. But the cardinal rule of product development echoed in my mind:

> *"It's better to excel at fewer features than to provide many mediocre ones."*

### 💪 What I Did Instead

- Removed UI components gracefully
- Commented code with clear notes for future implementation
- Focused effort on **making the core features exceptional**

**Learning:** Sometimes saying "no" to a feature is the right product decision.

---

## Week 5-6: Template Expansion

### 🎨 From 2 to 12 Templates

The initial templates were good, but users needed variety. I designed and implemented **10 additional professional templates**:

**Modern Collection:**
- Modern Professional (Blue accents, skill badges)
- Modern Minimal (Whitespace-focused)
- Clean Professional (Ultra-clean, ruled sections)

**Professional Collection:**
- Executive (Two-column traditional)
- Data Science Modular (Tech-focused)

**Creative Collection:**
- Creative Gradient (Purple/blue gradient sidebar)
- LuxSleek Dark (Sophisticated dark theme)
- Deedy Two-Column (Academic style)

**Sidebar Collection:**
- Sidebar (Left sidebar layout)
- Professional Sidebar (Dark blue sidebar)

### 🐛 The Data Truncation Bug

**The Problem:** All templates were only showing 2-3 items instead of complete data.

```typescript
// Bad: Artificial limits everywhere
certifications.slice(0, 2).map(...)
skills.slice(0, 6).map(...)
projects.slice(0, 2).map(...)
```

**The Fix:** A systematic removal of ALL `.slice()` restrictions across all 12 templates.

**Impact:** Users could now display their complete professional history.

### 📅 Date Formatting Nightmare

Each template was formatting dates differently:
- "MM/yyyy" vs "MMM yyyy"
- "Present" vs "Current" vs empty string

**Solution:** Created a shared utility and **wrote 26 comprehensive tests** to ensure consistency.

```typescript
const formatDateString = (date: string | undefined, format: string) => {
  if (!date) return "";
  return format(new Date(date), format);
};
```

---

## Week 6: Polish & Perfection

### 🌓 Dark Mode as Default

Modern developers expect dark mode. I implemented a beautiful theme switcher:

- **3 Modes:** Light, Dark, System
- **Persistent Preferences:** localStorage
- **Smooth Transitions:** CSS transitions
- **Glassmorphism Design:** Modern aesthetic

### ⭐ Recommended Templates

Not all templates are created equal. I tagged 6 templates as "Recommended":

- Modern ⭐
- Professional ⭐
- Modern Professional ⭐
- Modern Minimal ⭐
- Clean Professional ⭐
- Data Science ⭐

### 🎨 Template Gallery

Built a beautiful gallery with:
- Live template previews (mini-renders at 25% scale)
- Two sections: Recommended + All Templates
- Instant template switching
- Visual selection indicators

---

## The Numbers

After 6 weeks of development:

- **12** Professional Templates
- **1,500+** Lines of Code
- **26** Test Cases
- **100%** Type Coverage (TypeScript)
- **0** Critical Bugs
- **~30-45s** Build Time
- **<3s** Page Load Time

---

## Key Technical Decisions

### ✅ What Worked

1. **Next.js 15 App Router:** Server components and server actions simplified data fetching
2. **Prisma + PostgreSQL:** Type-safe database access was a game-changer
3. **React Hook Form + Zod:** Form validation without tears
4. **Gemini AI:** Fast, reliable, generous free tier
5. **Vercel Deployment:** Zero-config deployment with automatic HTTPS

### ❌ What I'd Change

1. **Type System:** Some `string` vs `string[]` type conflicts remain (future refactor)
2. **Testing:** Should have written more integration tests earlier
3. **Performance:** Could optimize bundle size with lazy loading

---

## Lessons Learned

### 1. **Start with the Hardest Problem**

I tackled ATS checking early. This set the technical bar high and influenced all subsequent decisions.

### 2. **User Experience > Feature Count**

Disabling job matching was the right call. The app is better for it.

### 3. **Type Safety Pays Off**

TypeScript caught hundreds of bugs before runtime. The upfront cost pays dividends.

### 4. **Test the Boring Stuff**

Date formatting seems trivial. But 26 tests ensured consistency across 12 templates.

### 5. **AI is a Tool, Not Magic**

Gemini AI enhances the product but can't replace good UX and solid fundamentals.

---

## What's Next?

The journey doesn't end here. Planned enhancements:

**Short-term (1-3 months):**
- Cover letter builder matching resume style
- 5-10 more templates
- Keyword optimization

**Medium-term (3-6 months):**
- Collaboration features (share for feedback)
- Portfolio website export
- Version history

**Long-term (6+ months):**
- Job board integration (when APIs improve)
- Premium tier with advanced analytics
- Mobile app (React Native)

---

## Try It Yourself

The platform is live and ready to use. Whether you're a job seeker, developer, or just curious about modern web development, check it out:

🔗 **[GitHub Repository](https://github.com/deva016/nextgen-resume)**  
🚀 **[Live Demo](https://deployed-on-vercel)**

---

## Tech Stack Summary

If you're building something similar, here's the complete stack:

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.0
- **Styling:** Tailwind CSS 3.4
- **Database:** PostgreSQL 16 (Neon)
- **ORM:** Prisma 5.22
- **Auth:** Clerk
- **AI:** Google Gemini 2.5 Flash
- **Rich Text:** Tiptap
- **Forms:** React Hook Form + Zod
- **Deployment:** Vercel

---

## Final Thoughts

Building NextGen Resume Builder in 6 weeks was intense, rewarding, and educational. Every feature taught me something new about web development, product design, and user experience.

The most important lesson? **Ship it.** 

Perfect is the enemy of done. I could have spent 6 more weeks polishing, but users needed this tool now. The feedback I've received since launch has been invaluable for prioritizing future improvements.

If you're building something, my advice:

1. Start with a clear, focused goal
2. Choose modern, well-supported tools
3. Test the critical paths
4. Don't be afraid to cut features
5. Ship early, iterate often

---

**What questions do you have about the development process? Drop them in the comments!**

*Follow me for more posts on Next.js, TypeScript, and AI integration in web apps.*

---

**Tags:** #NextJS #TypeScript #WebDev #AI #React #TailwindCSS #PostgreSQL #CareerDev
