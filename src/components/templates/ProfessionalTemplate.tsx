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

interface ProfessionalTemplateProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
}

const TEAL_COLOR = "#008B8B";

export default function ProfessionalTemplate({
  resumeData,
  contentRef,
}: ProfessionalTemplateProps) {
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

  return (
    <div
      ref={contentRef}
      id="resumePreviewContent"
      className="space-y-4 p-6 font-serif"
      style={{ fontSize: "11px", lineHeight: "1.4" }}
    >
      {/* Header */}
      <div className="text-center border-b-2 pb-3" style={{ borderColor: TEAL_COLOR }}>
        <h1 className="text-2xl font-bold tracking-wide">
          {firstName} {lastName}
        </h1>
        {jobTitle && (
          <p className="text-sm mt-1" style={{ color: TEAL_COLOR }}>
            {jobTitle}
          </p>
        )}
        <p className="text-xs text-gray-600 mt-2">
          {[
            city && country ? `${city}, ${country}` : city || country,
            phone,
            email,
          ]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </div>

      {/* Professional Summary */}
      {summary && (
        <Section title="Professional Summary">
          <RenderHtml html={summary} className="text-justify" />
        </Section>
      )}

      {/* Core Skills */}
      {skills && skills.length > 0 && (
        <Section title="Core Skills">
          <ul className="list-disc list-inside space-y-0.5">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Projects */}
      {projects && projects.filter((p) => p.name).length > 0 && (
        <Section title="Projects">
          {projects
            .filter((p) => p.name)
            .map((project, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold">{project.name}</span>
                  {project.year && (
                    <span className="text-xs" style={{ color: TEAL_COLOR }}>
                      {project.year}
                    </span>
                  )}
                </div>
                {project.description && (
                  <RenderHtml
                    html={project.description}
                    className="ml-2 text-gray-700"
                  />
                )}
                {project.link && (
                  <p className="text-xs text-blue-600 ml-2">{project.link}</p>
                )}
              </div>
            ))}
        </Section>
      )}

      {/* Experience */}
      {workExperiences && workExperiences.filter((w) => w.company || w.position).length > 0 && (
        <Section title="Experience">
          {workExperiences
            .filter((w) => w.company || w.position)
            .map((exp, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold">{exp.company}</span>
                    {exp.company && exp.position && " — "}
                    <span className="italic">{exp.position}</span>
                  </div>
                  {exp.startDate && (
                    <span className="text-xs" style={{ color: TEAL_COLOR }}>
                      {formatDateString(exp.startDate, "MMM yyyy")} –{" "}
                      {exp.endDate
                        ? formatDateString(exp.endDate, "MMM yyyy")
                        : "Present"}
                    </span>
                  )}
                </div>
                {exp.description && (
                  <RenderHtml
                    html={exp.description}
                    className="ml-2 text-gray-700"
                  />
                )}
              </div>
            ))}
        </Section>
      )}

      {/* Certifications */}
      {certifications && certifications.filter((c) => c.name).length > 0 && (
        <Section title="Certifications">
          <ul className="list-disc list-inside space-y-0.5">
            {certifications
              .filter((c) => c.name)
              .map((cert, index) => (
                <li key={index}>
                  {cert.name}
                  {cert.yearRange && ` (${cert.yearRange})`}
                  {cert.link && (
                    <span className="text-blue-600 ml-1">— {cert.link}</span>
                  )}
                </li>
              ))}
          </ul>
        </Section>
      )}

      {/* Education */}
      {educations && educations.filter((e) => e.school || e.degree).length > 0 && (
        <Section title="Education">
          {educations
            .filter((e) => e.school || e.degree)
            .map((edu, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold">{edu.school}</span>
                  </div>
                  {edu.startDate && (
                    <span className="text-xs" style={{ color: TEAL_COLOR }}>
                      {formatDateString(edu.startDate, "yyyy")} –{" "}
                      {edu.endDate
                        ? formatDateString(edu.endDate, "yyyy")
                        : "Present"}
                    </span>
                  )}
                </div>
                {edu.degree && (
                  <p className="italic text-gray-700 ml-2">{edu.degree}</p>
                )}
              </div>
            ))}
        </Section>
      )}

      {/* Strengths (Soft Skills) */}
      {strengths && strengths.length > 0 && (
        <Section title="Soft Skills">
          <p>{strengths.join(" • ")}</p>
        </Section>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <Section title="Languages">
          <p>{languages.join(" • ")}</p>
        </Section>
      )}
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="space-y-1">
      <h2
        className="font-bold text-sm uppercase tracking-wider px-2 py-0.5"
        style={{
          backgroundColor: "#E0F7F7",
          color: TEAL_COLOR,
          borderBottom: `2px solid ${TEAL_COLOR}`,
        }}
      >
        {title}
      </h2>
      <div className="px-1">{children}</div>
    </div>
  );
}
