import { InputHTMLAttributes, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, hint, className = "", ...rest },
  ref
) {
  return (
    <label className="block">
      {label && (
        <span className="block text-[12px] text-muted mb-1.5 tracking-tight">{label}</span>
      )}
      <input
        ref={ref}
        className={`w-full px-3 py-2 text-[14px] bg-transparent border-b border-border focus:border-fg focus:outline-none transition-colors placeholder:text-faint ${error ? "border-red-500/60" : ""} ${className}`}
        {...rest}
      />
      {hint && !error && <span className="block text-[11px] text-faint mt-1">{hint}</span>}
      {error && <span className="block text-[11px] text-red-400/80 mt-1">{error}</span>}
    </label>
  );
});
