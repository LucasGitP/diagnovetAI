import Link from "next/link";
import { ROUTES } from "@/lib/constants";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

const defaultIcon = (
  <svg
    className="h-10 w-10 text-teal-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref = ROUTES.analyze,
  icon = defaultIcon,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-teal-50">
        {icon}
      </div>
      <p className="text-lg font-medium text-gray-700">{title}</p>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
      <Link
        href={actionHref}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
      >
        {actionLabel}
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </Link>
    </div>
  );
}
