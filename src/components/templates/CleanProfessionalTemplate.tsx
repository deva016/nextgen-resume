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

interface CleanProfessionalTemplateProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
}

export default function CleanProfessionalTemplate({
  resumeData,
  contentRef,
}: CleanProfessionalTemplateProps) {
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
      <div className="text-center mb-4 pb-3" style={{ borderBottom: "2px solid #000" }}>
        <h1 className="text-2xl font-bold">
          {firstName} {lastName}
        </h1>
        {jobTitle && <div className="text-sm mt-1">{jobTitle}</div>}
        <div className="text-xs mt-2">
          {email && <span>{email}</span>}
          {phone && email && <span className="mx-2">|</span>}
          {phone && <span>{phone}</span>}
          {location && (email || phone) && <span className="mx-2">|</span>}
          {location && <span>{location}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <Section title="Summary">
          <div className="text-xs">
            <RenderHtml html={summary} />
          </div>
        </Section>
      )}

      {/* Education */}
      {educations && educations.length > 0 && (
        <Section title="Education">
          {educations.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <div>
                  <div className="font-bold text-xs">{edu.school}</div>
                  <div className="text-xs italic">{edu.degree}</div>
                </div>
                <div className="text-xs text-right">
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

      {/* Experience */}
      {workExperiences && workExperiences.length > 0 && (
        <Section title="Experience">
          {workExperiences.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <div className="font-bold text-xs">{exp.company}</div>
                <div className="text-xs italic">
                  {formatDateString(exp.startDate, "MMM yyyy")} –{" "}
                  {exp.endDate ? formatDateString(exp.endDate, "MMM yyyy") : "Present"}
                </div>
              </div>
              <div className="text-xs italic mb-1">{exp.position}</div>
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

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <Section title="Certifications">
          {certifications.map((cert, index) => (
            <div key={index} className="text-xs mb-1">
              • {cert.name}
            </div>
          ))}
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

      {/* Strengths */}
      {strengths && (
        <Section title="Strengths">
          <div className="text-xs">
            <RenderHtml html={strengths} />
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
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2
        className="text-sm font-bold uppercase mb-2 pb-1"
        style={{ borderBottom: "1px solid #000" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
