import Link from "next/link";
import type { ReportRecord } from "@/lib/types";
import { useLocale } from "@/contexts/LocaleContext";
import { ROUTES } from "@/lib/constants";
import { formatDate } from "@/lib/format";

interface ReportListItemProps {
  report: ReportRecord;
}

function StatusBadge({
  status,
  copy,
}: {
  status: ReportRecord["status"];
  copy: { statusLabels: { draft: string; active: string; completed: string } };
}) {
  const styles =
    status === "completed"
      ? "bg-emerald-100 text-emerald-700"
      : status === "active"
      ? "bg-teal-100 text-teal-700"
      : "bg-amber-100 text-amber-700";
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${styles}`}
    >
      {copy.statusLabels[status]}
    </span>
  );
}

export default function ReportListItem({ report }: ReportListItemProps) {
  const { copy, locale } = useLocale();
  return (
    <li className="border-b border-gray-100 last:border-b-0">
      <Link
        href={ROUTES.studyDetail(report.id)}
        className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-teal-50/50 sm:flex-nowrap"
      >
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal-700">
            {report.animalName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-gray-900">
              {report.animalName}
            </p>
            <p className="truncate text-sm text-gray-500">
              {report.guardian} ·{" "}
              {copy.studyTypeLabels[report.studyType] ?? report.studyType}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-sm">
          <StatusBadge status={report.status} copy={copy} />
          <span className="text-gray-500">
            {formatDate(locale, report.date)}
          </span>
          {report.imageCount > 0 && (
            <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                />
              </svg>
              {report.imageCount}
            </span>
          )}
          <svg
            className="h-5 w-5 text-teal-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </Link>
    </li>
  );
}
