import { SectionProps } from "../interfaces/Section";

export default function Section({ title, children }: Readonly<SectionProps>) {
  return (
    <section className="max-w-[700px] mx-auto mb-9 md:mb-9">
      {title && <h2 className="mb-2 font-bold text-xl leading-6">{title}</h2>}
      {children}
    </section>
  );
}
