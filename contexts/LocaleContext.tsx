"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { getCopy } from "@/lib/constants";
import { LOCALE_COOKIE, isValidLocale } from "@/lib/locale";
import type { CopyType, Locale } from "@/lib/constants";

const LOCALE_STORAGE_KEY = "diagnovet_locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  copy: CopyType;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "es";
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored && isValidLocale(stored)) return stored;
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${LOCALE_COOKIE}=`));
  const value = cookie?.split("=")[1];
  if (value && isValidLocale(value)) return value;
  return "es";
}

function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(readStoredLocale());
    setMounted(true);
  }, []);

  const copy: CopyType = mounted ? getCopy(locale) : getCopy("es");

  const setLocale = useCallback(
    (newLocale: Locale) => {
      setLocaleState(newLocale);
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
      setLocaleCookie(newLocale);
      router.refresh();
    },
    [router]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, copy }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    return {
      locale: "es",
      setLocale: () => {},
      copy: getCopy("es"),
    };
  }
  return ctx;
}
