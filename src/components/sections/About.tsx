import Section from "../Section";

export default function About({ summary }: Readonly<{ summary: string | undefined }>) {

  if (!summary) return null;

  return (
    <Section title="Sobre mí">
      <p>{summary}</p>
    </Section>
  );
}
