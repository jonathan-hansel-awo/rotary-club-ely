type BadgeVariant = "category" | "upcoming" | "past" | "featured";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  category: "bg-rotary-blue/10 text-rotary-blue",
  upcoming: "bg-rotary-gold/15 text-rotary-gold-dark",
  past: "bg-grey-200 text-grey-700",
  featured: "bg-cranberry/10 text-cranberry",
};

export default function Badge({
  children,
  variant = "category",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-block
        font-body font-medium
        text-xs uppercase tracking-wider
        px-2 py-1
        rounded-sm
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
