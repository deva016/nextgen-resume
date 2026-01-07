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
  firstName: "Jane",
  lastName: "Doe",
  jobTitle: "Senior Product Designer",
  city: "San Francisco",
  country: "CA",
  phone: "+1 (555) 123-4567",
  email: "jane.doe@example.com",
  // Using a placeholder image that is reliable
  photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
  summary: "<p>Creative and detail-oriented product designer with 8+ years of experience in building digital products. specialized in UI/UX and design systems.</p>",
  skills: `
    <p><strong>Design:</strong> Figma, Adobe XD, Sketch, Photoshop</p>
    <p><strong>Prototyping:</strong> Principle, Protopie, Framer</p>
    <p><strong>Code:</strong> HTML, CSS, JavaScript, React basics</p>
  `,
  languages: "<p>English (Native), Spanish (Fluent), French (Intermediate)</p>",
  workExperiences: [
    {
      position: "Senior UI/UX Designer",
      company: "TechFlow Inc.",
      startDate: "2021-03",
      description: "<ul><li>Spearheaded the redesign of the main product dashboard, increasing user engagement by 30%.</li><li>Established a comprehensive design system used across 4 different product lines.</li></ul>",
    },
    {
      position: "Product Designer",
      company: "Creative Studio",
      startDate: "2018-06",
      endDate: "2021-02",
      description: "<ul><li>Collaborated with cross-functional teams to deliver pixel-perfect designs.</li><li>Conducted user research and usability testing.</li></ul>",
    },
  ],
  educations: [
    {
      degree: "Bachelor of Fine Arts in Design",
      school: "California College of the Arts",
      startDate: "2014-09",
      endDate: "2018-05",
    },
  ],
  certifications: [
    {
      name: "Google UX Design Professional Certificate",
    }
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
                <div className="w-full aspect-[210/297] rounded-md mb-2 overflow-hidden bg-white shadow-sm relative">
                   <div 
                      className="origin-top-left" 
                      style={{ 
                        width: "400%", // 4x the card width (approx 800px to match A4 794px)
                        transform: "scale(0.25)", // Scale back down to fit
                      }}
                   >
                      <ResumePreview
                        resumeData={{ ...sampleResumeData, template: template.id }}
                        className="pointer-events-none shadow-none"
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
