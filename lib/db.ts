import * as dbFile from "./db-file";
import * as dbSupabase from "./db-supabase";
import { hasSupabase } from "./supabase-server";
import type { UserRecord } from "./types";
import type { ProfessionalTitle } from "./types";

export async function findUserByEmailOrUsername(
  emailOrUsername: string
): Promise<UserRecord | null> {
  if (hasSupabase())
    return dbSupabase.findUserByEmailOrUsername(emailOrUsername);
  return Promise.resolve(dbFile.findUserByEmailOrUsername(emailOrUsername));
}

export async function findUserByEmail(
  email: string
): Promise<UserRecord | null> {
  if (hasSupabase()) return dbSupabase.findUserByEmail(email);
  return Promise.resolve(dbFile.findUserByEmail(email));
}

export async function getUserById(userId: string): Promise<UserRecord | null> {
  if (hasSupabase()) return dbSupabase.getUserById(userId);
  return Promise.resolve(dbFile.getUserById(userId));
}

export async function createUser(data: {
  email: string;
  username: string;
  password: string;
  fullName: string;
}): Promise<UserRecord> {
  if (hasSupabase()) return dbSupabase.createUser(data);
  return Promise.resolve(dbFile.createUser(data));
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
  if (hasSupabase()) return dbSupabase.updateUserProfile(userId, data);
  return Promise.resolve(dbFile.updateUserProfile(userId, data));
}
