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

interface SidebarTemplateProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
}

export default function SidebarTemplate({
  resumeData,
  contentRef,
}: SidebarTemplateProps) {
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
    languages,
    workExperiences,
    educations,
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
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-100 p-4" style={{ backgroundColor: "#f3f4f6" }}>
        {/* Contact */}
        <section className="mb-4">
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

        {/* Skills */}
        {skills && (
          <section className="mb-4">
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

        {/* Languages */}
        {languages && (
          <section className="mb-4">
            <SidebarTitle>LANGUAGES</SidebarTitle>
            <div className="text-xs">
              <RenderHtml html={languages} />
            </div>
          </section>
        )}

        {/* Certifications if available */}
        {certifications && certifications.length > 0 && (
          <section>
            <SidebarTitle>REFERENCE</SidebarTitle>
            <div className="text-xs space-y-2">
              {certifications.slice(0, 1).map((cert, index) => (
                <div key={index}>
                  <p className="font-bold">{cert.name}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Right Content Area */}
      <div className="w-2/3 p-6">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold uppercase">
            {firstName} {lastName}
          </h1>
          {jobTitle && (
            <p className="text-sm font-medium mt-1" style={{ color: "#6b7280" }}>
              {jobTitle}
            </p>
          )}
        </div>

        {/* Profile */}
        {summary && (
          <section className="mb-4">
            <SectionTitle icon="●">PROFILE</SectionTitle>
            <div className="text-xs">
              <RenderHtml html={summary} />
            </div>
          </section>
        )}

        {/* Work Experience */}
        {workExperiences && workExperiences.length > 0 && (
          <section className="mb-4">
            <SectionTitle icon="●">WORK EXPERIENCE</SectionTitle>
            {workExperiences.map((exp, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-bold text-xs">{exp.company}</h3>
                  <span className="text-xs" style={{ color: "#6b7280" }}>
                    {formatDateString(exp.startDate, "yyyy")} - {exp.endDate ? formatDateString(exp.endDate, "yyyy") : "PRESENT"}
                  </span>
                </div>
                <p className="text-xs italic mb-1">{exp.position}</p>
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
          <section>
            <SectionTitle icon="●">EDUCATION</SectionTitle>
            {educations.map((edu, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-bold text-xs">{edu.degree}</h3>
                <p className="text-xs" style={{ color: "#6b7280" }}>
                  {edu.school}
                </p>
                {edu.startDate && (
                  <p className="text-xs">
                    {formatDateString(edu.startDate, "MMM yyyy")} -{" "}
                    {edu.endDate ? formatDateString(edu.endDate, "MMM yyyy") : "Present"}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold mb-2 pb-1 border-b border-gray-300">
      {children}
    </h2>
  );
}

function SectionTitle({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold mb-2 flex items-center gap-2">
      <span style={{ color: "#1f2937" }}>{icon}</span>
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
