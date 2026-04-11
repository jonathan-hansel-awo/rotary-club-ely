import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "sm";
type ButtonAs = "button" | "a";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: ButtonAs;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  target?: string;
  rel?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-rotary-gold text-grey-900 border-rotary-gold
    hover:bg-rotary-gold-dark hover:border-rotary-gold-dark
    active:bg-[#B8800D]
  `,
  secondary: `
    bg-transparent text-rotary-blue border-rotary-blue
    hover:bg-rotary-blue hover:text-white
  `,
  ghost: `
    bg-transparent text-white border-white/50
    hover:border-white hover:bg-white/10
  `,
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "text-base px-6 py-3",
  sm: "text-sm px-4 py-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "default",
  as = "button",
  href,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  target,
  rel,
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center gap-2
    font-body font-semibold
    border-2 rounded-sm
    cursor-pointer
    transition-all duration-200 ease-out
    hover:-translate-y-px hover:shadow-md
    active:translate-y-0
    focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
  `;

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (as === "a" && href) {
    return (
      <a href={href} className={classes} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
