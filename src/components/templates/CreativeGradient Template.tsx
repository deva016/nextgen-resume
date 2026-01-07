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

interface CreativeGradientTemplateProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
}

export default function CreativeGradientTemplate({
  resumeData,
  contentRef,
}: CreativeGradientTemplateProps) {
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
    projects,
  } = resumeData;

  const location = [city, country].filter(Boolean).join(", ");

  return (
    <div
      ref={contentRef}
      id="resumePreviewContent"
      className="flex"
      style={{ fontSize: "10px", lineHeight: "1.4", fontFamily: "Arial, sans-serif", minHeight: "100%" }}
    >
      {/* Left Sidebar with Gradient */}
      <div
        className="w-2/5 p-6 text-white"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        }}
      >
        {/* Profile Photo Placeholder */}
        <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center overflow-hidden relative">
          {resumeData.photo ? (
            <img
              src={typeof resumeData.photo === "string" ? resumeData.photo : URL.createObjectURL(resumeData.photo)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl font-bold">
              {firstName?.[0]}
              {lastName?.[0]}
            </span>
          )}
        </div>

        {/* Name & Title */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold">
            {firstName} {lastName}
          </h1>
          {jobTitle && <p className="text-sm mt-1 opacity-90">{jobTitle}</p>}
        </div>

        {/* Contact */}
        <div className="space-y-2 mb-6">
          <h2 className="font-bold text-sm mb-2 border-b border-white/30 pb-1">
            CONTACT
          </h2>
          {email && (
            <div className="text-xs flex items-start gap-2">
              <span>✉</span>
              <span className="break-all">{email}</span>
            </div>
          )}
          {phone && (
            <div className="text-xs flex items-start gap-2">
              <span>📞</span>
              <span>{phone}</span>
            </div>
          )}
          {location && (
            <div className="text-xs flex items-start gap-2">
              <span>📍</span>
              <span>{location}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {skills && (
          <div className="mb-6">
            <h2 className="font-bold text-sm mb-3 border-b border-white/30 pb-1">
              DESIGN SKILLS
            </h2>
            {extractSkills(skills).slice(0, 6).map((skill, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>{skill}</span>
                  <span>●●●●●</span>
                </div>
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${Math.random() * 20 + 80}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages && (
          <div>
            <h2 className="font-bold text-sm mb-2 border-b border-white/30 pb-1">
              LANGUAGES
            </h2>
            <div className="text-xs space-y-1">
              <RenderHtml html={languages} className="text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Right Content Area */}
      <div className="w-3/5 p-6 bg-white">
        {/* Profile */}
        {summary && (
          <section className="mb-4">
            <h2 className="text-sm font-bold mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-600" />
              Profile
            </h2>
            <div className="text-xs">
              <RenderHtml html={summary} />
            </div>
          </section>
        )}

        {/* Experience */}
        {workExperiences && workExperiences.length > 0 && (
          <section className="mb-4">
            <h2 className="text-sm font-bold mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-600" />
              Experience
            </h2>
            {workExperiences.map((exp, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-bold text-xs">{exp.position}</h3>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span className="italic">{exp.company}</span>
                  <span>
                    {formatDateString(exp.startDate, "MMM yyyy")} -{" "}
                    {exp.endDate ? formatDateString(exp.endDate, "MMM yyyy") : "Present"}
                  </span>
                </div>
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
            <h2 className="text-sm font-bold mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-600" />
              Education
            </h2>
            {educations.map((edu, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-bold text-xs">{edu.degree}</h3>
                <p className="text-xs text-gray-600">{edu.school}</p>
                {edu.startDate && (
                  <p className="text-xs text-purple-600">
                    {formatDateString(edu.startDate, "yyyy")} -{" "}
                    {edu.endDate ? formatDateString(edu.endDate, "yyyy") : "Present"}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-sm font-bold mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-600" />
              Featured Projects
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {projects.slice(0, 2).map((project, index) => (
                <div
                  key={index}
                  className="p-3 border rounded"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <h3 className="font-bold text-xs mb-1">{project.name}</h3>
                  {project.description && (
                    <div className="text-xs text-gray-600">
                      <RenderHtml html={project.description} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
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
