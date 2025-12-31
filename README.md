# NextGen Resume Builder

A modern, AI-powered resume builder built with Next.js 15, featuring real-time preview, drag-and-drop reordering, and a sleek, professional interface.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss)

## ✨ Features

### Resume Sections
- **Personal Information** – Name, job title, contact details, and profile photo
- **Professional Summary** – AI-generated or custom career summary
- **Work Experience** – Employment history with dates and descriptions
- **Education** – Academic background and qualifications
- **Projects** – Showcase personal and professional projects
- **Certifications** – Professional certifications with validity periods
- **Skills** – Technical and soft skills
- **Strengths** – Key personal strengths
- **Languages** – Language proficiencies

### Core Functionality
- 📝 **Live Preview** – See changes in real-time as you type
- 🎨 **Customizable Themes** – Choose colors and border styles
- 🔄 **Drag & Drop Reordering** – Organize sections with intuitive drag-and-drop
- 🤖 **AI-Powered Generation** – Generate summaries and work descriptions with OpenAI
- 📄 **PDF Export** – Download your resume as a professional PDF
- 🔐 **Secure Authentication** – User authentication with Clerk
- ☁️ **Cloud Storage** – Resumes saved to PostgreSQL via Prisma
- 📱 **Responsive Design** – Works on desktop and mobile devices

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | PostgreSQL (Neon) |
| **ORM** | Prisma |
| **Authentication** | Clerk |
| **AI** | OpenAI API |
| **File Storage** | Vercel Blob |
| **State Management** | Zustand |
| **Forms** | React Hook Form + Zod |
| **UI Components** | Radix UI |
| **Drag & Drop** | dnd-kit |

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
│   │   │       ├── actions.ts # Server actions
│   │   │       └── steps.ts   # Editor step configuration
│   │   ├── (main)/            # Main app pages
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   └── ResumePreview.tsx  # Live resume preview
│   ├── hooks/                 # Custom React hooks
│   └── lib/
│       ├── validation.ts      # Zod schemas
│       ├── types.ts           # TypeScript types
│       ├── prisma.ts          # Prisma client
│       └── openai.ts          # OpenAI client
└── public/                    # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database (or Neon account)

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
   
   Create a `.env` file with the following:
   ```env
   # Database
   POSTGRES_PRISMA_URL="your-pooled-connection-string"
   POSTGRES_URL_NON_POOLING="your-direct-connection-string"
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
   CLERK_SECRET_KEY="sk_..."
   
   # OpenAI (for AI features)
   OPENAI_API_KEY="sk-..."
   
   # Vercel Blob (for photo uploads)
   BLOB_READ_WRITE_TOKEN="..."
   ```

4. **Initialize the database**
   ```bash
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the app**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |

## 🗃️ Database Schema

The application uses the following main models:

- **Resume** – Core resume data with personal info and settings
- **WorkExperience** – Employment history entries
- **Education** – Education entries
- **Project** – Project showcase entries
- **Certification** – Professional certification entries

## 🧪 Testing

The project includes Jest tests for validation schemas:

```bash
npm test
```

## 🚢 Deployment

The app is optimized for deployment on **Vercel**:

1. Push your code to GitHub
2. Connect the repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The `postbuild` script automatically runs database migrations on deployment.

## 📝 License

This project is private and not licensed for public use.

## 👤 Author

**BOMMIDI DEVESHWAR**

---
