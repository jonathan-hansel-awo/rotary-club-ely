export default function SectionDivider({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  return (
    <div
      aria-hidden="true"
      className={
        tone === "dark"
          ? "h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          : "h-px w-full bg-gradient-to-r from-transparent via-grey-200 to-transparent"
      }
    />
  );
}
