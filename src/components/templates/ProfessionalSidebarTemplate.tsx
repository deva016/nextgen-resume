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

interface ProfessionalSidebarTemplateProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
}

const DARK_BLUE = "#1e3a5f";

export default function ProfessionalSidebarTemplate({
  resumeData,
  contentRef,
}: ProfessionalSidebarTemplateProps) {
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
      style={{ fontSize: "10px", lineHeight: "1.4", fontFamily: "Arial, sans-serif" }}
    >
      {/* Left Sidebar - Dark Blue */}
      <div className="w-2/5 p-6 text-white" style={{ backgroundColor: DARK_BLUE }}>
        {/* Profile Photo Placeholder */}
        <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center overflow-hidden relative">
          {resumeData.photo ? (
            <img
              src={typeof resumeData.photo === "string" ? resumeData.photo : URL.createObjectURL(resumeData.photo)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold">
              {firstName?.[0]}
              {lastName?.[0]}
            </span>
          )}
        </div>

        {/* Contact */}
        <section className="mb-6">
          <SidebarTitle>CONTACT</SidebarTitle>
          <div className="space-y-2 text-xs">
            {phone && (
              <div className="flex items-start gap-2">
                <span>📞</span>
                <span>{phone}</span>
              </div>
            )}
            {email && (
              <div className="flex items-start gap-2">
                <span>✉</span>
                <span className="break-all">{email}</span>
              </div>
            )}
            {location && (
              <div className="flex items-start gap-2">
                <span>📍</span>
                <span>{location}</span>
              </div>
            )}
          </div>
        </section>

        {/* Education */}
        {educations && educations.length > 0 && (
          <section className="mb-6">
            <SidebarTitle>EDUCATION</SidebarTitle>
            {educations.map((edu, index) => (
              <div key={index} className="mb-3 text-xs">
                <p className="font-bold">{formatDateString(edu.startDate, "yyyy")} - {edu.endDate ? formatDateString(edu.endDate, "yyyy") : "Present"}</p>
                <p className="font-semibold uppercase text-white mt-1">{edu.school}</p>
                <p className="italic mt-0.5">{edu.degree}</p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills && (
          <section className="mb-6">
            <SidebarTitle>SKILLS</SidebarTitle>
            <div className="space-y-1 text-xs">
              {extractSkills(skills).map((skill, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span>•</span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages  */}
        {languages && (
          <section>
            <SidebarTitle>LANGUAGES</SidebarTitle>
            <div className="text-xs">
              <RenderHtml html={languages} className="text-white" />
            </div>
          </section>
        )}
      </div>

      {/* Right Content Area */}
      <div className="w-3/5 p-6 bg-white">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold uppercase" style={{ color: DARK_BLUE }}>
            {firstName} {lastName}
          </h1>
          {jobTitle && (
            <p className="text-sm font-medium mt-1 uppercase" style={{ color: "#6b7280" }}>
              {jobTitle}
            </p>
          )}
        </div>

        {/* Profile */}
        {summary && (
          <section className="mb-4">
            <SectionTitle>PROFILE</SectionTitle>
            <div className="text-xs">
              <RenderHtml html={summary} />
            </div>
          </section>
        )}

        {/* Work Experience */}
        {workExperiences && workExperiences.length > 0 && (
          <section className="mb-4">
            <SectionTitle>WORK EXPERIENCE</SectionTitle>
            {workExperiences.map((exp, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-bold text-xs">{exp.company}</h3>
                  <span className="text-xs font-medium" style={{ color: DARK_BLUE }}>
                    {formatDateString(exp.startDate, "yyyy")} - {exp.endDate ? formatDateString(exp.endDate, "yyyy") : "PRESENT"}
                  </span>
                </div>
                <p className="text-xs italic mb-1" style={{ color: "#6b7280" }}>
                  {exp.position}
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

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-4">
            <SectionTitle>PROJECTS</SectionTitle>
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

        {/* Strengths */}
        {strengths && (
          <section className="mb-4">
            <SectionTitle>STRENGTHS</SectionTitle>
            <div className="text-xs">
              <RenderHtml html={strengths} />
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section>
            <SectionTitle>CERTIFICATIONS</SectionTitle>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index} className="text-xs">
                  <p className="font-bold">{cert.name}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold mb-3 pb-1 border-b border-white/30">
      {children}
    </h2>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-sm font-bold uppercase mb-2 pb-1 border-b"
      style={{ color: DARK_BLUE, borderColor: "#d1d5db" }}
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
    .filter((s) => s.length > 0 && s.length < 30);
}
