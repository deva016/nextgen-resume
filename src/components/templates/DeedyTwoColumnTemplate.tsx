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

interface DeedyTwoColumnTemplateProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
}

const ACCENT_COLOR = "#2563eb"; // Blue accent

export default function DeedyTwoColumnTemplate({
  resumeData,
  contentRef,
}: DeedyTwoColumnTemplateProps) {
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
      className="flex"
      style={{ fontSize: "9px", lineHeight: "1.3", fontFamily: "Arial, sans-serif" }}
    >
      {/* LEFT COLUMN - 33% */}
      <div className="w-1/3 pr-3" style={{ borderRight: "1px solid #e5e7eb" }}>
        {/* Header */}
        <div className="mb-4 pb-2" style={{ borderBottom: `2px solid ${ACCENT_COLOR}` }}>
          <h1 className="text-xl font-bold uppercase" style={{ color: "#1f2937" }}>
            {firstName}
          </h1>
          <h1 className="text-xl font-bold uppercase" style={{ color: "#1f2937" }}>
            {lastName}
          </h1>
          {jobTitle && (
            <p className="text-xs mt-1" style={{ color: "#6b7280" }}>
              {jobTitle}
            </p>
          )}
          <div className="text-xs mt-1" style={{ color: "#6b7280" }}>
            {email && <div>{email}</div>}
            {phone && <div>{phone}</div>}
          </div>
        </div>

        {/* Summary/Objective */}
        {summary && (
          <div className="mb-3">
            <SidebarTitle>Objective</SidebarTitle>
            <div className="text-xs">
              <RenderHtml html={summary} />
            </div>
          </div>
        )}

        {/* Education */}
        {educations && educations.length > 0 && (
          <div className="mb-3">
            <SidebarTitle>Education</SidebarTitle>
            {educations.map((edu, index) => (
              <div key={index} className="mb-2">
                <div className="font-bold text-xs">{edu.school}</div>
                <div className="text-xs italic">{edu.degree}</div>
                {edu.startDate && (
                  <div className="text-xs" style={{ color: "#6b7280" }}>
                    {formatDateString(edu.startDate, "MMM yyyy")} -{" "}
                    {edu.endDate ? formatDateString(edu.endDate, "MMM yyyy") : "Present"}
                  </div>
                )}
                {location && (
                  <div className="text-xs" style={{ color: "#6b7280" }}>
                    {location}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills && (
          <div className="mb-3">
            <SidebarTitle>Skills</SidebarTitle>
            <div className="text-xs">
              <RenderHtml html={skills} />
            </div>
          </div>
        )}

        {/* Languages */}
        {languages && (
          <div className="mb-3">
            <SidebarTitle>Languages</SidebarTitle>
            <div className="text-xs">
              <RenderHtml html={languages} />
            </div>
          </div>
        )}

        {/* Strengths */}
        {strengths && (
          <div className="mb-3">
            <SidebarTitle>Strengths</SidebarTitle>
            <div className="text-xs">
              <RenderHtml html={strengths} />
            </div>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN - 66% */}
      <div className="w-2/3 pl-3">
        {/* Work Experience */}
        {workExperiences && workExperiences.length > 0 && (
          <div className="mb-3">
            <MainTitle>Experience</MainTitle>
            {workExperiences.map((exp, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between">
                  <div>
                    <span className="font-bold text-xs" style={{ textTransform: "uppercase" }}>
                      {exp.company}
                    </span>
                    {exp.position && (
                      <>
                        <span className="mx-1">|</span>
                        <span className="text-xs italic">{exp.position}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-xs" style={{ color: "#6b7280" }}>
                  {formatDateString(exp.startDate, "MMM yyyy")} –{" "}
                  {exp.endDate ? formatDateString(exp.endDate, "MMM yyyy") : "Present"}
                </div>
                {exp.description && (
                  <div className="text-xs mt-1">
                    <RenderHtml html={exp.description} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="mb-3">
            <MainTitle>Projects</MainTitle>
            {projects.map((project, index) => (
              <div key={index} className="mb-2">
                <div className="font-bold text-xs">{project.name}</div>
                {project.description && (
                  <div className="text-xs mt-0.5">
                    <RenderHtml html={project.description} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div>
            <MainTitle>Certifications</MainTitle>
            {certifications.map((cert, index) => (
              <div key={index} className="mb-1">
                <div className="text-xs font-bold">{cert.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xs font-bold uppercase mb-1 pb-0.5"
      style={{ borderBottom: `1.5px solid ${ACCENT_COLOR}`, color: "#1f2937" }}
    >
      {children}
    </h2>
  );
}

function MainTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-sm font-bold uppercase mb-2 pb-0.5"
      style={{ borderBottom: `2px solid ${ACCENT_COLOR}`, color: "#1f2937" }}
    >
      {children}
    </h2>
  );
}
