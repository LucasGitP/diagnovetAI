import * as file from "./reports-db-file";
import * as supabase from "./reports-db-supabase";
import { hasSupabase } from "./supabase-server";
import type { ReportRecord } from "./types";

export async function getReportsByUserId(
  userId: string
): Promise<ReportRecord[]> {
  if (hasSupabase()) return supabase.getReportsByUserId(userId);
  return Promise.resolve(file.getReportsByUserId(userId));
}

export async function createReport(
  userId: string,
  data: Omit<ReportRecord, "id" | "userId" | "createdAt" | "status">,
  options?: { status?: ReportRecord["status"] }
): Promise<ReportRecord> {
  if (hasSupabase()) return supabase.createReport(userId, data, options);
  return Promise.resolve(file.createReport(userId, data, options));
}

export async function getReportById(id: string): Promise<ReportRecord | null> {
  if (hasSupabase()) return supabase.getReportById(id);
  return Promise.resolve(file.getReportById(id));
}

export async function getReportStats(userId: string): Promise<{
  totalReports: number;
  totalPatients: number;
  activeReports: number;
}> {
  if (hasSupabase()) return supabase.getReportStats(userId);
  return Promise.resolve(file.getReportStats(userId));
}

export async function updateReportStatus(
  id: string,
  userId: string,
  status: ReportRecord["status"]
): Promise<ReportRecord | null> {
  if (hasSupabase()) return supabase.updateReportStatus(id, userId, status);
  return Promise.resolve(file.updateReportStatus(id, userId, status));
}

export async function deleteReport(
  id: string,
  userId: string
): Promise<boolean> {
  if (hasSupabase()) return supabase.deleteReport(id, userId);
  return Promise.resolve(file.deleteReport(id, userId));
}
