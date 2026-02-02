import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./constants";
import type { SessionUser } from "./types";

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);
  if (!sessionCookie?.value) return null;
  try {
    const user = JSON.parse(sessionCookie.value) as SessionUser;
    if (user?.id && user?.email) return user;
  } catch {
    // invalid
  }
  return null;
}
