import * as file from "./clinics-db-file";
import * as supabase from "./clinics-db-supabase";
import { hasSupabase } from "./supabase-server";
import type { ClinicInfo } from "./types";

export async function getClinicByUserId(
  userId: string
): Promise<ClinicInfo | null> {
  if (hasSupabase()) return supabase.getClinicByUserId(userId);
  return Promise.resolve(file.getClinicByUserId(userId));
}

export async function upsertClinic(
  userId: string,
  data: { legalName: string; address: string; phone: string }
): Promise<ClinicInfo> {
  if (hasSupabase()) return supabase.upsertClinic(userId, data);
  return Promise.resolve(file.upsertClinic(userId, data));
}
