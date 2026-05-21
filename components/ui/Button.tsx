import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const v = {
  primary: "bg-brand text-gray-950 hover:bg-brand/90",
  secondary: "border border-gray-700 hover:border-brand hover:text-brand",
  ghost: "hover:bg-gray-800/50"
};

const s = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5",
  lg: "px-6 py-3 text-lg"
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "primary", size = "md", className = "", children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      className={`rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${v[variant]} ${s[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
});
