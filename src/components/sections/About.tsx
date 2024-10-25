import Section from "../Section";

export default function About({ summary }: Readonly<{ summary: string }>) {
  return (
    <Section title="Sobre mí">
      <p>{summary}</p>
    </Section>
  );
}
