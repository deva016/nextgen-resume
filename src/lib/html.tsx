import DOMPurify from "dompurify";

/**
 * Sanitize HTML content to prevent XSS attacks
 * Allows only safe HTML tags and attributes
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === "undefined") {
    // Server-side: return as-is (will be sanitized on client)
    return html;
  }

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "h1",
      "h2",
      "h3",
      "ul",
      "ol",
      "li",
      "a",
    ],
    ALLOWED_ATTR: ["href", "target", "rel"],
    ALLOW_DATA_ATTR: false,
  });
}

/**
 * Component props for rendering HTML content
 */
interface RenderHtmlProps {
  html: string;
  className?: string;
}

/**
 * Safely render HTML content with sanitization
 */
export function RenderHtml({ html, className }: RenderHtmlProps) {
  const sanitizedHtml = sanitizeHtml(html);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
