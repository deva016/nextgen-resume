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

interface TemplateGalleryProps {
  currentTemplate: string | undefined;
  onSelectTemplate: (template: string) => void;
}

const templatePreviews = [
  {
    id: Templates.MODERN,
    name: "Modern",
    description: "Clean and contemporary design with badges",
    preview: "/templates/modern-preview.svg",
    color: "#8b5cf6", // Purple
  },
  {
    id: Templates.PROFESSIONAL,
    name: "Professional",
    description: "Classic professional layout with teal accents",
    preview: "/templates/professional-preview.svg",
    color: "#008b8b", // Teal
  },
  {
    id: Templates.MODERN_PROFESSIONAL,
    name: "Modern Professional",
    description: "Blue accents with skill badges and clean sections",
    preview: "/templates/modern-pro-preview.svg",
    color: "#2563eb", // Blue
  },
  {
    id: Templates.CREATIVE_GRADIENT,
    name: "Creative Gradient",
    description: "Vibrant gradient sidebar perfect for creative roles",
    preview: "/templates/creative-preview.svg",
    color: "#764ba2", // Purple gradient
  },
  {
    id: Templates.EXECUTIVE,
    name: "Executive",
    description: "Traditional two-column layout for senior professionals",
    preview: "/templates/executive-preview.svg",
    color: "#1f2937", // Dark gray
  },
  {
    id: Templates.MODERN_MINIMAL,
    name: "Modern Minimal",
    description: "Minimalist design with ample whitespace",
    preview: "/templates/minimal-preview.svg",
    color: "#3b82f6", // Blue
  },
  {
    id: Templates.SIDEBAR,
    name: "Sidebar",
    description: "Left sidebar for contact and skills",
    preview: "/templates/sidebar-preview.svg",
    color: "#6b7280", // Gray
  },
  {
    id: Templates.PROFESSIONAL_SIDEBAR,
    name: "Professional Sidebar",
    description: "Dark blue sidebar with professional styling",
    preview: "/templates/pro-sidebar-preview.svg",
    color: "#1e3a5f", // Dark blue
  },
];

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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose a Resume Template</DialogTitle>
          <DialogDescription>
            Select from our collection of professional resume templates. You can switch templates anytime.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {templatePreviews.map((template) => {
            const isSelected = currentTemplate === template.id;

            return (
              <button
                key={template.id}
                onClick={() => handleSelectTemplate(template.id)}
                className={`
                  group relative rounded-lg border-2 p-3 text-left transition-all
                  hover:scale-105 hover:shadow-lg
                  ${
                    isSelected
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20"
                      : "border-gray-200 hover:border-purple-300 dark:border-gray-700 dark:hover:border-purple-700"
                  }
                `}
              >
                {/* Preview Image Placeholder */}
                <div
                  className="w-full aspect-[210/297] rounded-md mb-3 flex items-center justify-center text-white font-bold text-4xl"
                  style={{
                    background: `linear-gradient(135deg, ${template.color} 0%, ${template.color}dd 100%)`,
                  }}
                >
                  {template.name[0]}
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
