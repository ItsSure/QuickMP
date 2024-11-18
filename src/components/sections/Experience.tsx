import { Work } from "../../interfaces/Work";
import Section from "../Section";

export default function Experience({
  work,
}: Readonly<{ work: Work[] | undefined | null }>) {

  if (!work) return null;

  return (
    <Section title="Experiencia laboral">
      <ul className="flex flex-col gap-8">
        {work.map(({ name, startDate, endDate, position, summary, url }) => {
          const startYear = new Date(startDate).getFullYear();
          const endYear = endDate ? new Date(endDate).getFullYear() : "Actual";
          const years = `${startYear} - ${endYear}`;

          return (
            <li key={name}>
              <article>
                <header className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      <a
                        href={url}
                        title={`Ver ${name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {name}
                      </a>
                    </h3>
                    <h4 className="font-normal text-gray-800">{position}</h4>
                  </div>
                  <time className="text-gray-600 text-sm min-w-[102px]">
                    {years}
                  </time>
                </header>
                <footer>
                  <p>{summary}</p>
                </footer>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
