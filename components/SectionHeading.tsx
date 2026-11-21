import FadeInSection from "./FadeInSection";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  from = "up",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  from?: "up" | "down" | "left" | "right";
}) {
  return (
    <FadeInSection
      from={from}
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      <span
        className={`section-eyebrow ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl text-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-ink-500">
          {subtitle}
        </p>
      )}
    </FadeInSection>
  );
}
