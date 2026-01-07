import { ResumeValues } from "@/lib/validation";
import { format } from "date-fns";
import React from "react";
import { RenderHtml } from "@/lib/html";

const formatDateString = (dateString: string | undefined, formatStr: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return format(date, formatStr);
};

interface ModernProfessionalTemplateProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
}

const BLUE_COLOR = "#2563eb";

export default function ModernProfessionalTemplate({
  resumeData,
  contentRef,
}: ModernProfessionalTemplateProps) {
  const {
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    summary,
    skills,
    workExperiences,
    educations,
    certifications,
  } = resumeData;

  const location = [city, country].filter(Boolean).join(", ");

  return (
    <div
      ref={contentRef}
      id="resumePreviewContent"
      className="space-y-3 p-6"
      style={{ fontSize: "10px", lineHeight: "1.3", fontFamily: "Arial, sans-serif" }}
    >
      {/* Header */}
      <div className="border-b pb-3" style={{ borderColor: "#e5e7eb" }}>
        <h1 className="text-2xl font-bold uppercase" style={{ color: "#1f2937" }}>
          {firstName} {lastName}
        </h1>
        {jobTitle && (
          <p className="text-sm font-medium mt-1" style={{ color: BLUE_COLOR }}>
            {jobTitle}
          </p>
        )}
        <div className="flex flex-wrap gap-3 mt-2 text-xs" style={{ color: "#6b7280" }}>
          {email && <span>✉ {email}</span>}
          {phone && <span>📞 {phone}</span>}
          {location && <span>📍 {location}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {summary && (
        <Section title="Professional Summary">
          <RenderHtml html={summary} />
        </Section>
      )}

      {/* Work Experience */}
      {workExperiences && workExperiences.length > 0 && (
        <Section title="Professional Experience">
          {workExperiences.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-bold">{exp.position}</h3>
                <span className="text-xs" style={{ color: BLUE_COLOR }}>
                  {formatDateString(exp.startDate, "MMM yyyy")} -{" "}
                  {exp.endDate ? formatDateString(exp.endDate, "MMM yyyy") : "Present"}
                </span>
              </div>
              <p className="text-xs italic mb-1" style={{ color: "#6b7280" }}>
                {exp.company}
              </p>
              {exp.description && (
                <div className="text-xs mt-1">
                  <RenderHtml html={exp.description} />
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {skills && (
        <Section title="Skills">
          <div className="flex flex-wrap gap-1.5">
            {extractSkills(skills).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-0.5 rounded text-xs"
                style={{ backgroundColor: BLUE_COLOR, color: "white" }}
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Education */}
      {educations && educations.length > 0 && (
        <Section title="Education">
          {educations.map((edu, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-bold">{edu.degree}</h3>
              <p className="text-xs" style={{ color: "#6b7280" }}>
                {edu.school}
              </p>
              {edu.startDate && (
                <p className="text-xs" style={{ color: BLUE_COLOR }}>
                  {formatDateString(edu.startDate, "yyyy")} -{" "}
                  {edu.endDate ? formatDateString(edu.endDate, "yyyy") : "Present"}
                </p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <Section title="Certifications">
          <div className="grid grid-cols-2 gap-2">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-start gap-1">
                <span style={{ color: BLUE_COLOR }}>🏆</span>
                <span className="text-xs">{cert.name}</span>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

// Helper component for sections
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <h2
        className="text-sm font-bold uppercase pb-1 mb-2 border-b"
        style={{ color: "#1f2937", borderColor: "#e5e7eb" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

// Helper to extract skills from HTML
function extractSkills(skillsHtml: string): string[] {
  const temp = document.createElement("div");
  temp.innerHTML = skillsHtml;
  const text = temp.textContent || "";
  return text
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && s.length < 30);
}
