import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "link";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "rounded-xl bg-teal-600 py-3 font-medium text-white transition-colors hover:bg-teal-700 disabled:opacity-60 disabled:cursor-not-allowed",
  secondary:
    "rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-60",
  danger:
    "rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50",
  ghost:
    "rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50",
  link: "font-medium text-teal-600 hover:underline disabled:opacity-60",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  fullWidth,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${variantClasses[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface ButtonSubmitProps extends Omit<ButtonProps, "type"> {
  type?: "submit";
}

export function ButtonSubmit({
  variant = "primary",
  fullWidth = true,
  className = "",
  children,
  ...props
}: ButtonSubmitProps) {
  return (
    <button
      type="submit"
      className={`${variantClasses[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function ButtonLink({
  href,
  variant = "link",
  className = "",
  children,
  icon,
}: ButtonLinkProps) {
  const baseClass =
    variant === "secondary"
      ? "inline-flex items-center justify-center gap-2"
      : "";
  return (
    <Link
      href={href}
      className={`${variantClasses[variant]} ${baseClass} ${className}`}
    >
      {icon}
      {children}
    </Link>
  );
}
