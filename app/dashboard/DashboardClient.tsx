"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import ReportListItem from "@/components/ReportListItem";
import SearchBar from "@/components/SearchBar";
import StatCard from "@/components/StatCard";
import SuccessBanner from "@/components/SuccessBanner";
import { ButtonLink } from "@/components/ui";
import {
  ReportsIcon,
  PatientsIcon,
  ActiveReportsIcon,
} from "@/components/icons/StatIcons";
import type { ReportRecord } from "@/lib/types";
import { useLocale } from "@/contexts/LocaleContext";
import { ROUTES } from "@/lib/constants";

interface Stats {
  totalReports: number;
  totalPatients: number;
  activeReports: number;
}

export default function DashboardClient({
  stats: initialStats,
  reports: initialReports,
}: {
  stats: Stats;
  reports: ReportRecord[];
}) {
  const { copy } = useLocale();
  const searchParams = useSearchParams();
  const created = searchParams.get("created") === "1";
  const [showSuccess, setShowSuccess] = useState(created);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (created) {
      setTimeout(() => {
        setShowSuccess(true);
      }, 1000);
    }
  }, [created]);

  const filteredReports = search.trim()
    ? initialReports.filter(
        (r) =>
          r.animalName.toLowerCase().includes(search.toLowerCase()) ||
          r.guardian.toLowerCase().includes(search.toLowerCase()) ||
          r.referringProfessional?.toLowerCase().includes(search.toLowerCase())
      )
    : initialReports;

  return (
    <>
      {showSuccess && (
        <SuccessBanner
          message={copy.dashboard.successMessage}
          onDismiss={() => setShowSuccess(false)}
        />
      )}

      <section className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title={copy.dashboard.totalReports}
          value={initialStats.totalReports}
          icon={<ReportsIcon />}
        />
        <StatCard
          title={copy.dashboard.totalPatients}
          value={initialStats.totalPatients}
          icon={<PatientsIcon />}
        />
        <StatCard
          title={copy.dashboard.activeReports}
          value={initialStats.activeReports}
          icon={<ActiveReportsIcon />}
        />
      </section>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={copy.dashboard.searchPlaceholder}
        />
        <ButtonLink
          href={ROUTES.analyze}
          variant="secondary"
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          }
        >
          {copy.dashboard.createNewReport}
        </ButtonLink>
      </div>

      {filteredReports.length === 0 ? (
        <EmptyState
          title={copy.dashboard.noReports}
          description={copy.dashboard.noReportsDescription}
          actionLabel={copy.dashboard.createFirstReport}
          actionHref={ROUTES.analyze}
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <ul className="divide-y divide-gray-100">
            {filteredReports.map((r) => (
              <ReportListItem key={r.id} report={r} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
