import { Basics } from "./Basics";
import { EducationInterface } from "./Education";
import { Project } from "./Project";
import { Skill } from "./Skills";
import { Work } from "./Work";

export interface ICv {
  basics: Basics;
  work?: Work[];
  education?: EducationInterface[];
  skills: Skill[];
  projects: Project[];
}
