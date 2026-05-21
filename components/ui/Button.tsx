import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const v = {
  primary: "bg-fg text-bg hover:bg-muted",
  ghost: "border border-border text-fg hover:border-border-strong hover:bg-surface"
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "primary", className = "", children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      className={`px-4 py-2 text-[13px] font-medium transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus-ring ${v[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
});
