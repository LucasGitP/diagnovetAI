"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { useLocale } from "@/contexts/LocaleContext";
import ClinicForm from "@/app/onboarding/clinic/ClinicForm";
import { DetailItem } from "@/components";

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  professionalTitle: string;
  license: string;
  createdAt: string;
}

interface ClinicData {
  legalName: string;
  address: string;
  phone: string;
}

interface SettingsContentProps {
  profile: ProfileData | null;
  clinicData: ClinicData | null;
  memberSinceFormatted: string;
}

export default function SettingsContent({
  profile,
  clinicData,
  memberSinceFormatted,
}: SettingsContentProps) {
  const { copy } = useLocale();
  const [tab, setTab] = useState<"personal" | "veterinary">("personal");

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setTab("personal")}
          className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
            tab === "personal"
              ? "border-teal-600 text-teal-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          {copy.nav.personal}
        </button>
        <button
          type="button"
          onClick={() => setTab("veterinary")}
          className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
            tab === "veterinary"
              ? "border-teal-600 text-teal-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          {copy.nav.veterinary}
        </button>
      </div>

      {tab === "personal" && profile && (
        <div className="space-y-6">
          <Card padding="md">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {copy.settings.profileOverview}
            </h2>
            <p className="mb-4 text-sm text-gray-500">
              {copy.settings.profileDescription}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-violet-100 text-2xl font-semibold text-violet-700">
                {profile.fullName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {profile.fullName}
                </p>
                <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {copy.settings.memberSince} {memberSinceFormatted}
                </p>
                {clinicData?.legalName && (
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    {clinicData.legalName}
                  </span>
                )}
              </div>
            </div>
          </Card>

          <Card padding="md">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {copy.settings.contactInfo}
            </h2>
            <dl className="grid gap-4 sm:grid-cols-2">
              <DetailItem label={copy.settings.email} value={profile.email} />
              <DetailItem
                label={copy.settings.phone}
                value={profile.phone || "—"}
              />
              <DetailItem
                label={copy.settings.fullName}
                value={profile.fullName}
              />
              <DetailItem
                label={copy.settings.professionalTitle}
                value={profile.professionalTitle || "—"}
              />
              {profile.license && (
                <DetailItem
                  label={copy.settings.license}
                  value={profile.license}
                />
              )}
            </dl>
          </Card>
        </div>
      )}

      {tab === "veterinary" && (
        <Card padding="md">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <svg
              className="h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            {copy.settings.clinicDataTitle}
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            {copy.settings.clinicDataDescription}
          </p>
          <ClinicForm initialData={clinicData} />
        </Card>
      )}
    </div>
  );
}
