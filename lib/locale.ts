import type { Locale } from "./constants";

export const LOCALE_COOKIE = "diagnovet_locale";

export function isValidLocale(value: string): value is Locale {
  return value === "es" || value === "en";
}
