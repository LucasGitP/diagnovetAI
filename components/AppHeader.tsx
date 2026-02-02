"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import UserProfileDropdown from "@/components/UserProfileDropdown";
import { useLocale } from "@/contexts/LocaleContext";
import type { SessionUser } from "@/lib/types";
import { ROUTES } from "@/lib/constants";

interface AppHeaderProps {
  user: SessionUser;
  clinicName?: string | null;
}

export default function AppHeader({ user, clinicName }: AppHeaderProps) {
  const { locale, setLocale, copy } = useLocale();

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href={ROUTES.dashboard}
          className="flex shrink-0 items-center gap-2"
        >
          <Logo className="h-9 w-9 text-teal-600" />
          <span className="font-semibold text-gray-900">DiagnovetAI</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setLocale(locale === "es" ? "en" : "es")}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            title={locale === "es" ? "English" : "Español"}
            aria-label={
              locale === "es" ? "Switch to English" : "Cambiar a español"
            }
          >
            <span className="font-medium" aria-hidden>
              {locale === "es" ? "EN" : "ES"}
            </span>
          </button>
          <Link
            href={ROUTES.studies}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <svg
              className="h-4 w-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {copy.nav.myStudies}
          </Link>
          <Link
            href={ROUTES.analyze}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            {copy.nav.newReport}
          </Link>
          <UserProfileDropdown
            userName={user.fullName}
            userInitial={user.fullName.charAt(0)}
            clinicName={clinicName}
          />
        </nav>
      </div>
    </header>
  );
}
