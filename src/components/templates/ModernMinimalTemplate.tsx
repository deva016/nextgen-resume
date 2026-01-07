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

interface ModernMinimalTemplateProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
}

const BLUE_ACCENT = "#3b82f6";

export default function ModernMinimalTemplate({
  resumeData,
  contentRef,
}: ModernMinimalTemplateProps) {
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
    strengths,
    languages,
    workExperiences,
    educations,
    projects,
    certifications,
  } = resumeData;

  const location = [city, country].filter(Boolean).join(", ");

  return (
    <div
      ref={contentRef}
      id="resumePreviewContent"
      className="p-8"
      style={{ fontSize: "10px", lineHeight: "1.5", fontFamily: "Arial, sans-serif" }}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold uppercase" style={{ color: BLUE_ACCENT }}>
          {firstName} {lastName}
        </h1>
        {jobTitle && (
          <p className="text-base font-medium mt-1" style={{ color: "#1f2937" }}>
            {jobTitle}
          </p>
        )}
        <div className="flex gap-4 mt-2 text-xs" style={{ color: "#6b7280" }}>
          {location && <span>{location}</span>}
          {email && <span>| {email}</span>}
          {phone && <span>| {phone}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section className="mb-4">
          <SectionTitle>SUMMARY</SectionTitle>
          <div className="text-xs">
            <RenderHtml html={summary} />
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {skills && (
        <section className="mb-4">
          <SectionTitle>TECHNICAL SKILLS</SectionTitle>
          <div className="grid grid-cols-3 gap-x-4 gap-y-1 text-xs">
            {extractSkillsGrouped(skills).map((group, index) => (
              <div key={index}>
                <span className="font-medium">{group.category}:</span>{" "}
                <span style={{ color: "#6b7280" }}>{group.items.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {workExperiences && workExperiences.length > 0 && (
        <section className="mb-4">
          <SectionTitle>PROFESSIONAL EXPERIENCE</SectionTitle>
          {workExperiences.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-bold text-xs">{exp.position}</h3>
                <span className="text-xs" style={{ color: "#6b7280" }}>
                  {formatDateString(exp.startDate, "MMM yyyy")} - {exp.endDate ? formatDateString(exp.endDate, "MMM yyyy") : "Present"}
                </span>
              </div>
              <p className="text-xs italic mb-1" style={{ color: "#6b7280" }}>
                {exp.company}
              </p>
              {exp.description && (
                <div className="text-xs">
                  <RenderHtml html={exp.description} />
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {educations && educations.length > 0 && (
        <section className="mb-4">
          <SectionTitle>EDUCATION</SectionTitle>
          {educations.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <h3 className="font-bold text-xs">{edu.degree}</h3>
                {edu.startDate && (
                  <span className="text-xs" style={{ color: "#6b7280" }}>
                    {formatDateString(edu.startDate, "MMM yyyy")} - {edu.endDate ? formatDateString(edu.endDate, "MMM yyyy") : "Present"}
                  </span>
                )}
              </div>
              <p className="text-xs" style={{ color: "#6b7280" }}>{edu.school}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects (if any) */}
      {projects && projects.length > 0 && (
        <section className="mb-4">
          <SectionTitle>ADDITIONAL INFORMATION</SectionTitle>
          {projects.map((project, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-bold text-xs">{project.name}</h3>
              {project.description && (
                <div className="text-xs" style={{ color: "#6b7280" }}>
                  <RenderHtml html={project.description} />
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-4">
          <SectionTitle>CERTIFICATIONS</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            {certifications.map((cert, index) => (
              <div key={index} className="text-xs">
                • {cert.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Strengths */}
      {strengths && (
        <section className="mb-4">
          <SectionTitle>STRENGTHS</SectionTitle>
          <div className="text-xs">
            <RenderHtml html={strengths} />
          </div>
        </section>
      )}

      {/* Languages */}
      {languages && (
        <section>
          <SectionTitle>LANGUAGES</SectionTitle>
          <div className="text-xs">
            <RenderHtml html={languages} />
          </div>
        </section>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b"
      style={{ color: BLUE_ACCENT, borderColor: BLUE_ACCENT }}
    >
      {children}
    </h2>
  );
}

function extractSkillsGrouped(skillsHtml: string): Array<{ category: string; items: string[] }> {
  const temp = document.createElement("div");
  temp.innerHTML = skillsHtml;
  const text = temp.textContent || "";
  const skills = text
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  // Group into categories dynamically (max 3 columns)
  const groups = [];
  const categories = ["Technical Skills", "Design Skills", "Professional Skills"];
  const itemsPerGroup = Math.ceil(skills.length / 3);
  
  for (let i = 0; i < 3; i++) {
    const startIdx = i * itemsPerGroup;
    const endIdx = (i + 1) * itemsPerGroup;
    const groupSkills = skills.slice(startIdx, endIdx);
    
    if (groupSkills.length > 0) {
      groups.push({
        category: categories[i],
        items: groupSkills,
      });
    }
  }

  return groups;
}
