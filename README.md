# NextGen Resume Builder

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Live-000000?logo=vercel&logoColor=white)

**A modern, AI-powered resume builder featuring 12 professional templates, real-time preview, ATS score checking, and intelligent content generation.**

---

## ✨ Features

### 🎨 12 Professional Templates
- **Modern Collection** - Modern, Modern Professional, Modern Minimal, Clean Professional
- **Professional Collection** - Professional, Executive, Data Science Modular  
- **Creative Collection** - Creative Gradient, LuxSleek Dark, Deedy Two-Column
- **Sidebar Collection** - Sidebar, Professional Sidebar
- ⭐ 6 Recommended templates for best results
- Live template preview gallery
- Real-time template switching

### 🤖 AI-Powered Features
- **Smart Summary Generation** - AI-generated professional summaries using Google Gemini 2.5 Flash
- **Experience Enhancement** - Intelligent work description improvements
- **Content Suggestions** - Context-aware writing assistance

### 📊 ATS Score Checker
- Upload and analyze resumes (PDF/DOCX)
- Overall ATS compatibility score (0-100)
- Category breakdowns (Keywords, Formatting, Content)
- Specific improvement suggestions
- Matched and missing keywords analysis

### 💼 Resume Sections
- **Personal Information** – Name, job title, contact details, and profile photo
- **Professional Summary** – AI-generated or custom career summary
- **Work Experience** – Employment history with dates and rich text descriptions
- **Education** – Academic background and qualifications
- **Projects** – Showcase personal and professional projects with links
- **Certifications** – Professional certifications with validity periods
- **Skills** – Technical and soft skills with formatting
- **Strengths** – Key personal strengths
- **Languages** – Language proficiencies

### 🎯 Core Functionality
- 📝 **Live Preview** – See changes in real-time as you type
- 🎨 **Template Gallery** – Choose from 12 professional designs
- 🌓 **Theme Switcher** – Dark, Light, and System modes
- 🖼️ **Photo Support** – Profile photos in all templates
- ✏️ **Rich Text Editor** - Bold, italic, lists, and links (Tiptap)
- 📄 **PDF Export** – Download your resume as a professional PDF
- 💾 **Auto-Save** – Never lose your work
- 🔐 **Secure Authentication** – User authentication with Clerk
- ☁️ **Cloud Storage** – Resumes saved to PostgreSQL via Prisma
- 📱 **Responsive Design** – Works on desktop and mobile devices
- 📈 **Dashboard Analytics** – Resume statistics and ATS tracking

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | PostgreSQL (Neon) |
| **ORM** | Prisma |
| **Authentication** | Clerk |
| **AI** | Google Gemini 2.5 Flash |
| **Rich Text** | Tiptap Editor |
| **Forms** | React Hook Form + Zod |
| **UI Components** | Radix UI + shadcn/ui |
| **Icons** | Lucide React |
| **Date Handling** | date-fns |
| **Theme** | next-themes |
| **PDF Export** | jsPDF + html2canvas |
| **File Parsing** | pdf-parse, mammoth |

---

## 📁 Project Structure

```
nextgenresume/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (editor)/          # Resume editor
│   │   │   └── editor/
│   │   │       ├── forms/     # Form components for each section
│   │   │       ├── TemplateGallery.tsx
│   │   │       └── ResumePreviewSection.tsx
│   │   ├── (main)/            # Main app pages
│   │   │   ├── dashboard/     # Dashboard with analytics
│   │   │   ├── resumes/       # Resume management
│   │   │   └── check-ats/     # ATS checker
│   │   └── api/               # API routes
│   │       ├── ats/           # ATS analysis
│   │       └── ai/            # AI generation
│   ├── components/
│   │   ├── templates/         # 12 Resume templates
│   │   ├── ui/                # Reusable UI components
│   │   ├── ThemeSwitcher.tsx  # Theme toggle
│   │   └── ResumePreview.tsx  # Live resume preview
│   ├── hooks/                 # Custom React hooks
│   └── lib/
│       ├── validation.ts      # Zod schemas
│       ├── prisma.ts          # Prisma client
│       └── gemini.ts          # Gemini AI client
└── public/                    # Static assets
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database (or Neon account)
- Google Gemini API key
- Clerk account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/deva016/nextgen-resume.git
   cd nextgen-resume
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file with the following:
   ```env
   # Database
   DATABASE_URL="postgresql://..."
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
   CLERK_SECRET_KEY="sk_..."
   NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
   NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
   
   # Google Gemini AI
   GEMINI_API_KEY="..."
   ```

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the app**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

---

## 🗃️ Database Schema

The application uses the following main models:

- **User** – User account (managed by Clerk)
- **Resume** – Core resume data with personal info, content, and styling
- **ATSScore** – ATS analysis results with scores and suggestions

All resume content (work experience, education, projects, certifications) is stored as JSON within the Resume model for flexibility.

---

## 🧪 Testing

The project includes comprehensive tests:

```bash
# Run all tests
npm test

# Date formatting tests (26 test cases)
npm test date-formatting
```

---

## 🚢 Deployment

The app is optimized for deployment on **Vercel**:

1. Push your code to GitHub
2. Connect the repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `GEMINI_API_KEY`
4. Deploy!

The build process automatically runs database migrations.

---

## 📖 Documentation

For comprehensive documentation, see:
- **[PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)** - Complete technical documentation covering development timeline, architecture, features, challenges, and future roadmap

---

## 🎯 Key Highlights

- ✅ **12 Professional Templates** - Industry-ready designs for all professions
- ✅ **AI-Powered** - Smart content generation with Google Gemini
- ✅ **ATS-Friendly** - Built-in ATS score checker and optimization
- ✅ **Real-time Preview** - See changes instantly as you type
- ✅ **Full Data Display** - No artificial limits on content
- ✅ **Dark Mode** - Beautiful dark theme with system preference support
- ✅ **Type-Safe** - 100% TypeScript for reliability
- ✅ **Production Ready** - Deployed and battle-tested

---

## 📝 License

This project is private and not licensed for public use.

---

## 👤 Author

**BOMMIDI DEVESHWAR**

---

## 🙏 Acknowledgments

Built with modern web technologies including Next.js, React, TypeScript, Tailwind CSS, Prisma, and Google Gemini AI.

---

**Last Updated:** January 8, 2026
