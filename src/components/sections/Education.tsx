import Section from "../Section";
import { EducationInterface } from "../../interfaces/Education";

export default function Education({
  education,
}: Readonly<{ education: Readonly<EducationInterface[]> }>) {
  return (
    <Section title="Educación">
      <ul className="flex flex-col gap-8">
        {education.map(({ institution, startDate, endDate, area }, index) => {
          const startYear = new Date(startDate).getFullYear();
          const endYear =
            endDate !== null ? new Date(endDate).getFullYear() : "Actual";
          const years = `${startYear} - ${endYear}`;

          return (
            <li key={index}>
              <article>
                <header className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-medium text-gray-900">{institution}</h3>
                  </div>
                  <time className="text-sm text-gray-500 min-w-[102px]">
                    {years}
                  </time>
                </header>
                <footer>
                  <p className="text-gray-700">{area}</p>
                </footer>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
