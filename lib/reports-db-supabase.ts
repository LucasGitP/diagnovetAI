import { getSupabase } from "./supabase-server";
import type { ReportRecord } from "./types";

function rowToReport(row: Record<string, unknown>): ReportRecord {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    date: String(row.date),
    animalName: String(row.animal_name),
    age: String(row.age),
    unit: String(row.unit),
    species: String(row.species),
    breed: String(row.breed),
    gender: String(row.gender),
    referringProfessional: String(row.referring_professional ?? ""),
    professionalEmail: String(row.professional_email ?? ""),
    guardian: String(row.guardian),
    guardianEmail: String(row.guardian_email ?? ""),
    studyType: String(row.study_type),
    imageCount: Number(row.image_count) || 0,
    status: row.status as ReportRecord["status"],
    createdAt: String(row.created_at),
  };
}

export async function getReportsByUserId(
  userId: string
): Promise<ReportRecord[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []).map(rowToReport);
}

export async function createReport(
  userId: string,
  data: Omit<ReportRecord, "id" | "userId" | "createdAt" | "status">,
  options?: { status?: ReportRecord["status"] }
): Promise<ReportRecord> {
  const supabase = getSupabase();
  const id = `rpt_${Date.now()}`;
  const status = options?.status === "draft" ? "draft" : "active";
  const row = {
    id,
    user_id: userId,
    date: data.date,
    animal_name: data.animalName,
    age: data.age,
    unit: data.unit,
    species: data.species,
    breed: data.breed,
    gender: data.gender,
    referring_professional: data.referringProfessional,
    professional_email: data.professionalEmail,
    guardian: data.guardian,
    guardian_email: data.guardianEmail,
    study_type: data.studyType,
    image_count: data.imageCount,
    status,
    created_at: new Date().toISOString(),
  };
  const { data: inserted, error } = await supabase
    .from("reports")
    .insert(row)
    .select("*")
    .single();
  if (error) throw error;
  return rowToReport(inserted);
}

export async function getReportById(id: string): Promise<ReportRecord | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return rowToReport(data);
}

export async function getReportStats(userId: string): Promise<{
  totalReports: number;
  totalPatients: number;
  activeReports: number;
}> {
  const reports = await getReportsByUserId(userId);
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

export async function updateReportStatus(
  id: string,
  userId: string,
  status: ReportRecord["status"]
): Promise<ReportRecord | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("reports")
    .update({ status })
    .eq("id", id)
    .eq("user_id", userId)
    .select("*")
    .single();
  if (error || !data) return null;
  return rowToReport(data);
}

export async function deleteReport(
  id: string,
  userId: string
): Promise<boolean> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("reports")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
  return !error;
}
