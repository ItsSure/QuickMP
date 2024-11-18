import Section from '../Section';
import { Project } from '../../interfaces/Project';
import GitHub from '../../icons/GitHub';

export default function Projects({
  projects
}: Readonly<{ projects: Project[] }>) {
  if (projects.length === 0 || null) return null;

  return (
    <Section title="Proyectos">
      <ul
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
        }}
        className="grid gap-4 -mx-4"
      >
        {projects.map(
          ({ url, description, highlights, name, isActive, github }) => (
            <li key={name}>
              <article className="border rounded-lg p-4 h-full flex flex-col gap-4">
                <header className="flex-1">
                  <h3 className="mb-1 text-lg">
                    <a
                      href={url??undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Ver el proyecto ${name}`}
                      className="text-black hover:underline"
                    >
                      {name}
                    </a>
                    {isActive && <span className="text-green-600 ml-2">•</span>}
                    {github && (
                      <a
                        className="ml-2"
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Ver código fuente del proyecto ${name}`}
                      >
                        <GitHub />
                      </a>
                    )}
                  </h3>
                  <p className="text-sm leading-tight mb-2">{description}</p>
                </header>
                <footer className="flex flex-wrap gap-2 text-xs">
                  {highlights?.map((highlight, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-600 font-medium rounded-full px-2 py-1"
                    >
                      {highlight}
                    </span>
                  ))}
                </footer>
              </article>
            </li>
          )
        )}
      </ul>
    </Section>
  );
}
