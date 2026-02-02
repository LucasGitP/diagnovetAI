interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

export default function Label({
  htmlFor,
  children,
  className = "",
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-1 block text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
}
