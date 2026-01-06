import { EditorFormProps } from "@/lib/types";
import CertificationsForm from "./forms/CertificationsForm";
import EducationForm from "./forms/EducationForm";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import LanguagesForm from "./forms/LanguagesForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import ProjectsForm from "./forms/ProjectsForm";
import SkillsForm from "./forms/SkillsForm";
import StrengthsForm from "./forms/StrengthsForm";
import SummaryForm from "./forms/SummaryForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "General info", component: GeneralInfoForm, key: "general-info" },
  { title: "Personal info", component: PersonalInfoForm, key: "personal-info" },
  {
    title: "Work experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  { title: "Education", component: EducationForm, key: "education" },
  { title: "About Projects", component: ProjectsForm, key: "projects" },
  { title: "Certifications", component: CertificationsForm, key: "certifications" },
  { title: "Skills", component: SkillsForm, key: "skills" },
  { title: "Strengths", component: StrengthsForm, key: "strengths" },
  { title: "Languages", component: LanguagesForm, key: "languages" },
  {
    title: "Summary",
    component: SummaryForm,
    key: "summary",
  },
];
