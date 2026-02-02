"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReportRecord } from "@/lib/types";
import { useLocale } from "@/contexts/LocaleContext";
import { ROUTES } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import Card from "@/components/ui/Card";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const PAGE_SIZE = 10;

interface StudiesTableProps {
  reports: ReportRecord[];
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
      ? "bg-emerald-100 text-emerald-800"
      : status === "active"
      ? "bg-teal-100 text-teal-800"
      : "bg-amber-100 text-amber-800";
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles}`}
    >
      {copy.statusLabels[status]}
    </span>
  );
}

export default function StudiesTable({ reports }: StudiesTableProps) {
  const { copy, locale } = useLocale();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(reports.length / PAGE_SIZE));
  const from = (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, reports.length);
  const pageReports = reports.slice(from - 1, to);

  async function handleStatusChange(
    id: string,
    status: ReportRecord["status"]
  ) {
    setStatusUpdating(id);
    try {
      const res = await fetch(`/api/reports/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) router.refresh();
    } finally {
      setStatusUpdating(null);
    }
  }

  async function handleDelete(id: string) {
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/reports/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDeleteTarget(null);
        router.refresh();
        if (pageReports.length === 1 && page > 1) setPage((p) => p - 1);
        return;
      }
    } finally {
      setDeleteLoading(false);
    }
    setDeleteTarget(null);
  }

  return (
    <Card padding="none">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                {copy.studies.patient}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                {copy.studies.tutor}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                {copy.studies.studyType}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                {copy.studies.status}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                {copy.studies.date}
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                {copy.studies.actions}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {pageReports.map((r) => (
              <tr key={r.id} className="transition-colors hover:bg-gray-50/80">
                <td className="px-6 py-4">
                  <Link
                    href={ROUTES.studyDetail(r.id)}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-medium text-teal-700">
                      {r.animalName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {r.animalName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {copy.speciesLabels[r.species] ?? r.species}
                      </p>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {r.guardian || "—"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {copy.studyTypeLabels[r.studyType] ?? r.studyType}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={r.status}
                    onChange={(e) =>
                      handleStatusChange(
                        r.id,
                        e.target.value as ReportRecord["status"]
                      )
                    }
                    disabled={statusUpdating === r.id}
                    className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-60"
                  >
                    <option value="draft">{copy.statusLabels.draft}</option>
                    <option value="active">{copy.statusLabels.active}</option>
                    <option value="completed">
                      {copy.statusLabels.completed}
                    </option>
                  </select>
                  {statusUpdating === r.id && (
                    <span className="ml-1 text-xs text-gray-400">...</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(locale, r.date)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={ROUTES.studyDetail(r.id)}
                      className="inline-flex items-center gap-1 rounded-lg bg-teal-50 px-2.5 py-1.5 text-xs font-medium text-teal-700 transition-colors hover:bg-teal-100"
                    >
                      {r.status === "completed" ? (
                        <>
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
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          {copy.studies.download}
                        </>
                      ) : (
                        <>
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
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                          {copy.studies.continue}
                        </>
                      )}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(r.id)}
                      className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                      aria-label={copy.studies.delete}
                    >
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title={copy.studies.deleteConfirmTitle}
        message={copy.studies.deleteConfirmMessage}
        confirmLabel={copy.studies.delete}
        cancelLabel={copy.studies.cancel}
        variant="danger"
        loading={deleteLoading}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
      {reports.length > PAGE_SIZE && (
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3">
          <p className="text-sm text-gray-500">
            {copy.studies.showing(from, to, reports.length)}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copy.studies.previous}
            </button>
            <span className="text-sm text-gray-500">
              {page}/{totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copy.studies.next}
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
