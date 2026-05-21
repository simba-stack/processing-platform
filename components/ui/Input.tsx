import { InputHTMLAttributes, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, className = "", ...rest },
  ref
) {
  return (
    <label className="block">
      {label && <span className="block text-sm font-medium text-gray-300 mb-1.5">{label}</span>}
      <input
        ref={ref}
        className={`w-full px-4 py-2.5 rounded-lg bg-gray-900/80 border border-gray-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition ${error ? "border-red-500" : ""} ${className}`}
        {...rest}
      />
      {error && <span className="block text-xs text-red-400 mt-1">{error}</span>}
    </label>
  );
});
