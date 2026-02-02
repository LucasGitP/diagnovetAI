import { cookies } from "next/headers";
import { getCopy } from "./constants";
import type { CopyType, Locale } from "./constants";
import { LOCALE_COOKIE, isValidLocale } from "./locale";

/** Get locale from cookie (server). Default: es */
export async function getLocaleFromCookie(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(LOCALE_COOKIE);
  if (cookie?.value && isValidLocale(cookie.value)) return cookie.value;
  return "es";
}

/** Get copy for current locale from cookie (server) */
export async function getCopyAsync(): Promise<CopyType> {
  const locale = await getLocaleFromCookie();
  return getCopy(locale);
}
