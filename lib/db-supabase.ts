import { getSupabase } from "./supabase-server";
import type { UserRecord } from "./types";
import type { ProfessionalTitle } from "./types";

function rowToUser(row: Record<string, unknown>): UserRecord {
  return {
    id: String(row.id),
    email: String(row.email),
    username: String(row.username),
    password: String(row.password),
    fullName: String(row.full_name),
    createdAt: String(row.created_at),
    phone: row.phone != null ? String(row.phone) : undefined,
    professionalTitle:
      row.professional_title != null
        ? (String(row.professional_title) as ProfessionalTitle)
        : undefined,
    license: row.license != null ? String(row.license) : undefined,
  };
}

export async function findUserByEmailOrUsername(
  emailOrUsername: string
): Promise<UserRecord | null> {
  const supabase = getSupabase();
  const lower = emailOrUsername.toLowerCase().trim();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .or(`email.eq.${lower},username.ilike.${lower}`)
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return rowToUser(data);
}

export async function findUserByEmail(
  email: string
): Promise<UserRecord | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email.toLowerCase())
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return rowToUser(data);
}

export async function getUserById(userId: string): Promise<UserRecord | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return rowToUser(data);
}

export async function createUser(data: {
  email: string;
  username: string;
  password: string;
  fullName: string;
}): Promise<UserRecord> {
  const supabase = getSupabase();
  const email = data.email.trim().toLowerCase();
  const username = data.username.trim();

  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .or(`email.eq.${email},username.ilike.${username}`)
    .limit(1)
    .maybeSingle();
  if (existing) {
    const { data: byEmail } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();
    if (byEmail) throw new Error("EMAIL_IN_USE");
    throw new Error("USERNAME_IN_USE");
  }

  const id = String(Date.now());
  const row = {
    id,
    email,
    username,
    password: data.password,
    full_name: data.fullName.trim(),
    created_at: new Date().toISOString(),
  };
  const { data: inserted, error } = await supabase
    .from("users")
    .insert(row)
    .select("*")
    .single();
  if (error) throw error;
  return rowToUser(inserted);
}

export async function updateUserProfile(
  userId: string,
  data: {
    phone?: string;
    professionalTitle?: ProfessionalTitle;
    license?: string;
    fullName?: string;
  }
): Promise<UserRecord | null> {
  const supabase = getSupabase();
  const updates: Record<string, unknown> = {};
  if (data.phone !== undefined) updates.phone = data.phone;
  if (data.professionalTitle !== undefined)
    updates.professional_title = data.professionalTitle;
  if (data.license !== undefined) updates.license = data.license;
  if (data.fullName !== undefined) updates.full_name = data.fullName;
  if (Object.keys(updates).length === 0) {
    const user = await getUserById(userId);
    return user;
  }
  const { data: updated, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId)
    .select("*")
    .single();
  if (error || !updated) return null;
  return rowToUser(updated);
}
