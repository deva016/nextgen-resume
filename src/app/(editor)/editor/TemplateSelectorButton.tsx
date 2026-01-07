import { Button } from "@/components/ui/button";
import { FileText, LayoutTemplate } from "lucide-react";

export const Templates = {
  MODERN: "modern",
  PROFESSIONAL: "professional",
  MODERN_PROFESSIONAL: "modern_professional",
  CREATIVE_GRADIENT: "creative_gradient",
  EXECUTIVE: "executive",
  MODERN_MINIMAL: "modern_minimal",
  SIDEBAR: "sidebar",
  PROFESSIONAL_SIDEBAR: "professional_sidebar",
};

const templates = Object.values(Templates);

const templateLabels: Record<string, string> = {
  modern: "Modern",
  professional: "Professional",
  modern_professional: "Modern Pro",
  creative_gradient: "Creative",
  executive: "Executive",
  modern_minimal: "Minimal",
  sidebar: "Sidebar",
  professional_sidebar: "Pro Sidebar",
};

interface TemplateSelectorButtonProps {
  template: string | undefined;
  onChange: (template: string) => void;
}

export default function TemplateSelectorButton({
  template,
  onChange,
}: TemplateSelectorButtonProps) {
  function handleClick() {
    const currentIndex = template ? templates.indexOf(template) : 0;
    const nextIndex = (currentIndex + 1) % templates.length;
    onChange(templates[nextIndex]);
  }

  const currentTemplate = template || Templates.MODERN;
  const Icon = currentTemplate === Templates.PROFESSIONAL ? FileText : LayoutTemplate;

  return (
    <Button
      variant="outline"
      size="icon"
      title={`Template: ${templateLabels[currentTemplate]} (click to change)`}
      onClick={handleClick}
      className="relative"
    >
      <Icon className="size-5" />
      <span className="sr-only">
        Current: {templateLabels[currentTemplate]}. Click to switch template.
      </span>
    </Button>
  );
}
