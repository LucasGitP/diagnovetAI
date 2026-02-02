import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import type { ClinicInfo } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const CLINICS_FILE = path.join(DATA_DIR, "clinics.json");

interface ClinicsFile {
  clinics: ClinicInfo[];
}

function readClinicsFile(): ClinicsFile {
  if (!existsSync(CLINICS_FILE)) {
    return { clinics: [] };
  }
  const raw = readFileSync(CLINICS_FILE, "utf-8");
  return JSON.parse(raw) as ClinicsFile;
}

function writeClinicsFile(data: ClinicsFile): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  writeFileSync(CLINICS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function getClinicByUserId(userId: string): ClinicInfo | null {
  const { clinics } = readClinicsFile();
  return clinics.find((c) => c.userId === userId) ?? null;
}

export function upsertClinic(
  userId: string,
  data: { legalName: string; address: string; phone: string }
): ClinicInfo {
  const file = readClinicsFile();
  const now = new Date().toISOString();
  const index = file.clinics.findIndex((c) => c.userId === userId);
  const clinic: ClinicInfo = {
    userId,
    legalName: data.legalName.trim(),
    address: data.address.trim(),
    phone: data.phone.trim(),
    updatedAt: now,
  };
  if (index >= 0) {
    file.clinics[index] = clinic;
  } else {
    file.clinics.push(clinic);
  }
  writeClinicsFile(file);
  return clinic;
}
