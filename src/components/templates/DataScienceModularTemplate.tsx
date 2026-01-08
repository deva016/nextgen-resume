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

interface DataScienceModularTemplateProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
}

const PRIMARY_COLOR = "#0066cc";

export default function DataScienceModularTemplate({
  resumeData,
  contentRef,
}: DataScienceModularTemplateProps) {
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
      style={{ fontSize: "10px", lineHeight: "1.4", fontFamily: "Helvetica, Arial, sans-serif" }}
    >
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold" style={{ color: PRIMARY_COLOR }}>
          {firstName} {lastName}
        </h1>
        {jobTitle && (
          <div className="text-sm font-semibold mt-1" style={{ color: "#555" }}>
            {jobTitle}
          </div>
        )}
        <div className="text-xs mt-2" style={{ color: "#666" }}>
          {location && <span>{location}</span>}
          {email && location && <span className="mx-2">•</span>}
          {email && <span>{email}</span>}
          {phone && (email || location) && <span className="mx-2">•</span>}
          {phone && <span>{phone}</span>}
        </div>
        <div className="mt-2" style={{ height: "2px", background: PRIMARY_COLOR }} />
      </div>

      {/* Objective/Summary */}
      {summary && (
        <Section title="Objective">
          <div className="text-xs">
            <RenderHtml html={summary} />
          </div>
        </Section>
      )}

      {/* Skills */}
      {skills && (
        <Section title="Skills">
          <div className="text-xs">
            <RenderHtml html={skills} />
          </div>
        </Section>
      )}

      {/* Technical Experience */}
      {workExperiences && workExperiences.length > 0 && (
        <Section title="Technical Experience">
          {workExperiences.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between mb-1">
                <div>
                  <span className="font-bold text-xs">{exp.company}</span>
                  <span className="mx-2">|</span>
                  <span className="text-xs italic">{exp.position}</span>
                </div>
                <div className="text-xs font-semibold" style={{ color: PRIMARY_COLOR }}>
                  {formatDateString(exp.startDate, "MMM yyyy")} –{" "}
                  {exp.endDate ? formatDateString(exp.endDate, "MMM yyyy") : "Present"}
                </div>
              </div>
              {exp.description && (
                <div className="text-xs">
                  <RenderHtml html={exp.description} />
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <Section title="Projects">
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
        </Section>
      )}

      {/* Education */}
      {educations && educations.length > 0 && (
        <Section title="Education">
          {educations.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <div>
                  <span className="font-bold text-xs">{edu.school}</span>
                  <span className="mx-2">|</span>
                  <span className="text-xs italic">{edu.degree}</span>
                </div>
                <div className="text-xs font-semibold" style={{ color: PRIMARY_COLOR }}>
                  {edu.startDate && (
                    <>
                      {formatDateString(edu.startDate, "MMM yyyy")} –{" "}
                      {edu.endDate ? formatDateString(edu.endDate, "MMM yyyy") : "Present"}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <Section title="Certifications">
          <div className="grid grid-cols-2 gap-2">
            {certifications.map((cert, index) => (
              <div key={index} className="text-xs">
                • {cert.name}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Languages */}
      {languages && (
        <Section title="Languages">
          <div className="text-xs">
            <RenderHtml html={languages} />
          </div>
        </Section>
      )}

      {/* Strengths/Additional Info */}
      {strengths && (
        <Section title="Additional Information">
          <div className="text-xs">
            <RenderHtml html={strengths} />
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <h2
        className="text-sm font-bold uppercase mb-2"
        style={{ color: PRIMARY_COLOR, letterSpacing: "0.5px" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
