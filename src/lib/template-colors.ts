/**
 * Template Color Schemes Configuration
 * Define default and customizable colors for each template
 */

export interface TemplateColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
}

export const templateColorSchemes: Record<string, TemplateColorScheme> = {
  modern: {
    primary: "#8b5cf6", // Purple
    secondary: "#a78bfa",
    accent: "#c4b5fd",
    text: "#1f2937",
    background: "#ffffff",
  },
  professional: {
    primary: "#008b8b", // Teal
    secondary: "#20b2aa",
    accent: "#48d1cc",
    text: "#1f2937",
    background: "#ffffff",
  },
  modern_professional: {
    primary: "#2563eb", // Blue
    secondary: "#3b82f6",
    accent: "#60a5fa",
    text: "#1f2937",
    background: "#ffffff",
  },
  creative_gradient: {
    primary: "#764ba2", // Purple Gradient
    secondary: "#667eea",
    accent: "#f093fb",
    text: "#ffffff",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
  },
  executive: {
    primary: "#1f2937", // Dark Gray
    secondary: "#374151",
    accent: "#4b5563",
    text: "#1f2937",
    background: "#ffffff",
  },
  modern_minimal: {
    primary: "#3b82f6", // Blue
    secondary: "#60a5fa",
    accent: "#93c5fd",
    text: "#1f2937",
    background: "#ffffff",
  },
  sidebar: {
    primary: "#6b7280", // Gray
    secondary: "#9ca3af",
    accent: "#d1d5db",
    text: "#1f2937",
    background: "#f3f4f6",
  },
  professional_sidebar: {
    primary: "#1e3a5f", // Dark Blue
    secondary: "#2c5282",
    accent: "#4299e1",
    text: "#ffffff",
    background: "#1e3a5f",
  },
};

/**
 * Get color scheme for a template
 */
export function getTemplateColorScheme(
  template: string | undefined
): TemplateColorScheme {
  if (!template) {
    return templateColorSchemes.modern;
  }
  return templateColorSchemes[template] || templateColorSchemes.modern;
}

/**
 * Apply custom color to template scheme
 */
export function applyCustomColor(
  template: string | undefined,
  customColor: string
): TemplateColorScheme {
  const baseScheme = getTemplateColorScheme(template);
  
  // If template has custom color support, apply it
  return {
    ...baseScheme,
    primary: customColor,
    // Generate lighter and darker shades
    secondary: lightenColor(customColor, 20),
    accent: lightenColor(customColor, 40),
  };
}

/**
 * Lighten a hex color by percentage
 */
function lightenColor(hex: string, percent: number): string {
  // Remove # if present
  hex = hex.replace("#", "");
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Lighten
  const newR = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
  const newG = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
  const newB = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
  
  // Convert back to hex
  return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
}

/**
 * Get all available color presets for a template
 */
export function getTemplateColorPresets(template: string | undefined): string[] {
  // Common professional colors
  const commonColors = [
    "#2563eb", // Blue
    "#8b5cf6", // Purple
    "#059669", // Green
    "#dc2626", // Red
    "#ea580c", // Orange
    "#0891b2", // Cyan
    "#4f46e5", // Indigo
    "#be123c", // Rose
  ];
  
  // Add template's default primary color
  const templateScheme = getTemplateColorScheme(template);
  return [templateScheme.primary, ...commonColors.filter(c => c !== templateScheme.primary)];
}
