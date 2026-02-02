import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import { getSession } from "@/lib/auth";
import { ROUTES } from "@/lib/constants";
import { getClinicByUserId } from "@/lib/clinics-db";
import AnalyzePatientForm from "./AnalyzePatientForm";

export default async function AnalyzePage() {
  const user = await getSession();
  if (!user) redirect(ROUTES.login);

  const clinic = getClinicByUserId(user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader user={user} clinicName={clinic?.legalName} />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <AnalyzePatientForm />
      </main>
    </div>
  );
}
