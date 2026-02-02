import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import type { UserRecord } from "./types";
import type { ProfessionalTitle } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

interface UsersFile {
  users: UserRecord[];
}

function readUsersFile(): UsersFile {
  if (!existsSync(USERS_FILE)) {
    return { users: [] };
  }
  const raw = readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(raw) as UsersFile;
}

function writeUsersFile(data: UsersFile): void {
  if (!existsSync(DATA_DIR)) {
    const { mkdirSync } = require("fs");
    mkdirSync(DATA_DIR, { recursive: true });
  }
  writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function findUserByEmailOrUsername(
  emailOrUsername: string
): UserRecord | null {
  const { users } = readUsersFile();
  const lower = emailOrUsername.toLowerCase().trim();
  return (
    users.find(
      (u) =>
        u.email.toLowerCase() === lower || u.username.toLowerCase() === lower
    ) ?? null
  );
}

export function findUserByEmail(email: string): UserRecord | null {
  const { users } = readUsersFile();
  return (
    users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null
  );
}

export function getUserById(userId: string): UserRecord | null {
  const { users } = readUsersFile();
  return users.find((u) => u.id === userId) ?? null;
}

export function createUser(data: {
  email: string;
  username: string;
  password: string;
  fullName: string;
}): UserRecord {
  const file = readUsersFile();
  const email = data.email.trim().toLowerCase();
  const username = data.username.trim();
  if (file.users.some((u) => u.email === email)) {
    throw new Error("EMAIL_IN_USE");
  }
  if (
    file.users.some((u) => u.username.toLowerCase() === username.toLowerCase())
  ) {
    throw new Error("USERNAME_IN_USE");
  }
  const id = String(Date.now());
  const user: UserRecord = {
    id,
    email,
    username,
    password: data.password,
    fullName: data.fullName.trim(),
    createdAt: new Date().toISOString(),
  };
  file.users.push(user);
  writeUsersFile(file);
  return user;
}

export function updateUserProfile(
  userId: string,
  data: {
    phone?: string;
    professionalTitle?: ProfessionalTitle;
    license?: string;
    fullName?: string;
  }
): UserRecord | null {
  const file = readUsersFile();
  const index = file.users.findIndex((u) => u.id === userId);
  if (index === -1) return null;
  if (data.phone !== undefined) file.users[index].phone = data.phone;
  if (data.professionalTitle !== undefined)
    file.users[index].professionalTitle = data.professionalTitle;
  if (data.license !== undefined) file.users[index].license = data.license;
  if (data.fullName !== undefined) file.users[index].fullName = data.fullName;
  writeUsersFile(file);
  return file.users[index];
}
