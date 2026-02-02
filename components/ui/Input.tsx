import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const inputBaseClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, ...props }, ref) => (
    <input
      ref={ref}
      className={`${inputBaseClass} ${
        error ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
      } ${className}`}
      {...props}
    />
  )
);

Input.displayName = "Input";

export default Input;
