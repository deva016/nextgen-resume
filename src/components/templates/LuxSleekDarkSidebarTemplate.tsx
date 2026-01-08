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

interface LuxSleekDarkSidebarTemplateProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
}

const SIDEBAR_COLOR = "#2c4058"; // Dark blue-gray
const ACCENT_COLOR = "#5b8fc4";

export default function LuxSleekDarkSidebarTemplate({
  resumeData,
  contentRef,
}: LuxSleekDarkSidebarTemplateProps) {
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
      style={{ fontSize: "9px", lineHeight: "1.35", fontFamily: "sans-serif" }}
    >
      {/* LEFT SIDEBAR - Dark */}
      <div
        className="w-1/3 p-4 text-white"
        style={{ backgroundColor: SIDEBAR_COLOR }}
      >
        {/* Name */}
        <div className="mb-4">
          <div className="text-base font-bold">{firstName}</div>
          <div className="text-base font-bold">{lastName}</div>
          {jobTitle && <div className="text-xs mt-1 opacity-90">{jobTitle}</div>}
        </div>

        {/* Profile/Summary */}
        {summary && (
          <div className="mb-4">
            <SidebarTitle>Profile</SidebarTitle>
            <div className="text-xs opacity-90">
              <RenderHtml html={summary} />
            </div>
          </div>
        )}

        {/* Contact */}
        <div className="mb-4">
          <SidebarTitle>Contact</SidebarTitle>
          <div className="text-xs space-y-1 opacity-90">
            {email && <div>✉ {email}</div>}
            {phone && <div>☎ {phone}</div>}
            {location && <div>📍 {location}</div>}
          </div>
        </div>

        {/* Skills */}
        {skills && (
          <div className="mb-4">
            <SidebarTitle>Skills</SidebarTitle>
            <div className="text-xs opacity-90">
              <RenderHtml html={skills} />
            </div>
          </div>
        )}

        {/* Languages */}
        {languages && (
          <div className="mb-4">
            <SidebarTitle>Languages</SidebarTitle>
            <div className="text-xs opacity-90">
              <RenderHtml html={languages} />
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div>
            <SidebarTitle>Certifications</SidebarTitle>
            <div className="space-y-1">
              {certifications.map((cert, index) => (
                <div key={index} className="text-xs opacity-90">
                  • {cert.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT CONTENT - White */}
      <div className="w-2/3 p-5">
        {/* Experience */}
        {workExperiences && workExperiences.length > 0 && (
          <div className="mb-4">
            <MainTitle>Experience</MainTitle>
            {workExperiences.map((exp, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between">
                  <div className="font-bold text-xs">{exp.position}</div>
                  <div className="text-xs font-semibold" style={{ color: ACCENT_COLOR }}>
                    {formatDateString(exp.startDate, "yyyy")} –{" "}
                    {exp.endDate ? formatDateString(exp.endDate, "yyyy") : "Present"}
                  </div>
                </div>
                <div className="text-xs italic mb-1">{exp.company}</div>
                {exp.description && (
                  <div className="text-xs">
                    <RenderHtml html={exp.description} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="mb-4">
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

        {/* Education */}
        {educations && educations.length > 0 && (
          <div className="mb-4">
            <MainTitle>Education</MainTitle>
            {educations.map((edu, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between">
                  <div className="font-bold text-xs">{edu.degree}</div>
                  <div className="text-xs" style={{ color: ACCENT_COLOR }}>
                    {edu.startDate && (
                      <>
                        {formatDateString(edu.startDate, "yyyy")} –{" "}
                        {edu.endDate ? formatDateString(edu.endDate, "yyyy") : "Present"}
                      </>
                    )}
                  </div>
                </div>
                <div className="text-xs italic">{edu.school}</div>
              </div>
            ))}
          </div>
        )}

        {/* Strengths */}
        {strengths && (
          <div>
            <MainTitle>Additional Strengths</MainTitle>
            <div className="text-xs">
              <RenderHtml html={strengths} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-xs font-bold uppercase mb-2 pb-1"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.3)" }}
    >
      {children}
    </h3>
  );
}

function MainTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-sm font-bold uppercase mb-2 pb-1"
      style={{ borderBottom: `2px solid ${ACCENT_COLOR}`, color: ACCENT_COLOR }}
    >
      {children}
    </h2>
  );
}
