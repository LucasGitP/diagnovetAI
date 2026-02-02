import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import Card from "@/components/ui/Card";
import DetailItem from "@/components/DetailItem";
import StudyDetailActions from "./StudyDetailActions";
import { getSession } from "@/lib/auth";
import { getClinicByUserId } from "@/lib/clinics-db";
import { getReportById } from "@/lib/reports-db";
import { ROUTES } from "@/lib/constants";
import { getCopyAsync } from "@/lib/locale-server";

export default async function StudyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getSession();
  if (!user) redirect(ROUTES.login);

  const copy = await getCopyAsync();
  const { id } = await params;
  const report = await getReportById(id);
  if (!report || report.userId !== user.id) notFound();

  const clinic = await getClinicByUserId(user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader user={user} clinicName={clinic?.legalName} />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Link
          href={ROUTES.studies}
          className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-teal-600"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {copy.studyDetail.backToStudies}
        </Link>
        <Card padding="md">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {report.animalName}
            </h1>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                report.status === "completed"
                  ? "bg-emerald-100 text-emerald-800"
                  : report.status === "active"
                  ? "bg-teal-100 text-teal-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {copy.statusLabels[report.status]}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {copy.studyDetail.reportLabel} · {report.date}
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">
                {copy.studyDetail.species}
              </dt>
              <dd className="mt-1 text-gray-900">
                {copy.speciesLabels[report.species] ?? report.species}
              </dd>
            </div>
            <DetailItem
              label={copy.studyDetail.breed}
              value={report.breed || "—"}
            />
            <DetailItem
              label={copy.studyDetail.age}
              value={`${report.age} ${report.unit}`}
            />
            <DetailItem label={copy.studyDetail.gender} value={report.gender} />
            <DetailItem
              label={copy.studyDetail.tutor}
              value={report.guardian}
            />
            <DetailItem
              label={copy.studyDetail.studyType}
              value={copy.studyTypeLabels[report.studyType] ?? report.studyType}
            />
            <DetailItem
              label={copy.studyDetail.referringProfessional}
              value={report.referringProfessional || "—"}
            />
            <div>
              <dt className="text-sm font-medium text-gray-500">
                {copy.studyDetail.images}
              </dt>
              <dd className="mt-1 text-gray-900">{report.imageCount}</dd>
            </div>
          </dl>
          <StudyDetailActions report={report} />
        </Card>
      </main>
    </div>
  );
}
