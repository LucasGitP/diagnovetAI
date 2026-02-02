import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import EmptyState from "@/components/EmptyState";
import StudiesTable from "@/components/StudiesTable";
import { getSession } from "@/lib/auth";
import { getClinicByUserId } from "@/lib/clinics-db";
import { getReportsByUserId } from "@/lib/reports-db";
import { getCopyAsync } from "@/lib/locale-server";
import { ROUTES } from "@/lib/constants";

export default async function StudiesPage() {
  const user = await getSession();
  if (!user) redirect(ROUTES.login);

  const copy = await getCopyAsync();
  const clinic = await getClinicByUserId(user.id);
  const reports = await getReportsByUserId(user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader user={user} clinicName={clinic?.legalName} />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          {copy.nav.myStudies}
        </h1>
        {reports.length === 0 ? (
          <EmptyState
            title={copy.emptyStudies.title}
            description={copy.emptyStudies.description}
            actionLabel={copy.emptyStudies.actionLabel}
            actionHref={ROUTES.analyze}
          />
        ) : (
          <StudiesTable reports={reports} />
        )}
      </main>
    </div>
  );
}
