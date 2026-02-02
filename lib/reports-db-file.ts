import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import type { ReportRecord } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const REPORTS_FILE = path.join(DATA_DIR, "reports.json");

interface ReportsFile {
  reports: ReportRecord[];
}

function readReportsFile(): ReportsFile {
  if (!existsSync(REPORTS_FILE)) {
    return { reports: [] };
  }
  const raw = readFileSync(REPORTS_FILE, "utf-8");
  return JSON.parse(raw) as ReportsFile;
}

function writeReportsFile(data: ReportsFile): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  writeFileSync(REPORTS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function getReportsByUserId(userId: string): ReportRecord[] {
  const { reports } = readReportsFile();
  return reports
    .filter((r) => r.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export function createReport(
  userId: string,
  data: Omit<ReportRecord, "id" | "userId" | "createdAt" | "status">,
  options?: { status?: ReportRecord["status"] }
): ReportRecord {
  const file = readReportsFile();
  const id = `rpt_${Date.now()}`;
  const status = options?.status === "draft" ? "draft" : "active";
  const report: ReportRecord = {
    ...data,
    id,
    userId,
    status,
    createdAt: new Date().toISOString(),
  };
  file.reports.push(report);
  writeReportsFile(file);
  return report;
}

export function getReportById(id: string): ReportRecord | null {
  const { reports } = readReportsFile();
  return reports.find((r) => r.id === id) ?? null;
}

export function getReportStats(userId: string): {
  totalReports: number;
  totalPatients: number;
  activeReports: number;
} {
  const reports = getReportsByUserId(userId);
  const uniquePatients = new Set(
    reports.map((r) => r.animalName.toLowerCase().trim())
  ).size;
  const active = reports.filter((r) => r.status === "active").length;
  return {
    totalReports: reports.length,
    totalPatients: uniquePatients,
    activeReports: active,
  };
}

export function updateReportStatus(
  id: string,
  userId: string,
  status: ReportRecord["status"]
): ReportRecord | null {
  const file = readReportsFile();
  const idx = file.reports.findIndex((r) => r.id === id && r.userId === userId);
  if (idx === -1) return null;
  file.reports[idx] = { ...file.reports[idx], status };
  writeReportsFile(file);
  return file.reports[idx];
}

export function deleteReport(id: string, userId: string): boolean {
  const file = readReportsFile();
  const prev = file.reports.length;
  file.reports = file.reports.filter(
    (r) => !(r.id === id && r.userId === userId)
  );
  if (file.reports.length === prev) return false;
  writeReportsFile(file);
  return true;
}
