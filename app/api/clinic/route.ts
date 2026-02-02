import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getClinicByUserId, upsertClinic } from "@/lib/clinics-db";
import type { SessionUser } from "@/lib/types";
import { SESSION_COOKIE } from "@/lib/constants";

async function getSession(): Promise<SessionUser | null> {
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

export async function GET() {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const clinic = await getClinicByUserId(user.id);
  return NextResponse.json({ clinic: clinic ?? null });
}

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { legalName, address, phone } = body;
    if (!legalName?.trim() || !address?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "legalName, address and phone are required" },
        { status: 400 }
      );
    }
    const clinic = await upsertClinic(user.id, {
      legalName: legalName.trim(),
      address: address.trim(),
      phone: phone.trim(),
    });
    return NextResponse.json({ success: true, clinic });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to save clinic" },
      { status: 500 }
    );
  }
}
