"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LayoutTemplate } from "lucide-react";
import { useState } from "react";
import { Templates } from "./TemplateSelectorButton";
import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";

interface TemplateGalleryProps {
  currentTemplate: string | undefined;
  onSelectTemplate: (template: string) => void;
}

const templateInfo = [
  {
    id: Templates.MODERN,
    name: "Modern",
    description: "Clean and contemporary design with badges",
  },
  {
    id: Templates.PROFESSIONAL,
    name: "Professional",
    description: "Classic professional layout with teal accents",
  },
  {
    id: Templates.MODERN_PROFESSIONAL,
    name: "Modern Professional",
    description: "Blue accents with skill badges and clean sections",
  },
  {
    id: Templates.CREATIVE_GRADIENT,
    name: "Creative Gradient",
    description: "Vibrant gradient sidebar perfect for creative roles",
  },
  {
    id: Templates.EXECUTIVE,
    name: "Executive",
    description: "Traditional two-column layout for senior professionals",
  },
  {
    id: Templates.MODERN_MINIMAL,
    name: "Modern Minimal",
    description: "Minimalist design with ample whitespace",
  },
  {
    id: Templates.SIDEBAR,
    name: "Sidebar",
    description: "Left sidebar for contact and skills",
  },
  {
    id: Templates.PROFESSIONAL_SIDEBAR,
    name: "Professional Sidebar",
    description: "Dark blue sidebar with professional styling",
  },
];

// Sample resume data for previews
const sampleResumeData: ResumeValues = {
  firstName: "John",
  lastName: "Doe",
  jobTitle: "Software Engineer",
  city: "San Francisco",
  country: "USA",
  phone: "+1 234-567-8900",
  email: "john@example.com",
  summary: "<p>Experienced software engineer with 5+ years of expertise in full-stack development.</p>",
  skills: "<p>JavaScript, React, Node.js, Python, SQL</p>",
  workExperiences: [
    {
      position: "Senior Developer",
      company: "Tech Corp",
      startDate: "2020-01",
      description: "<ul><li>Led development of microservices architecture</li><li>Reduced deployment time by 40%</li></ul>",
    },
  ],
  educations: [
    {
      degree: "BS Computer Science",
      school: "University of Technology",
      startDate: "2015-09",
      endDate: "2019-05",
    },
  ],
  colorHex: "#8b5cf6",
  borderStyle: "squircle",
  template: "modern",
};

export default function TemplateGallery({
  currentTemplate,
  onSelectTemplate,
}: TemplateGalleryProps) {
  const [open, setOpen] = useState(false);

  const handleSelectTemplate = (templateId: string) => {
    onSelectTemplate(templateId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <LayoutTemplate className="size-4" />
          Choose Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose a Resume Template</DialogTitle>
          <DialogDescription>
            Select from our collection of professional resume templates. You can switch templates anytime.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {templateInfo.map((template) => {
            const isSelected = currentTemplate === template.id;

            return (
              <button
                key={template.id}
                onClick={() => handleSelectTemplate(template.id)}
                className={`
                  group relative rounded-lg border-2 p-2 text-left transition-all
                  hover:scale-105 hover:shadow-lg
                  ${
                    isSelected
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20"
                      : "border-gray-200 hover:border-purple-300 dark:border-gray-700 dark:hover:border-purple-700"
                  }
                `}
              >
                {/* Actual Template Preview */}
                <div className="w-full aspect-[210/297] rounded-md mb-2 overflow-hidden bg-white shadow-sm">
                  <div className="scale-[0.15] origin-top-left" style={{ width: "666%", height: "666%" }}>
                    <ResumePreview
                      resumeData={{ ...sampleResumeData, template: template.id }}
                      className="pointer-events-none"
                    />
                  </div>
                </div>

                {/* Template Info */}
                <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {template.description}
                </p>

                {/* Selected Badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                    ✓ Selected
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>All templates are ATS-friendly and print-optimized.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
