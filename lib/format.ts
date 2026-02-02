import type { Locale } from "./constants";

const MONTHS_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Formatea fecha según locale: ES "20 de noviembre de 2025", EN "November 20, 2025" */
export function formatDate(locale: Locale, isoDate: string): string {
  try {
    const d = new Date(isoDate);
    const day = d.getDate();
    const month =
      locale === "es" ? MONTHS_ES[d.getMonth()] : MONTHS_EN[d.getMonth()];
    const year = d.getFullYear();
    if (locale === "es") {
      return `${day} de ${month} de ${year}`;
    }
    return `${month} ${day}, ${year}`;
  } catch {
    return isoDate;
  }
}

/** @deprecated Use formatDate(locale, isoDate) for i18n */
export function formatDateES(isoDate: string): string {
  return formatDate("es", isoDate);
}
