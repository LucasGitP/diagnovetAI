import { getSupabase } from "./supabase-server";
import type { ClinicInfo } from "./types";

function rowToClinic(row: Record<string, unknown>): ClinicInfo {
  return {
    userId: String(row.user_id),
    legalName: String(row.legal_name),
    address: String(row.address),
    phone: String(row.phone),
    updatedAt: String(row.updated_at),
  };
}

export async function getClinicByUserId(
  userId: string
): Promise<ClinicInfo | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("clinics")
    .select("*")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return rowToClinic(data);
}

export async function upsertClinic(
  userId: string,
  data: { legalName: string; address: string; phone: string }
): Promise<ClinicInfo> {
  const supabase = getSupabase();
  const now = new Date().toISOString();
  const row = {
    user_id: userId,
    legal_name: data.legalName.trim(),
    address: data.address.trim(),
    phone: data.phone.trim(),
    updated_at: now,
  };
  const { data: upserted, error } = await supabase
    .from("clinics")
    .upsert(row, { onConflict: "user_id" })
    .select("*")
    .single();
  if (error) throw error;
  return rowToClinic(upserted);
}
