"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ReportRecord } from "@/lib/types";
import { useLocale } from "@/contexts/LocaleContext";
import { ROUTES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

interface StudyDetailActionsProps {
  report: ReportRecord;
}

function getStatusOptions(copy: {
  statusLabels: { draft: string; active: string; completed: string };
}): { value: ReportRecord["status"]; label: string }[] {
  return [
    { value: "draft", label: copy.statusLabels.draft },
    { value: "active", label: copy.statusLabels.active },
    { value: "completed", label: copy.statusLabels.completed },
  ];
}

export default function StudyDetailActions({
  report,
}: StudyDetailActionsProps) {
  const { copy } = useLocale();
  const router = useRouter();
  const [status, setStatus] = useState<ReportRecord["status"]>(report.status);
  const [statusLoading, setStatusLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const STATUS_OPTIONS = getStatusOptions(copy);

  async function handleStatusChange(newStatus: ReportRecord["status"]) {
    setStatusLoading(true);
    try {
      const res = await fetch(`/api/reports/${report.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
        router.refresh();
      }
    } finally {
      setStatusLoading(false);
    }
  }

  async function handleDelete() {
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/reports/${report.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push(ROUTES.studies);
        router.refresh();
        return;
      }
    } finally {
      setDeleteLoading(false);
    }
    setDeleteOpen(false);
  }

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-gray-200 pt-6">
        <div className="flex items-center gap-2">
          <label
            htmlFor="study-status"
            className="text-sm font-medium text-gray-700"
          >
            {copy.studies.status}
          </label>
          <select
            id="study-status"
            value={status}
            onChange={(e) =>
              handleStatusChange(e.target.value as ReportRecord["status"])
            }
            disabled={statusLoading}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-60"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {statusLoading && (
            <span className="text-xs text-gray-500">{copy.studies.saving}</span>
          )}
        </div>
        <Button
          type="button"
          variant="danger"
          onClick={() => setDeleteOpen(true)}
          className="ml-auto"
        >
          {copy.studies.deleteStudy}
        </Button>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        title={copy.studies.deleteConfirmTitle}
        message={copy.studies.deleteConfirmMessage}
        confirmLabel={copy.studies.delete}
        cancelLabel={copy.studies.cancel}
        variant="danger"
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  );
}
