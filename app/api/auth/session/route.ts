import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { SessionUser } from "@/lib/types";
import { SESSION_COOKIE } from "@/lib/constants";

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);
  if (!sessionCookie?.value) {
    return NextResponse.json({ user: null });
  }
  try {
    const user = JSON.parse(sessionCookie.value) as SessionUser;
    if (user?.id && user?.email) {
      return NextResponse.json({ user });
    }
  } catch {
    // invalid cookie
  }
  return NextResponse.json({ user: null });
}
