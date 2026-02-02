import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import SettingsContent from "./SettingsContent";
import { getSession } from "@/lib/auth";
import { getCopyAsync, getLocaleFromCookie } from "@/lib/locale-server";
import { ROUTES } from "@/lib/constants";
import { getClinicByUserId } from "@/lib/clinics-db";
import { getUserById } from "@/lib/db";
import { formatDate } from "@/lib/format";

export default async function SettingsPage() {
  const user = await getSession();
  if (!user) redirect(ROUTES.login);

  const [copy, locale] = await Promise.all([
    getCopyAsync(),
    getLocaleFromCookie(),
  ]);

  const fullUser = await getUserById(user.id);
  const clinic = await getClinicByUserId(user.id);

  const profile = fullUser
    ? {
        fullName: fullUser.fullName,
        email: fullUser.email,
        phone: fullUser.phone ?? "",
        professionalTitle: fullUser.professionalTitle ?? "",
        license: fullUser.license ?? "",
        createdAt: fullUser.createdAt,
      }
    : null;

  const clinicData = clinic
    ? {
        legalName: clinic.legalName,
        address: clinic.address,
        phone: clinic.phone,
      }
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader user={user} clinicName={clinic?.legalName} />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          {copy.settings.title}
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          {copy.settings.pageDescription}
        </p>
        <SettingsContent
          profile={profile}
          clinicData={clinicData}
          memberSinceFormatted={
            profile ? formatDate(locale, profile.createdAt) : ""
          }
        />
      </main>
    </div>
  );
}
