import { Award } from "./Award";
import { Basics } from "./Basics";
import { Certificate } from "./Certificate";
import { EducationInterface } from "./Education";
import { Language } from "./Language";
import { Project } from "./Project";
import { Reference } from "./Reference";
import { Skill } from "./Skills";
import { Work } from "./Work";

export interface Cv {
  basics: Basics;
  work: Work[];
  education: EducationInterface[];
  awards: Award[];
  certificates: Certificate[];
  skills: Skill[];
  languages: Language[];
  references: Reference[];
  projects: Project[];
}
