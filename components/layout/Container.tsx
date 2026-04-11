import { ReactNode } from "react";

type ContainerVariant = "default" | "narrow" | "wide";

interface ContainerProps {
  children: ReactNode;
  variant?: ContainerVariant;
  className?: string;
}

const maxWidths: Record<ContainerVariant, string> = {
  default: "max-w-[1280px]",
  narrow: "max-w-[768px]",
  wide: "max-w-[1440px]",
};

export default function Container({
  children,
  variant = "default",
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`
        w-full
        mx-auto
        px-[clamp(1rem,0.5rem+2vw,2rem)]
        ${maxWidths[variant]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
