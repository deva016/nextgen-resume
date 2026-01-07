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

interface ExecutiveTemplateProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
}

export default function ExecutiveTemplate({
  resumeData,
  contentRef,
}: ExecutiveTemplateProps) {
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
      className="p-6"
      style={{ fontSize: "10px", lineHeight: "1.4", fontFamily: "Georgia, serif" }}
    >
      {/* Header */}
      <div className="text-center border-b-2 pb-4 mb-4" style={{ borderColor: "#1f2937" }}>
        <h1 className="text-3xl font-bold uppercase tracking-wide">
          {firstName} {lastName}
        </h1>
        {jobTitle && (
          <p className="text-sm mt-2 font-medium" style={{ color: "#4b5563" }}>
            {jobTitle}
          </p>
        )}
        <div className="flex justify-center flex-wrap gap-4 mt-3 text-xs" style={{ color: "#6b7280" }}>
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
          {location && <span>{location}</span>}
        </div>
      </div>

      {/* Executive Summary */}
      {summary && (
        <section className="mb-4">
          <SectionTitle>EXECUTIVE SUMMARY</SectionTitle>
          <div className="text-xs">
            <RenderHtml html={summary} />
          </div>
        </section>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Experience & Education */}
        <div className="col-span-2">
          {/* Professional Experience */}
          {workExperiences && workExperiences.length > 0 && (
            <section className="mb-4">
              <SectionTitle>PROFESSIONAL EXPERIENCE</SectionTitle>
              {workExperiences.map((exp, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between font-bold text-xs">
                    <span>{exp.company}</span>
                    <span>{formatDateString(exp.startDate, "yyyy")} - {exp.endDate ? formatDateString(exp.endDate, "yyyy") : "Present"}</span>
                  </div>
                  <p className="text-xs italic mb-1">{exp.position}</p>
                  {exp.description && (
                    <div className="text-xs mt-1">
                      <RenderHtml html={exp.description} />
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {educations && educations.length > 0 && (
            <section>
              <SectionTitle>EDUCATION</SectionTitle>
              {educations.map((edu, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-bold text-xs">{edu.degree}</h3>
                  <p className="text-xs" style={{ color: "#6b7280" }}>
                    {edu.school}
                  </p>
                  {edu.startDate && (
                    <p className="text-xs">
                      {formatDateString(edu.startDate, "yyyy")} -{" "}
                      {edu.endDate ? formatDateString(edu.endDate, "yyyy") : "Present"}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column - Core Competencies */}
        <div>
          <SectionTitle>CORE COMPETENCIES</SectionTitle>
          <div className="space-y-2">
            {skills && (
              <div className="text-xs">
                {extractSkills(skills).map((skill, index) => (
                  <div key={index} className="flex items-start gap-2 mb-1">
                    <span>•</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            )}
            {strengths && (
              <div className="text-xs mt-2">
                <RenderHtml html={strengths} />
              </div>
            )}
            {languages && (
              <div className="text-xs mt-3">
                <div className="font-bold mb-1">LANGUAGES</div>
                <RenderHtml html={languages} />
              </div>
            )}
            {certifications && certifications.length > 0 && (
              <div className="mt-3">
                <div className="font-bold text-xs mb-1">CERTIFICATIONS</div>
                {certifications.map((cert, index) => (
                  <div key={index} className="text-xs mb-1">
                    • {cert.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Projects Section (Full Width Below) */}
      {projects && projects.length > 0 && (
        <section className="mt-4">
          <SectionTitle>NOTABLE PROJECTS</SectionTitle>
          {projects.map((project, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-bold text-xs">{project.name}</h3>
              {project.description && (
                <div className="text-xs mt-0.5">
                  <RenderHtml html={project.description} />
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-sm font-bold uppercase tracking-wide pb-1 mb-2 border-b"
      style={{ color: "#1f2937", borderColor: "#d1d5db" }}
    >
      {children}
    </h2>
  );
}

function extractSkills(skillsHtml: string): string[] {
  const temp = document.createElement("div");
  temp.innerHTML = skillsHtml;
  const text = temp.textContent || "";
  return text
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && s.length < 40);
}
