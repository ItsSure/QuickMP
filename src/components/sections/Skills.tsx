import Section from "../Section";
import { Skill } from "../../interfaces/Skills";
import HTML from "../../icons/html";
import CSS from "../../icons/css";
import TypeScript from "../../icons/type";
import Node from "../../icons/node";
import MySQL from "../../icons/sql";
import Git from "../../icons/git";
import React from "../../icons/react";
import JavaScript from "../../icons/javascript";
import GitHub from "../../icons/GitHub";
import Next from "../../icons/next";
import Tailwind from "../../icons/tailwind";

const SKILLS_ICONS: Record<string, any> = {
  HTML,
  CSS,
  JavaScript,
  TypeScript,
  React,
  Node,
  MySQL,
  Git,
  GitHub,
  Next,
  Tailwind,
};
export default function Skills({ skills }: Readonly<{ skills: Skill[] }>) {
  
  return (
    <Section title="Habilidades">
      <ul className="inline-flex flex-wrap gap-2">
        {skills.map(({ name }) => {
          const iconName = name === "Next.js" ? "Next" : name;
          const Icon = SKILLS_ICONS[iconName];

          return (
            <li
              key={name}
              className="flex items-center gap-1 bg-gray-200 rounded-md text-black text-sm font-medium px-2 py-1"
            >
              {Icon && <Icon />} <span>{name}</span>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
