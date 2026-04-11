interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className = "",
  align = "left",
}: SectionHeadingProps) {
  const alignClass =
    align === "center" ? "text-center items-center" : "items-start";

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      {eyebrow && (
        <p className="font-body font-medium text-xs uppercase tracking-wider text-rotary-gold-dark mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading font-bold text-3xl text-text-primary leading-snug mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-lg text-text-secondary leading-normal max-w-[600px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
