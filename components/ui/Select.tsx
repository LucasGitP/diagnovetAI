import { forwardRef } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const selectBaseClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed";

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", error, ...props }, ref) => (
    <select
      ref={ref}
      className={`${selectBaseClass} ${
        error ? "border-red-300" : ""
      } ${className}`}
      {...props}
    />
  )
);

Select.displayName = "Select";

export default Select;
